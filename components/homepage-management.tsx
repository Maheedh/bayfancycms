import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BannerSection } from "@/components/homepage/banner-section"
import { WelcomeSection } from "@/components/homepage/welcome-section"
import { RecentUpdatesSection } from "@/components/homepage/recent-updates-section"
import { FooterSection } from "@/components/homepage/footer-section"

export function HomepageManagement() {
  return (
    <Tabs defaultValue="banner" className="space-y-4">
      <TabsList className="bg-muted/50">
        <TabsTrigger value="banner">News Banner</TabsTrigger>
        <TabsTrigger value="welcome">Welcome Section</TabsTrigger>
        <TabsTrigger value="updates">Recent Updates</TabsTrigger>
        <TabsTrigger value="footer">Footer</TabsTrigger>
      </TabsList>
      <TabsContent value="banner" className="space-y-4">
        <BannerSection />
      </TabsContent>
      <TabsContent value="welcome" className="space-y-4">
        <WelcomeSection />
      </TabsContent>
      <TabsContent value="updates" className="space-y-4">
        <RecentUpdatesSection />
      </TabsContent>
      <TabsContent value="footer" className="space-y-4">
        <FooterSection />
      </TabsContent>
    </Tabs>
  )
}

