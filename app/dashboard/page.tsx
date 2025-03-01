"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import HomePage from "@/components/cms/HomePage"
import AboutPage from "@/components/cms/AboutPage"
import BusinessesPage from "@/components/cms/BusinessesPage"
import NewsMediaPage from "@/components/cms/NewsMediaPage"
import ContactPage from "@/components/cms/ContactPage"

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("home")

  const renderActivePage = () => {
    switch (activePage) {
      case "home":
        return <HomePage />
      case "about":
        return <AboutPage />
      case "businesses":
        return <BusinessesPage />
      case "news":
        return <NewsMediaPage />
      case "contact":
        return <ContactPage />
      default:
        return <HomePage />
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Content Management"
        description="Manage all content for the Bayfancy Singapore website."
      />
      <div className="flex">
        <nav className="w-64 pr-8">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${activePage === "home" ? "bg-[#556B2F] text-white" : "hover:bg-gray-100"}`}
                onClick={() => setActivePage("home")}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${activePage === "about" ? "bg-[#556B2F] text-white" : "hover:bg-gray-100"}`}
                onClick={() => setActivePage("about")}
              >
                About Us
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${activePage === "businesses" ? "bg-[#556B2F] text-white" : "hover:bg-gray-100"}`}
                onClick={() => setActivePage("businesses")}
              >
                Our Businesses
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${activePage === "news" ? "bg-[#556B2F] text-white" : "hover:bg-gray-100"}`}
                onClick={() => setActivePage("news")}
              >
                News & Media
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${activePage === "contact" ? "bg-[#556B2F] text-white" : "hover:bg-gray-100"}`}
                onClick={() => setActivePage("contact")}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
        <div className="flex-1">{renderActivePage()}</div>
      </div>
    </DashboardShell>
  )
}

