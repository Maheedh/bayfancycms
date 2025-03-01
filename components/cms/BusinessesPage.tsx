"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import WysiwygEditor from "./WysiwygEditor"

export default function BusinessesPage() {
  const [content, setContent] = useState({
    businessCategories: [],
    projects: [],
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
      const response = await fetch("/api/businesses")
      if (!response.ok) throw new Error("Failed to fetch content")
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error("Error fetching businesses page content:", error)
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
      const response = await fetch("/api/businesses", {
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
      console.error("Error saving businesses page content:", error)
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddCategory = () => {
    setContent((prev) => ({
      ...prev,
      businessCategories: [...prev.businessCategories, { name: "", description: "" }],
    }))
  }

  const handleRemoveCategory = (index: number) => {
    setContent((prev) => ({
      ...prev,
      businessCategories: prev.businessCategories.filter((_, i) => i !== index),
    }))
  }

  const handleAddProject = () => {
    setContent((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", category: "", imageUrl: "" }],
    }))
  }

  const handleRemoveProject = (index: number) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
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
      <h1 className="text-2xl font-bold">Our Businesses Page Content</h1>

      <Card>
        <CardHeader>
          <CardTitle>Business Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {content.businessCategories.map((category, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <div className="mb-4">
                <Label htmlFor={`category-name-${index}`}>Category Name</Label>
                <Input
                  id={`category-name-${index}`}
                  value={category.name}
                  onChange={(e) => {
                    const newCategories = [...content.businessCategories]
                    newCategories[index].name = e.target.value
                    setContent((prev) => ({ ...prev, businessCategories: newCategories }))
                  }}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor={`category-description-${index}`}>Description</Label>
                <WysiwygEditor
                  initialValue={category.description}
                  onChange={(value) => {
                    const newCategories = [...content.businessCategories]
                    newCategories[index].description = value
                    setContent((prev) => ({ ...prev, businessCategories: newCategories }))
                  }}
                />
              </div>
              <Button variant="destructive" onClick={() => handleRemoveCategory(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Remove Category
              </Button>
            </div>
          ))}
          <Button onClick={handleAddCategory} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Business Category
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {content.projects.map((project, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                  <Input
                    id={`project-name-${index}`}
                    value={project.name}
                    onChange={(e) => {
                      const newProjects = [...content.projects]
                      newProjects[index].name = e.target.value
                      setContent((prev) => ({ ...prev, projects: newProjects }))
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`project-category-${index}`}>Category</Label>
                  <Input
                    id={`project-category-${index}`}
                    value={project.category}
                    onChange={(e) => {
                      const newProjects = [...content.projects]
                      newProjects[index].category = e.target.value
                      setContent((prev) => ({ ...prev, projects: newProjects }))
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor={`project-description-${index}`}>Description</Label>
                <WysiwygEditor
                  initialValue={project.description}
                  onChange={(value) => {
                    const newProjects = [...content.projects]
                    newProjects[index].description = value
                    setContent((prev) => ({ ...prev, projects: newProjects }))
                  }}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor={`project-image-${index}`}>Image URL</Label>
                <Input
                  id={`project-image-${index}`}
                  value={project.imageUrl}
                  onChange={(e) => {
                    const newProjects = [...content.projects]
                    newProjects[index].imageUrl = e.target.value
                    setContent((prev) => ({ ...prev, projects: newProjects }))
                  }}
                />
              </div>
              <Button variant="destructive" onClick={() => handleRemoveProject(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Remove Project
              </Button>
            </div>
          ))}
          <Button onClick={handleAddProject} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Project
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

