"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Brain, AlertCircle } from "lucide-react"

interface EmotionResult {
  emotion: string
  confidence: number
}

export default function EmotionAnalyzer() {
  const [reflection, setReflection] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<EmotionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeEmotion = async () => {
    if (!reflection.trim()) {
      setError("Please enter a reflection to analyze")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("https://emo-reflect-2.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: reflection }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data: EmotionResult = await response.json()
      setResult(data)
    } catch (err) {
      console.error("Analysis failed:", err)
      setError(
        err instanceof Error ? err.message : "Failed to analyze emotion. Please check if the API server is running.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    analyzeEmotion()
  }

  const resetForm = () => {
    setReflection("")
    setResult(null)
    setError(null)
  }

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      Happy: "text-green-600 bg-green-50 border-green-200",
      Sad: "text-blue-600 bg-blue-50 border-blue-200",
      Anxious: "text-orange-600 bg-orange-50 border-orange-200",
      Angry: "text-red-600 bg-red-50 border-red-200",
      Excited: "text-purple-600 bg-purple-50 border-purple-200",
    }
    return colors[emotion] || "text-gray-600 bg-gray-50 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Emotion Analyzer</h1>
          </div>
          <p className="text-gray-600 text-sm">Share your thoughts and discover the emotions behind them</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">How are you feeling?</CardTitle>
            <CardDescription>Write a short reflection about your current thoughts or situation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="e.g., I feel nervous about my first job interview..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="min-h-[100px] resize-none"
                disabled={isLoading}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading || !reflection.trim()} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Emotion"
                  )}
                </Button>

                {(result || error) && (
                  <Button type="button" variant="outline" onClick={resetForm} disabled={isLoading}>
                    Reset
                  </Button>
                )}
              </div>
            </form>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && (
              <Card className={`border-2 ${getEmotionColor(result.emotion)}`}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Detected Emotion: {result.emotion}</h3>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Confidence Level</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-current h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${result.confidence * 100}%` }}
                        />
                      </div>
                      <div className="text-lg font-medium">{Math.round(result.confidence * 100)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

       
      </div>
    </div>
  )
}
