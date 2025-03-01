"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import WysiwygEditor from "./WysiwygEditor"

export default function ContactPage() {
  const [content, setContent] = useState({
    contactInformation: "",
    contactForm: {
      title: "",
      description: "",
    },
    mapEmbedCode: "",
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
      const response = await fetch("/api/contact")
      if (!response.ok) throw new Error("Failed to fetch content")
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error("Error fetching contact page content:", error)
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
      const response = await fetch("/api/contact", {
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
      console.error("Error saving contact page content:", error)
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
      <h1 className="text-2xl font-bold">Contact Us Page Content</h1>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <WysiwygEditor
            initialValue={content.contactInformation}
            onChange={(value) => setContent((prev) => ({ ...prev, contactInformation: value }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="form-title">Form Title</Label>
            <Input
              id="form-title"
              value={content.contactForm.title}
              onChange={(e) =>
                setContent((prev) => ({ ...prev, contactForm: { ...prev.contactForm, title: e.target.value } }))
              }
            />
          </div>
          <div>
            <Label htmlFor="form-description">Form Description</Label>
            <Textarea
              id="form-description"
              value={content.contactForm.description}
              onChange={(e) =>
                setContent((prev) => ({ ...prev, contactForm: { ...prev.contactForm, description: e.target.value } }))
              }
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Map Embed Code</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={content.mapEmbedCode}
            onChange={(e) => setContent((prev) => ({ ...prev, mapEmbedCode: e.target.value }))}
            rows={6}
            placeholder="Paste your Google Maps embed code here"
          />
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

