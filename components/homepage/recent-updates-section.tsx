import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function RecentUpdatesSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Updates Section</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="updates-active">Display Recent Updates</Label>
              <p className="text-sm text-muted-foreground">Show or hide the recent updates section on the homepage</p>
            </div>
            <Switch id="updates-active" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="updates-heading">Section Heading</Label>
            <Input id="updates-heading" defaultValue="Latest News & Updates" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="updates-count">Number of Items to Display</Label>
              <Select defaultValue="3">
                <SelectTrigger id="updates-count">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Items</SelectItem>
                  <SelectItem value="4">4 Items</SelectItem>
                  <SelectItem value="6">6 Items</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="updates-types">Content Types to Include</Label>
              <Select defaultValue="all">
                <SelectTrigger id="updates-types">
                  <SelectValue placeholder="Select types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="news">News Only</SelectItem>
                  <SelectItem value="events">Events Only</SelectItem>
                  <SelectItem value="announcements">Announcements Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="updates-cta">View All Button Text</Label>
            <Input id="updates-cta" defaultValue="View All News & Updates" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="updates-link">View All Link</Label>
            <Input id="updates-link" defaultValue="/media" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button className="bg-[#556B2F] hover:bg-[#4A5F29]">Save Changes</Button>
        </CardFooter>
      </Card>

      <div className="pt-4">
        <h3 className="text-lg font-medium mb-4">Preview of Recent Updates</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Preview Card 1 */}
          <Card>
            <div className="aspect-video bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Thumbnail Image</span>
            </div>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-1">October 15, 2023 • News</p>
              <h4 className="font-medium mb-2">New Development Project Announced</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Bayfancy Singapore announces a new development project in the heart of the city...
              </p>
            </CardContent>
          </Card>

          {/* Preview Card 2 */}
          <Card>
            <div className="aspect-video bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Thumbnail Image</span>
            </div>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-1">October 10, 2023 • Event</p>
              <h4 className="font-medium mb-2">Annual Architecture Showcase</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Join us for our annual architecture showcase featuring innovative designs...
              </p>
            </CardContent>
          </Card>

          {/* Preview Card 3 */}
          <Card>
            <div className="aspect-video bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Thumbnail Image</span>
            </div>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-1">October 5, 2023 • Announcement</p>
              <h4 className="font-medium mb-2">Partnership with Global Construction Firm</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Bayfancy Singapore is proud to announce a strategic partnership with...
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Note: This is a preview based on the most recent content in the Media section. To manage individual media
            items, please go to the Media section.
          </p>
        </div>
      </div>
    </div>
  )
}

