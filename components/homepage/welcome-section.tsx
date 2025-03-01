"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Loader2 } from "lucide-react"
import { getWelcomeSection, updateWelcomeSection, uploadMedia } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface WelcomeContent {
  aboutHeading: string
  aboutText: string
  backgroundImage?: string
  businessesHeading: string
  businessesText: string
  businessesCta: string
  businessesLink: string
}

export function WelcomeSection() {
  const [content, setContent] = useState<WelcomeContent>({
    aboutHeading: "",
    aboutText: "",
    backgroundImage: "",
    businessesHeading: "",
    businessesText: "",
    businessesCta: "",
    businessesLink: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    setIsLoading(true)
    try {
      const data = await getWelcomeSection()
      setContent(data)
    } catch (error) {
      console.error("Failed to load welcome section content:", error)
      toast({
        title: "Error",
        description: "Failed to load content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveAbout = async () => {
    setIsSaving(true)
    try {
      await updateWelcomeSection({
        aboutHeading: content.aboutHeading,
        aboutText: content.aboutText,
        backgroundImage: content.backgroundImage,
      })
      toast({
        title: "Success",
        description: "About section updated successfully.",
      })
    } catch (error) {
      console.error("Failed to update about section:", error)
      toast({
        title: "Error",
        description: "Failed to update about section. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveBusinesses = async () => {
    setIsSaving(true)
    try {
      await updateWelcomeSection({
        businessesHeading: content.businessesHeading,
        businessesText: content.businessesText,
        businessesCta: content.businessesCta,
        businessesLink: content.businessesLink,
      })
      toast({
        title: "Success",
        description: "Businesses section updated successfully.",
      })
    } catch (error) {
      console.error("Failed to update businesses section:", error)
      toast({
        title: "Error",
        description: "Failed to update businesses section. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const metadata = {
        type: "welcome",
        section: "background",
      }

      const uploadedMedia = await uploadMedia(file, metadata)

      // Update the content with the new image URL
      setContent({
        ...content,
        backgroundImage: uploadedMedia.url,
      })

      // Save the updated content
      await updateWelcomeSection({
        ...content,
        backgroundImage: uploadedMedia.url,
      })

      toast({
        title: "Success",
        description: "Background image uploaded successfully.",
      })
    } catch (error) {
      console.error("Failed to upload image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleContentChange = (field: keyof WelcomeContent, value: string) => {
    setContent({
      ...content,
      [field]: value,
    })
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome Section</h2>

      <Card>
        <CardHeader>
          <CardTitle>About Us Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="welcome-heading">Heading</Label>
            <Input
              id="welcome-heading"
              value={content.aboutHeading}
              onChange={(e) => handleContentChange("aboutHeading", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcome-text">Introduction Text</Label>
            <Textarea
              id="welcome-text"
              className="min-h-32"
              value={content.aboutText}
              onChange={(e) => handleContentChange("aboutText", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Background Image (Optional)</Label>
            <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center bg-muted/50 h-40">
              {content.backgroundImage ? (
                <div className="w-full h-full relative">
                  <img
                    src={content.backgroundImage || "/placeholder.svg"}
                    alt="Welcome background"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      <Button variant="outline" size="sm" className="bg-white">
                        Replace
                      </Button>
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 bg-white"
                      onClick={() => handleContentChange("backgroundImage", "")}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center bg-white p-2 rounded-md mb-3">
                    <ImageIcon className="h-6 w-6 text-[#556B2F]" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Recommended size: 1920 x 1080px</p>
                  <label className="cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <Button variant="outline" size="sm">
                      Upload Image
                    </Button>
                  </label>
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button className="bg-[#556B2F] hover:bg-[#4A5F29]" onClick={handleSaveAbout} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Businesses Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businesses-heading">Heading</Label>
            <Input
              id="businesses-heading"
              value={content.businessesHeading}
              onChange={(e) => handleContentChange("businessesHeading", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businesses-text">Summary Text</Label>
            <Textarea
              id="businesses-text"
              className="min-h-32"
              value={content.businessesText}
              onChange={(e) => handleContentChange("businessesText", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businesses-cta">Call to Action Text</Label>
            <Input
              id="businesses-cta"
              value={content.businessesCta}
              onChange={(e) => handleContentChange("businessesCta", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businesses-link">CTA Link</Label>
            <Input
              id="businesses-link"
              value={content.businessesLink}
              onChange={(e) => handleContentChange("businessesLink", e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button className="bg-[#556B2F] hover:bg-[#4A5F29]" onClick={handleSaveBusinesses} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

