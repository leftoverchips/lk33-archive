"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, ExternalLink, Edit, Trash2, Search, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface VideoEntry {
  id: string
  title: string
  screenshot: string
  videoLink: string
  fansubLink?: string
  dateAdded: string
  description?: string
}

export default function LK33Archive() {
  const [videos, setVideos] = useState<VideoEntry[]>([
    {
      id: "1",
      title: "Relaxing Rain Sounds ASMR",
      screenshot: "/placeholder.svg?height=200&width=300&text=Rain+ASMR",
      videoLink: "https://example.com/video1",
      fansubLink: "https://example.com/fansub1",
      dateAdded: "2024-01-15",
      description: "Peaceful rain sounds for relaxation and sleep",
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
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState<VideoEntry | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    screenshot: "",
    videoLink: "",
    fansubLink: "",
    description: "",
  })

  const [isDarkMode, setIsDarkMode] = useState(false)

  const filteredVideos = videos.filter((video) => video.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newVideo: VideoEntry = {
      id: editingVideo?.id || Date.now().toString(),
      title: formData.title,
      screenshot:
        formData.screenshot || "/placeholder.svg?height=200&width=300&text=" + encodeURIComponent(formData.title),
      videoLink: formData.videoLink,
      fansubLink: formData.fansubLink || undefined,
      dateAdded: editingVideo?.dateAdded || new Date().toISOString().split("T")[0],
      description: formData.description || undefined,
    }

    if (editingVideo) {
      setVideos(videos.map((v) => (v.id === editingVideo.id ? newVideo : v)))
    } else {
      setVideos([newVideo, ...videos])
    }

    setFormData({ title: "", screenshot: "", videoLink: "", fansubLink: "", description: "" })
    setEditingVideo(null)
    setIsAddDialogOpen(false)
  }

  const handleEdit = (video: VideoEntry) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      screenshot: video.screenshot,
      videoLink: video.videoLink,
      fansubLink: video.fansubLink || "",
      description: video.description || "",
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id))
  }

  const resetForm = () => {
    setFormData({ title: "", screenshot: "", videoLink: "", fansubLink: "", description: "" })
    setEditingVideo(null)
  }

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-10 transition-colors ${isDarkMode ? "border-b border-gray-800 bg-black" : "border-b border-gray-200 bg-white"}`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>lk33-archive</h1>
              <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Personal ASMR Content Collection
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100 text-black"}`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Dialog
                open={isAddDialogOpen}
                onOpenChange={(open) => {
                  setIsAddDialogOpen(open)
                  if (!open) resetForm()
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    className={`${isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Video
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className={`border-gray-300 max-w-md ${isDarkMode ? "bg-black text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
                >
                  <DialogHeader>
                    <DialogTitle>{editingVideo ? "Edit Video" : "Add New Video"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`${isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="screenshot">Screenshot URL</Label>
                      <Input
                        id="screenshot"
                        value={formData.screenshot}
                        onChange={(e) => setFormData({ ...formData, screenshot: e.target.value })}
                        className={`${isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
                        placeholder="Leave empty for auto-generated placeholder"
                      />
                    </div>
                    <div>
                      <Label htmlFor="videoLink">Video Link</Label>
                      <Input
                        id="videoLink"
                        value={formData.videoLink}
                        onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                        className={`${isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fansubLink">Fansub Link (Optional)</Label>
                      <Input
                        id="fansubLink"
                        value={formData.fansubLink}
                        onChange={(e) => setFormData({ ...formData, fansubLink: e.target.value })}
                        className={`${isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={`${isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
                        rows={3}
                      />
                    </div>
                    <Button
                      type="submit"
                      className={`w-full ${isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
                    >
                      {editingVideo ? "Update Video" : "Add Video"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative max-w-md">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
          />
          <Input
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 transition-colors ${isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
          />
        </div>
      </div>

      {/* Video Grid */}
      <main className="container mx-auto px-4 pb-12">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {searchTerm ? "No videos found matching your search." : "No videos in your archive yet."}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className={`mt-4 ${isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
              >
                Add Your First Video
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className={`transition-colors group ${isDarkMode ? "bg-gray-900 border-gray-800 hover:border-white" : "bg-white border-gray-200 hover:border-black"}`}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={video.screenshot || "/placeholder.svg"}
                      alt={video.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3
                      className={`font-semibold text-lg mb-2 line-clamp-2 ${isDarkMode ? "text-white" : "text-black"}`}
                    >
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {video.description}
                      </p>
                    )}
                    <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                      Added: {new Date(video.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    className={`flex-1 ${isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
                  >
                    <Link href={video.videoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Video
                    </Link>
                  </Button>
                  {video.fansubLink && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className={`flex-1 ${isDarkMode ? "border-gray-700 hover:bg-gray-800 bg-gray-900 text-white" : "border-gray-300 hover:bg-gray-100 bg-white text-black"}`}
                    >
                      <Link href={video.fansubLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Fansub
                      </Link>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(video)}
                    className={`px-2 ${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100 text-black"}`}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(video.id)}
                    className={`px-2 ${isDarkMode ? "hover:bg-red-900 hover:text-red-400 text-white" : "hover:bg-red-100 hover:text-red-600 text-black"}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
