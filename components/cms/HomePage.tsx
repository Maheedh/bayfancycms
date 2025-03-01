"use client"

import { useState, useEffect } from "react"
import WysiwygEditor from "./WysiwygEditor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ImageComponent from "@/components/ImageComponent"
import "react-quill/dist/quill.snow.css"

interface Slide {
  title: string
  imageUrl: string
}

interface FeaturedProject {
  title: string
  description: string
}

interface NewsUpdate {
  title: string
  date: string
}

interface HomePageContent {
  heroSlider: Slide[]
  featuredProjects: FeaturedProject[]
  aboutSummary: string
  newsUpdates: NewsUpdate[]
}

const defaultContent: HomePageContent = {
  heroSlider: [],
  featuredProjects: [],
  aboutSummary: "",
  newsUpdates: [],
}

export default function HomePage() {
  const [content, setContent] = useState<HomePageContent>(defaultContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true)
      try {
        const response = await fetch("/api/home")
        if (!response.ok) {
          throw new Error("Failed to fetch content")
        }
        const data = await response.json()
        setContent(data)
      } catch (error) {
        console.error("Error fetching home page content:", error)
        toast({
          title: "Error",
          description: "Failed to load content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchContent()
  }, [toast])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (!response.ok) {
        throw new Error("Failed to save content")
      }
      toast({
        title: "Success",
        description: "Content saved successfully.",
      })
    } catch (error) {
      console.error("Error saving home page content:", error)
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
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
      <h1 className="text-2xl font-bold">Home Page Content</h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">Hero Slider</h2>
        {content.heroSlider && content.heroSlider.length > 0 ? (
          content.heroSlider.map((slide, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <Input
                value={slide.title}
                onChange={(e) => {
                  const newSlider = [...content.heroSlider]
                  newSlider[index].title = e.target.value
                  setContent({ ...content, heroSlider: newSlider })
                }}
                placeholder="Slide Title"
              />
              <Input
                value={slide.imageUrl}
                onChange={(e) => {
                  const newSlider = [...content.heroSlider]
                  newSlider[index].imageUrl = e.target.value
                  setContent({ ...content, heroSlider: newSlider })
                }}
                placeholder="Image URL"
                className="mt-2"
              />
              <div className="mt-2">
                <ImageComponent
                  src={slide.imageUrl || "/placeholder.svg"}
                  alt={slide.title}
                  width={1200}
                  height={600}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No slides available. Add a new slide to get started.</p>
        )}
        <Button
          onClick={() =>
            setContent({ ...content, heroSlider: [...(content.heroSlider || []), { title: "", imageUrl: "" }] })
          }
        >
          Add Slide
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
        {content.featuredProjects && content.featuredProjects.length > 0 ? (
          content.featuredProjects.map((project, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <Input
                value={project.title}
                onChange={(e) => {
                  const newProjects = [...content.featuredProjects]
                  newProjects[index].title = e.target.value
                  setContent({ ...content, featuredProjects: newProjects })
                }}
                placeholder="Project Title"
              />
              <Input
                value={project.description}
                onChange={(e) => {
                  const newProjects = [...content.featuredProjects]
                  newProjects[index].description = e.target.value
                  setContent({ ...content, featuredProjects: newProjects })
                }}
                placeholder="Project Description"
                className="mt-2"
              />
            </div>
          ))
        ) : (
          <p>No featured projects available. Add a new project to get started.</p>
        )}
        <Button
          onClick={() =>
            setContent({
              ...content,
              featuredProjects: [...(content.featuredProjects || []), { title: "", description: "" }],
            })
          }
        >
          Add Project
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">About Us Summary</h2>
        <WysiwygEditor
          initialValue={content.aboutSummary || ""}
          onChange={(value) => setContent({ ...content, aboutSummary: value })}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">News & Updates</h2>
        {content.newsUpdates && content.newsUpdates.length > 0 ? (
          content.newsUpdates.map((update, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <Input
                value={update.title}
                onChange={(e) => {
                  const newUpdates = [...content.newsUpdates]
                  newUpdates[index].title = e.target.value
                  setContent({ ...content, newsUpdates: newUpdates })
                }}
                placeholder="Update Title"
              />
              <Input
                value={update.date}
                onChange={(e) => {
                  const newUpdates = [...content.newsUpdates]
                  newUpdates[index].date = e.target.value
                  setContent({ ...content, newsUpdates: newUpdates })
                }}
                placeholder="Update Date"
                className="mt-2"
              />
            </div>
          ))
        ) : (
          <p>No news updates available. Add a new update to get started.</p>
        )}
        <Button
          onClick={() =>
            setContent({ ...content, newsUpdates: [...(content.newsUpdates || []), { title: "", date: "" }] })
          }
        >
          Add Update
        </Button>
      </div>

      <Button onClick={handleSave} className="mt-8" disabled={isSaving}>
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

