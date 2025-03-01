"use client"

import { useState } from "react"
import HomePage from "@/components/cms/HomePage"
import AboutPage from "@/components/cms/AboutPage"
import BusinessesPage from "@/components/cms/BusinessesPage"
import NewsMediaPage from "@/components/cms/NewsMediaPage"
import ContactPage from "@/components/cms/ContactPage"

export default function CMS() {
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
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Bayfancy CMS</h1>
        </div>
        <ul className="py-4">
          <li>
            <button
              className={`w-full text-left px-4 py-2 ${activePage === "home" ? "bg-gray-200" : ""}`}
              onClick={() => setActivePage("home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 ${activePage === "about" ? "bg-gray-200" : ""}`}
              onClick={() => setActivePage("about")}
            >
              About Us
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 ${activePage === "businesses" ? "bg-gray-200" : ""}`}
              onClick={() => setActivePage("businesses")}
            >
              Our Businesses
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 ${activePage === "news" ? "bg-gray-200" : ""}`}
              onClick={() => setActivePage("news")}
            >
              News & Media
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 ${activePage === "contact" ? "bg-gray-200" : ""}`}
              onClick={() => setActivePage("contact")}
            >
              Contact Us
            </button>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-auto">{renderActivePage()}</main>
    </div>
  )
}

