"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import WysiwygEditor from "./WysiwygEditor"

export default function NewsMediaPage() {
  const [content, setContent] = useState({
    newsArticles: [],
    pressReleases: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/news")
      if (!response.ok) throw new Error("Failed to fetch content")
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error("Error fetching news & media page content:", error)
      toast({
        title: "Error",
        description: "Failed to load content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (!response.ok) throw new Error("Failed to save content")
      toast({
        title: "Success",
        description: "Content saved successfully.",
      })
    } catch (error) {
      console.error("Error saving news & media page content:", error)
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddNewsArticle = () => {
    setContent((prev) => ({
      ...prev,
      newsArticles: [...prev.newsArticles, { title: "", date: "", content: "", imageUrl: "" }],
    }))
  }

  const handleRemoveNewsArticle = (index: number) => {
    setContent((prev) => ({
      ...prev,
      newsArticles: prev.newsArticles.filter((_, i) => i !== index),
    }))
  }

  const handleAddPressRelease = () => {
    setContent((prev) => ({
      ...prev,
      pressReleases: [...prev.pressReleases, { title: "", date: "", content: "" }],
    }))
  }

  const handleRemovePressRelease = (index: number) => {
    setContent((prev) => ({
      ...prev,
      pressReleases: prev.pressReleases.filter((_, i) => i !== index),
    }))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#556B2F]" />
        <span className="ml-2">Loading content...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">News & Media Page Content</h1>

      <Card>
        <CardHeader>
          <CardTitle>News Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {content.newsArticles.map((article, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`article-title-${index}`}>Title</Label>
                  <Input
                    id={`article-title-${index}`}
                    value={article.title}
                    onChange={(e) => {
                      const newArticles = [...content.newsArticles]
                      newArticles[index].title = e.target.value
                      setContent((prev) => ({ ...prev, newsArticles: newArticles }))
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`article-date-${index}`}>Date</Label>
                  <Input
                    id={`article-date-${index}`}
                    type="date"
                    value={article.date}
                    onChange={(e) => {
                      const newArticles = [...content.newsArticles]
                      newArticles[index].date = e.target.value
                      setContent((prev) => ({ ...prev, newsArticles: newArticles }))
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor={`article-content-${index}`}>Content</Label>
                <WysiwygEditor
                  initialValue={article.content}
                  onChange={(value) => {
                    const newArticles = [...content.newsArticles]
                    newArticles[index].content = value
                    setContent((prev) => ({ ...prev, newsArticles: newArticles }))
                  }}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor={`article-image-${index}`}>Image URL</Label>
                <Input
                  id={`article-image-${index}`}
                  value={article.imageUrl}
                  onChange={(e) => {
                    const newArticles = [...content.newsArticles]
                    newArticles[index].imageUrl = e.target.value
                    setContent((prev) => ({ ...prev, newsArticles: newArticles }))
                  }}
                />
              </div>
              <Button variant="destructive" onClick={() => handleRemoveNewsArticle(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Remove News Article
              </Button>
            </div>
          ))}
          <Button onClick={handleAddNewsArticle} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add News Article
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Press Releases</CardTitle>
        </CardHeader>
        <CardContent>
          {content.pressReleases.map((release, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`release-title-${index}`}>Title</Label>
                  <Input
                    id={`release-title-${index}`}
                    value={release.title}
                    onChange={(e) => {
                      const newReleases = [...content.pressReleases]
                      newReleases[index].title = e.target.value
                      setContent((prev) => ({ ...prev, pressReleases: newReleases }))
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`release-date-${index}`}>Date</Label>
                  <Input
                    id={`release-date-${index}`}
                    type="date"
                    value={release.date}
                    onChange={(e) => {
                      const newReleases = [...content.pressReleases]
                      newReleases[index].date = e.target.value
                      setContent((prev) => ({ ...prev, pressReleases: newReleases }))
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor={`release-content-${index}`}>Content</Label>
                <WysiwygEditor
                  initialValue={release.content}
                  onChange={(value) => {
                    const newReleases = [...content.pressReleases]
                    newReleases[index].content = value
                    setContent((prev) => ({ ...prev, pressReleases: newReleases }))
                  }}
                />
              </div>
              <Button variant="destructive" onClick={() => handleRemovePressRelease(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Remove Press Release
              </Button>
            </div>
          ))}
          <Button onClick={handleAddPressRelease} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Press Release
          </Button>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full bg-[#556B2F] hover:bg-[#4A5F29]" disabled={isSaving}>
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          "Save All Changes"
        )}
      </Button>
    </div>
  )
}

