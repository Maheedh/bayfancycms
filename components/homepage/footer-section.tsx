import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Instagram, Linkedin, Plus, Trash2, MoveUp, MoveDown } from "lucide-react"

export function FooterSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Footer Management</h2>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Facebook */}
            <div className="flex items-center space-x-4">
              <div className="bg-[#556B2F] p-2 rounded-md">
                <Facebook className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <Input defaultValue="https://facebook.com/bayfancysingapore" />
              </div>
              <Button variant="ghost" size="icon" className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center space-x-4">
              <div className="bg-[#556B2F] p-2 rounded-md">
                <Linkedin className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <Input defaultValue="https://linkedin.com/company/bayfancysingapore" />
              </div>
              <Button variant="ghost" size="icon" className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Instagram */}
            <div className="flex items-center space-x-4">
              <div className="bg-[#556B2F] p-2 rounded-md">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <Input defaultValue="https://instagram.com/bayfancysg" />
              </div>
              <Button variant="ghost" size="icon" className="text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Social Media Link
          </Button>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button className="bg-[#556B2F] hover:bg-[#4A5F29]">Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Footer Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Nav Item 1 */}
            <div className="flex items-center space-x-4 p-3 border rounded-md">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nav-1-label">Link Text</Label>
                  <Input id="nav-1-label" defaultValue="About Us" />
                </div>
                <div>
                  <Label htmlFor="nav-1-url">URL</Label>
                  <Input id="nav-1-url" defaultValue="/about" />
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon">
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Nav Item 2 */}
            <div className="flex items-center space-x-4 p-3 border rounded-md">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nav-2-label">Link Text</Label>
                  <Input id="nav-2-label" defaultValue="Our Businesses" />
                </div>
                <div>
                  <Label htmlFor="nav-2-url">URL</Label>
                  <Input id="nav-2-url" defaultValue="/businesses" />
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon">
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Nav Item 3 */}
            <div className="flex items-center space-x-4 p-3 border rounded-md">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nav-3-label">Link Text</Label>
                  <Input id="nav-3-label" defaultValue="Media" />
                </div>
                <div>
                  <Label htmlFor="nav-3-url">URL</Label>
                  <Input id="nav-3-url" defaultValue="/media" />
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon">
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Navigation Item
          </Button>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button className="bg-[#556B2F] hover:bg-[#4A5F29]">Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company-address">Company Address</Label>
            <Textarea
              id="company-address"
              className="min-h-20"
              defaultValue="123 Marina Bay Drive, #30-01 Bayfancy Tower, Singapore 018971"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-email">Contact Email</Label>
            <Input id="company-email" defaultValue="info@bayfancysingapore.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-phone">Contact Phone</Label>
            <Input id="company-phone" defaultValue="+65 6123 4567" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="copyright-text">Copyright Text</Label>
            <Input id="copyright-text" defaultValue="© 2023 Bayfancy Singapore. All Rights Reserved." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button className="bg-[#556B2F] hover:bg-[#4A5F29]">Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Legal Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Pages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="terms-url">Terms & Conditions Page</Label>
            <Input id="terms-url" defaultValue="/terms-conditions" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="privacy-url">Privacy Policy Page</Label>
            <Input id="privacy-url" defaultValue="/privacy-policy" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button className="bg-[#556B2F] hover:bg-[#4A5F29]">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

