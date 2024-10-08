'use client'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, LayoutDashboard, Globe, ChevronLast, ChevronFirst } from "lucide-react"

type Service = {
  name: string
  category: string
  status: "Up" | "Degraded" | "Down"
  uptime7Days: number
  uptime30Days: number
  connectedTo: string[]
  connectedFrom: string[]
}

const services: Service[] = [
  {
    name: "Vercel",
    category: "Frontend",
    status: "Up",
    uptime7Days: 100,
    uptime30Days: 99.99,
    connectedTo: ["AWS", "HubSpot"],
    connectedFrom: [],
  },
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    status: "Up",
    uptime7Days: 99.99,
    uptime30Days: 99.95,
    connectedTo: ["MongoDB"],
    connectedFrom: ["Vercel"],
  },
  {
    name: "MongoDB",
    category: "Database",
    status: "Up",
    uptime7Days: 99.98,
    uptime30Days: 99.97,
    connectedTo: [],
    connectedFrom: ["AWS"],
  },
  {
    name: "HubSpot",
    category: "Marketing Tech",
    status: "Degraded",
    uptime7Days: 99.5,
    uptime30Days: 99.8,
    connectedTo: [],
    connectedFrom: ["Vercel"],
  },
]

function ServiceCard({ service }: { service: Service }) {
  const getStatusColor = (status: Service["status"]) => {
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
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Uptime</p>
            <p className="text-sm">7 Days: {service.uptime7Days}%</p>
            <p className="text-sm">30 Days: {service.uptime30Days}%</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
            <span className="text-sm font-medium">{service.status}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ServiceNode({ service, x, y, isHovered, onMouseEnter, onMouseLeave }: { 
  service: Service
  x: number
  y: number
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void 
}) {
  const getStatusColor = (status: Service["status"]) => {
    switch (status) {
      case "Up":
        return "#22c55e"
      case "Degraded":
        return "#eab308"
      case "Down":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="20"
        fill={getStatusColor(service.status)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ cursor: 'pointer' }}
      />
      <text x={x} y={y} textAnchor="middle" dy=".3em" fill="white" fontSize="10">
        {service.name}
      </text>
      {isHovered && (
        <foreignObject x={x + 25} y={y - 40} width="180" height="100">
          <div className="bg-white p-2 rounded shadow-lg text-xs border border-gray-200">
            <div className="font-bold">{service.name}</div>
            <div className="text-gray-600">{service.category}</div>
            <div className="mt-1">
              <span className="font-semibold">Uptime:</span>
              <br />
              7 Days: {service.uptime7Days}%
              <br />
              30 Days: {service.uptime30Days}%
            </div>
            <div className="mt-1 flex items-center">
              <div className={`w-2 h-2 rounded-full bg-[${getStatusColor(service.status)}] mr-1`}></div>
              <span>{service.status}</span>
            </div>
          </div>
        </foreignObject>
      )}
    </g>
  )
}

function ServiceMap({ services }: { services: Service[] }) {
  const [hoveredService, setHoveredService] = useState<Service | null>(null)

  const width = 1000
  const height = 600
  const leftColumnWidth = width * 0.65
  const rightColumnWidth = width * 0.35
  const rowHeight = height / 3

  const getServiceCoordinates = (service: Service) => {
    switch (service.category) {
      case "Frontend":
        return { x: leftColumnWidth / 2, y: rowHeight / 2 }
      case "Cloud Infrastructure":
        return { x: leftColumnWidth / 2, y: rowHeight * 1.5 }
      case "Database":
        return { x: leftColumnWidth / 2, y: rowHeight * 2.5 }
      case "Marketing Tech":
        return { x: leftColumnWidth + rightColumnWidth / 2, y: height / 2 }
      default:
        return { x: 0, y: 0 }
    }
  }

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      {/* Left column sections */}
      <rect x="0" y="0" width={leftColumnWidth} height={rowHeight} fill="#f0f9ff" />
      <rect x="0" y={rowHeight} width={leftColumnWidth} height={rowHeight} fill="#ecfdf5" />
      <rect x="0" y={rowHeight * 2} width={leftColumnWidth} height={rowHeight} fill="#fffbeb" />

      {/* Right column section */}
      <rect x={leftColumnWidth} y="0" width={rightColumnWidth} height={height} fill="#fdf2f8" />

      {/* Section labels */}
      <text x={leftColumnWidth - 10} y="20" textAnchor="end" fontSize="12" fontWeight="bold">Frontend</text>
      <text x={leftColumnWidth - 10} y={rowHeight + 20} textAnchor="end" fontSize="12" fontWeight="bold">Cloud Infrastructure</text>
      <text x={leftColumnWidth - 10} y={rowHeight * 2 + 20} textAnchor="end" fontSize="12" fontWeight="bold">Database</text>
      <text x={width - 10} y="20" textAnchor="end" fontSize="12" fontWeight="bold">Marketing Tech</text>

      {/* Connection lines */}
      {services.map((service) => {
        const { x: x1, y: y1 } = getServiceCoordinates(service)
        return service.connectedTo.map((targetName) => {
          const targetService = services.find((s) => s.name === targetName)
          if (targetService) {
            const { x: x2, y: y2 } = getServiceCoordinates(targetService)
            return (
              <line
                key={`${service.name}-${targetName}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
            )
          }
          return null
        })
      })}

      {/* Service nodes */}
      {services.map((service) => {
        const { x, y } = getServiceCoordinates(service)
        return (
          <ServiceNode
            key={service.name}
            service={service}
            x={x}
            y={y}
            isHovered={hoveredService === service}
            onMouseEnter={() => setHoveredService(service)}
            onMouseLeave={() => setHoveredService(null)}
          />
        )
      })}
    </svg>
  )
}

function ServiceList({ services }: { services: Service[] }) {
  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedServices).map(([category, categoryServices]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-2">{category}</h3>
          <div className="grid gap-4 ">
            {categoryServices.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServiceStatusDashboard() {
  const [showMap, setShowMap] = useState(false)
  const [activeView, setActiveView] = useState<"your" | "all">("your")
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
  

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {activeView === "your" ? "Your Services" : "All Services"}
          </h2>
          <div className="flex items-center space-x-2">
            <Label htmlFor="map-toggle">
              {showMap ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Label>
            <Switch id="map-toggle" checked={showMap} onCheckedChange={setShowMap} />
            <Label htmlFor="map-toggle">{showMap ? "Map View" : "List View"}</Label>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          {showMap ? (
            <ServiceMap services={services} />
          ) : (
            <ServiceList services={services} />
          )}
        </div>
      </div>
    </div>
  )
}