'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Globe, ChevronLast, ChevronFirst } from "lucide-react"

export function SidebarComponent() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`bg-white shadow-md transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold ${isExpanded ? 'block' : 'hidden'}`}>Dashboard</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          >
            {isExpanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>
        <nav className="space-y-2">
          <Link href="/" className={`flex items-center space-x-2 w-full p-2 rounded-md ${
            pathname === "/" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
          }`}>
            <LayoutDashboard size={20} />
            {isExpanded && <span>Your Services</span>}
          </Link>
          <Link href="/all-services" className={`flex items-center space-x-2 w-full p-2 rounded-md ${
            pathname === "/all-services" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
          }`}>
            <Globe size={20} />
            {isExpanded && <span>All Services</span>}
          </Link>
        </nav>
      </div>
    </div>
  )
}