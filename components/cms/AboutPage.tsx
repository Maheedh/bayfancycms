"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import WysiwygEditor from "./WysiwygEditor"

export default function AboutPage() {
  const [content, setContent] = useState({
    companyOverview: "",
    missionVision: {
      mission: "",
      vision: "",
    },
    teamMembers: [],
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
      const response = await fetch("/api/about")
      if (!response.ok) throw new Error("Failed to fetch content")
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error("Error fetching about page content:", error)
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
      const response = await fetch("/api/about", {
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
      console.error("Error saving about page content:", error)
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddTeamMember = () => {
    setContent((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", position: "", bio: "", imageUrl: "" }],
    }))
  }

  const handleRemoveTeamMember = (index: number) => {
    setContent((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
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
      <h1 className="text-2xl font-bold">About Us Page Content</h1>

      <Card>
        <CardHeader>
          <CardTitle>Company Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <WysiwygEditor
            initialValue={content.companyOverview}
            onChange={(value) => setContent((prev) => ({ ...prev, companyOverview: value }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mission & Vision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mission">Mission</Label>
            <Textarea
              id="mission"
              value={content.missionVision.mission}
              onChange={(e) =>
                setContent((prev) => ({ ...prev, missionVision: { ...prev.missionVision, mission: e.target.value } }))
              }
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="vision">Vision</Label>
            <Textarea
              id="vision"
              value={content.missionVision.vision}
              onChange={(e) =>
                setContent((prev) => ({ ...prev, missionVision: { ...prev.missionVision, vision: e.target.value } }))
              }
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          {content.teamMembers.map((member, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`name-${index}`}>Name</Label>
                  <Input
                    id={`name-${index}`}
                    value={member.name}
                    onChange={(e) => {
                      const newTeamMembers = [...content.teamMembers]
                      newTeamMembers[index].name = e.target.value
                      setContent((prev) => ({ ...prev, teamMembers: newTeamMembers }))
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    value={member.position}
                    onChange={(e) => {
                      const newTeamMembers = [...content.teamMembers]
                      newTeamMembers[index].position = e.target.value
                      setContent((prev) => ({ ...prev, teamMembers: newTeamMembers }))
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor={`bio-${index}`}>Bio</Label>
                <Textarea
                  id={`bio-${index}`}
                  value={member.bio}
                  onChange={(e) => {
                    const newTeamMembers = [...content.teamMembers]
                    newTeamMembers[index].bio = e.target.value
                    setContent((prev) => ({ ...prev, teamMembers: newTeamMembers }))
                  }}
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor={`image-${index}`}>Image URL</Label>
                <Input
                  id={`image-${index}`}
                  value={member.imageUrl}
                  onChange={(e) => {
                    const newTeamMembers = [...content.teamMembers]
                    newTeamMembers[index].imageUrl = e.target.value
                    setContent((prev) => ({ ...prev, teamMembers: newTeamMembers }))
                  }}
                />
              </div>
              <Button variant="destructive" onClick={() => handleRemoveTeamMember(index)}>
                <Trash2 className="mr-2 h-4 w-4" /> Remove Team Member
              </Button>
            </div>
          ))}
          <Button onClick={handleAddTeamMember} className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Team Member
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

