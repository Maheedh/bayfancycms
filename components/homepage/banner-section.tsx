"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Trash2, Plus, MoveUp, MoveDown, ImageIcon, Loader2 } from "lucide-react"
import { getBanners, createBanner, updateBanner, deleteBanner, uploadMedia } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface Banner {
  id: string
  title: string
  link: string
  imageUrl: string
  startDate: string
  endDate?: string
  isActive: boolean
  order: number
}

export function BannerSection() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadBanners()
  }, [])

  const loadBanners = async () => {
    setIsLoading(true)
    try {
      const data = await getBanners()
      setBanners(data.sort((a: Banner, b: Banner) => a.order - b.order))
    } catch (error) {
      console.error("Failed to load banners:", error)
      toast({
        title: "Error",
        description: "Failed to load banners. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddBanner = async () => {
    const newBanner = {
      title: "New Banner",
      link: "",
      imageUrl: "",
      startDate: new Date().toISOString().split("T")[0],
      isActive: false,
      order: banners.length,
    }

    try {
      const created = await createBanner(newBanner)
      setBanners([...banners, created])
      toast({
        title: "Success",
        description: "New banner created successfully.",
      })
    } catch (error) {
      console.error("Failed to create banner:", error)
      toast({
        title: "Error",
        description: "Failed to create banner. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveBanner = async (banner: Banner) => {
    setIsSaving(banner.id)
    try {
      await updateBanner(banner.id, banner)
      toast({
        title: "Success",
        description: "Banner updated successfully.",
      })
    } catch (error) {
      console.error("Failed to update banner:", error)
      toast({
        title: "Error",
        description: "Failed to update banner. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(null)
    }
  }

  const handleDeleteBanner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return

    try {
      await deleteBanner(id)
      setBanners(banners.filter((banner) => banner.id !== id))
      toast({
        title: "Success",
        description: "Banner deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete banner:", error)
      toast({
        title: "Error",
        description: "Failed to delete banner. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return

    const newBanners = [...banners]
    const temp = newBanners[index]
    newBanners[index] = newBanners[index - 1]
    newBanners[index - 1] = temp

    // Update order property
    newBanners[index].order = index
    newBanners[index - 1].order = index - 1

    setBanners(newBanners)

    try {
      await updateBanner(newBanners[index].id, newBanners[index])
      await updateBanner(newBanners[index - 1].id, newBanners[index - 1])
    } catch (error) {
      console.error("Failed to update banner order:", error)
      toast({
        title: "Error",
        description: "Failed to update banner order. Please try again.",
        variant: "destructive",
      })
      loadBanners() // Reload to reset order
    }
  }

  const handleMoveDown = async (index: number) => {
    if (index === banners.length - 1) return

    const newBanners = [...banners]
    const temp = newBanners[index]
    newBanners[index] = newBanners[index + 1]
    newBanners[index + 1] = temp

    // Update order property
    newBanners[index].order = index
    newBanners[index + 1].order = index + 1

    setBanners(newBanners)

    try {
      await updateBanner(newBanners[index].id, newBanners[index])
      await updateBanner(newBanners[index + 1].id, newBanners[index + 1])
    } catch (error) {
      console.error("Failed to update banner order:", error)
      toast({
        title: "Error",
        description: "Failed to update banner order. Please try again.",
        variant: "destructive",
      })
      loadBanners() // Reload to reset order
    }
  }

  const handleImageUpload = async (bannerId: string, file: File) => {
    try {
      const metadata = {
        type: "banner",
        bannerId,
      }

      const uploadedMedia = await uploadMedia(file, metadata)

      // Update the banner with the new image URL
      const updatedBanners = banners.map((banner) =>
        banner.id === bannerId ? { ...banner, imageUrl: uploadedMedia.url } : banner,
      )

      setBanners(updatedBanners)

      // Save the updated banner
      const bannerToUpdate = updatedBanners.find((b) => b.id === bannerId)
      if (bannerToUpdate) {
        await updateBanner(bannerId, bannerToUpdate)
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully.",
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

  const handleFileChange = (bannerId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(bannerId, file)
    }
  }

  const handleBannerChange = (id: string, field: keyof Banner, value: any) => {
    const updatedBanners = banners.map((banner) => (banner.id === id ? { ...banner, [field]: value } : banner))
    setBanners(updatedBanners)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#556B2F]" />
        <span className="ml-2">Loading banners...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Homepage News Banners</h2>
        <Button className="bg-[#556B2F] hover:bg-[#4A5F29]" onClick={handleAddBanner}>
          <Plus className="mr-2 h-4 w-4" /> Add New Banner
        </Button>
      </div>

      <div className="grid gap-6">
        {banners.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-muted-foreground mb-4">No banners found. Create your first banner to get started.</p>
              <Button className="bg-[#556B2F] hover:bg-[#4A5F29]" onClick={handleAddBanner}>
                <Plus className="mr-2 h-4 w-4" /> Add New Banner
              </Button>
            </CardContent>
          </Card>
        ) : (
          banners.map((banner, index) => (
            <Card key={banner.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Banner #{index + 1}</CardTitle>
                  <Switch
                    id={`banner-${banner.id}-active`}
                    checked={banner.isActive}
                    onCheckedChange={(checked) => handleBannerChange(banner.id, "isActive", checked)}
                  />
                </div>
                <CardDescription>
                  {banner.isActive ? "Currently active and visible on the homepage" : "Currently inactive"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor={`banner-${banner.id}-title`}>Banner Title</Label>
                    <Input
                      id={`banner-${banner.id}-title`}
                      value={banner.title}
                      onChange={(e) => handleBannerChange(banner.id, "title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`banner-${banner.id}-link`}>Link URL</Label>
                    <Input
                      id={`banner-${banner.id}-link`}
                      value={banner.link}
                      onChange={(e) => handleBannerChange(banner.id, "link", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Banner Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center bg-muted/50 h-40">
                    {banner.imageUrl ? (
                      <div className="w-full h-full relative">
                        <img
                          src={banner.imageUrl || "/placeholder.svg"}
                          alt={banner.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute bottom-2 right-2 flex gap-2">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange(banner.id, e)}
                            />
                            <Button variant="outline" size="sm" className="bg-white">
                              Replace
                            </Button>
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700 bg-white"
                            onClick={() => handleBannerChange(banner.id, "imageUrl", "")}
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
                        <p className="text-sm text-muted-foreground mb-2">Recommended size: 1200 x 400px</p>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(banner.id, e)}
                          />
                          <Button variant="outline" size="sm">
                            Upload Image
                          </Button>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`banner-${banner.id}-start-date`}>Start Date</Label>
                    <Input
                      id={`banner-${banner.id}-start-date`}
                      type="date"
                      value={banner.startDate}
                      onChange={(e) => handleBannerChange(banner.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`banner-${banner.id}-end-date`}>End Date (Optional)</Label>
                    <Input
                      id={`banner-${banner.id}-end-date`}
                      type="date"
                      value={banner.endDate || ""}
                      onChange={(e) => handleBannerChange(banner.id, "endDate", e.target.value || undefined)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleMoveUp(index)} disabled={index === 0}>
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === banners.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteBanner(banner.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                  <Button
                    className="bg-[#556B2F] hover:bg-[#4A5F29]"
                    onClick={() => handleSaveBanner(banner)}
                    disabled={isSaving === banner.id}
                  >
                    {isSaving === banner.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

