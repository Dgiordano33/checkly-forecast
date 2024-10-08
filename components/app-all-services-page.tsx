'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const allServices = [
  {
    name: "Vercel",
    category: "Frontend",
    status: "Up",
    responseTime: "45ms",
    lastIncident: "None",
  },
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    status: "Up",
    responseTime: "55ms",
    lastIncident: "3 days ago",
  },
  {
    name: "MongoDB",
    category: "Database",
    status: "Up",
    responseTime: "30ms",
    lastIncident: "1 week ago",
  },
  {
    name: "HubSpot",
    category: "Marketing Tech",
    status: "Degraded",
    responseTime: "120ms",
    lastIncident: "Ongoing",
  },
  {
    name: "Twilio",
    category: "Marketing Tech",
    status: "Up",
    responseTime: "60ms",
    lastIncident: "2 weeks ago",
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
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Services</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allServices.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>
    </div>
  )
}