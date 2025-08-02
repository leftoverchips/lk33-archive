"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VideoEntry {
  id: string
  title: string
  screenshot: string
  screenshot2?: string
  videoLink: string
  fansubLink?: string
  dateAdded: string
  description?: string
}

// This would normally come from a database or API
const getVideoData = (id: string): VideoEntry | null => {
  const videos: VideoEntry[] = [
    {
      id: "1",
      title: "【耳舐め✨ASMR】巨乳先生とマンツーマンで秘密授業♡集中できるように××サポ＆相互××でスッキリしよ♡【KU100】2025-07-27",
      screenshot: "https://simp6.selti-delivery.ru/images3/Screenshot_5884f0535faea9fc0.md.png",
      screenshot2: "https://simp6.selti-delivery.ru/images3/Screenshot_8611f97ef0011bce9.md.png",
      videoLink: "https://ouo.io/zq0eq60",
      fansubLink: "https://oii.la/8OZ5Re",
      dateAdded: "2025-07-27",
      description: "Password: lk33",
    },
    {
      id: "2",
      title: "Whispered Storytelling",
      screenshot: "/placeholder.svg?height=200&width=300&text=Whisper+Story",
      videoLink: "https://example.com/video2",
      dateAdded: "2024-01-10",
      description: "Gentle whispered bedtime story",
    },
    {
      id: "3",
      title: "Tapping & Scratching Sounds",
      screenshot: "/placeholder.svg?height=200&width=300&text=Tapping+ASMR",
      videoLink: "https://example.com/video3",
      fansubLink: "https://example.com/fansub3",
      dateAdded: "2024-01-05",
      description: "Various tapping and scratching triggers",
    },
  ]
  
  return videos.find(video => video.id === id) || null
}

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<VideoEntry | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const videoData = getVideoData(params.id)
    setVideo(videoData)
  }, [params.id])

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Video not found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Archive
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 transition-colors ${isDarkMode ? "border-b border-gray-800 bg-black" : "border-b border-gray-200 bg-white"}`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Archive
                </Button>
              </Link>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Video Details</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100 text-black"}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className={`max-w-4xl mx-auto ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <CardHeader>
            <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}>
              {video.title}
            </CardTitle>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Added: {new Date(video.dateAdded).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Screenshot 1</h3>
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={video.screenshot}
                    alt={`${video.title} - Screenshot 1`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              {video.screenshot2 && (
                <div className="space-y-2">
                  <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Screenshot 2</h3>
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={video.screenshot2}
                      alt={`${video.title} - Screenshot 2`}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {video.description && (
              <div className="space-y-2">
                <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Description</h3>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {video.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                asChild
                className={`flex-1 ${isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
              >
                <Link href={video.videoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Video Link
                </Link>
              </Button>
              {video.fansubLink && (
                <Button
                  asChild
                  variant="outline"
                  className={`flex-1 ${isDarkMode ? "border-gray-700 hover:bg-gray-800 bg-gray-900 text-white" : "border-gray-300 hover:bg-gray-100 bg-white text-black"}`}
                >
                  <Link href={video.fansubLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Subtitles (SRT)
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
