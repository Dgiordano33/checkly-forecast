'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const yourServices = [
  {
    name: "Vercel",
    category: "Frontend",
    status: "Up",
    uptime7Days: 100,
    uptime30Days: 99.99,
  },
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    status: "Up",
    uptime7Days: 99.99,
    uptime30Days: 99.95,
  },
]

function ServiceCard({ service }: { service: typeof yourServices[0] }) {
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
          <p className="text-sm">7 Days Uptime: {service.uptime7Days}%</p>
          <p className="text-sm">30 Days Uptime: {service.uptime30Days}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Services</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {yourServices.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>
    </div>
  )
}