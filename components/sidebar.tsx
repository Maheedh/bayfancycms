import Link from "next/link"
import { Home, Info, Briefcase, FileText, Image, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-black text-white h-screen">
      {/* Logo area */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">Bayfancy Singapore</h1>
        <p className="text-xs text-gray-400 mt-1">Content Management System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs text-gray-500 mb-2 pl-2">CONTENT</p>

        <Link
          href="/dashboard"
          className="flex items-center p-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white bg-gray-800 text-white"
        >
          <Home className="h-5 w-5 mr-3" />
          <span>Home Page</span>
        </Link>

        <Link
          href="/dashboard/about"
          className="flex items-center p-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white"
        >
          <Info className="h-5 w-5 mr-3" />
          <span>About Us</span>
        </Link>

        <Link
          href="/dashboard/businesses"
          className="flex items-center p-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white"
        >
          <Briefcase className="h-5 w-5 mr-3" />
          <span>Our Businesses</span>
        </Link>

        <Link
          href="/dashboard/media"
          className="flex items-center p-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white"
        >
          <FileText className="h-5 w-5 mr-3" />
          <span>Media</span>
        </Link>

        <Link
          href="/dashboard/media-library"
          className="flex items-center p-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white"
        >
          <Image className="h-5 w-5 mr-3" />
          <span>Media Library</span>
        </Link>

        <p className="text-xs text-gray-500 mt-6 mb-2 pl-2">SETTINGS</p>

        <Link
          href="/dashboard/settings"
          className="flex items-center p-2 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white"
        >
          <Settings className="h-5 w-5 mr-3" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* User area */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#556B2F] flex items-center justify-center mr-2">
            <span className="text-white text-sm font-medium">AS</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@bayfancy.com</p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-white">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

