'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMemo } from "react"

const allServices = [
  {
    name: "Vercel",
    category: "Frontend",
    status: "Up",
    responseTime: "45ms",
    lastIncident: "None",
    featured: true,
  },
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    status: "Up",
    responseTime: "55ms",
    lastIncident: "3 days ago",
    featured: true,
  },
  {
    name: "MongoDB",
    category: "Database",
    status: "Up",
    responseTime: "30ms",
    lastIncident: "1 week ago",
    featured: false,
  },
  {
    name: "HubSpot",
    category: "Marketing Tech",
    status: "Degraded",
    responseTime: "120ms",
    lastIncident: "Ongoing",
    featured: false,
  },
  {
    name: "Twilio",
    category: "Marketing Tech",
    status: "Up",
    responseTime: "60ms",
    lastIncident: "2 weeks ago",
    featured: true,
  },
]

function ServiceCard({ service }: { service: typeof allServices[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Up":
        return "bg-green-500"
      case "Degraded":
        return "bg-yellow-500"
      case "Down":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{service.name}</CardTitle>
        <div className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(service.status)}`}>
          {service.status}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-600">{service.category}</div>
        <div className="mt-2 space-y-1">
          <p className="text-sm">Response Time: {service.responseTime}</p>
          <p className="text-sm">Last Incident: {service.lastIncident}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function Page() {
  // Filter out featured services
  const featuredServices = useMemo(() => allServices.filter(service => service.featured), [])
  
  // Group services by category
  const groupedServices = useMemo(() => {
    return allServices.reduce((acc, service) => {
      if (!acc[service.category]) acc[service.category] = []
      acc[service.category].push(service)
      return acc
    }, {} as Record<string, typeof allServices>)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
  

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
      {/* Most Popular Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Most Popular</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
      </div>

      {/* All Services Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Services</h2>
        {Object.entries(groupedServices).map(([category, services]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold mb-3">{category}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.name} service={service} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}