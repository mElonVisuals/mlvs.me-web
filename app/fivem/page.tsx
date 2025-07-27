"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Car, Server, Code, Users, Download, ExternalLink, Play, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FiveMPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()

  const categories = ["all", "scripts", "resources", "maps", "vehicles"]

  const projects = [
    {
      id: 1,
      title: "Advanced Police System",
      description: "Complete police roleplay system with MDT, dispatch, and evidence management",
      category: "scripts",
      tech: ["Lua", "JavaScript", "MySQL", "React"],
      downloads: "2.3k",
      rating: 4.8,
      price: "Free",
      featured: true,
    },
    {
      id: 2,
      title: "Custom Vehicle Pack",
      description: "High-quality vehicle models with custom handling and performance tuning",
      category: "vehicles",
      tech: ["3D Modeling", "Handling", "Meta Files"],
      downloads: "1.8k",
      rating: 4.6,
      price: "$15",
      featured: true,
    },
    {
      id: 3,
      title: "Banking & Economy",
      description: "Comprehensive banking system with loans, investments, and business management",
      category: "scripts",
      tech: ["Lua", "MySQL", "Web UI"],
      downloads: "3.1k",
      rating: 4.9,
      price: "$25",
      featured: false,
    },
    {
      id: 4,
      title: "Custom Map: Downtown",
      description: "Detailed downtown area with custom buildings and interactive elements",
      category: "maps",
      tech: ["CodeWalker", "OpenIV", "Blender"],
      downloads: "956",
      rating: 4.4,
      price: "Free",
      featured: false,
    },
    {
      id: 5,
      title: "Hospital & EMS System",
      description: "Medical roleplay system with injury mechanics and ambulance dispatch",
      category: "scripts",
      tech: ["Lua", "JavaScript", "MySQL"],
      downloads: "1.5k",
      rating: 4.7,
      price: "$20",
      featured: true,
    },
    {
      id: 6,
      title: "Server Management Tools",
      description: "Admin panel and server management utilities for FiveM servers",
      category: "resources",
      tech: ["Node.js", "React", "Socket.io"],
      downloads: "892",
      rating: 4.5,
      price: "$30",
      featured: false,
    },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button onClick={() => router.back()} variant="ghost" className="text-gray-400 hover:text-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-light">FiveM Development</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">FiveM Hub Active</span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Code, label: "Scripts", value: "15+", color: "text-blue-400" },
            { icon: Car, label: "Vehicles", value: "8", color: "text-green-400" },
            { icon: Server, label: "Resources", value: "12", color: "text-purple-400" },
            { icon: Users, label: "Downloads", value: "10.2k", color: "text-orange-400" },
          ].map((stat, index) => (
            <Card key={stat.label} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`capitalize ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  : "border-gray-700 text-gray-300 hover:border-green-500"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group cursor-pointer border border-gray-800 hover:border-gray-600 bg-gray-900/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10"
            >
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg overflow-hidden relative flex items-center justify-center">
                  <div className="text-6xl text-gray-600 group-hover:text-green-400 transition-colors duration-300">
                    {project.category === "scripts" && <Code />}
                    {project.category === "vehicles" && <Car />}
                    {project.category === "maps" && <Server />}
                    {project.category === "resources" && <Settings />}
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-gray-800/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                    {project.price}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-100 group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-400">{project.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{project.downloads}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto text-green-400 hover:text-green-300 font-medium hover:bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto text-gray-400 hover:text-gray-300 font-medium hover:bg-transparent"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Server Information */}
        <div className="mt-12">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-green-400" />
                <span>Development Server</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-100 mb-4">Server Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Server IP:</span>
                      <span className="text-gray-200 font-mono">connect mlvs.me:30120</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Players:</span>
                      <span className="text-gray-200">24/64</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Framework:</span>
                      <span className="text-gray-200">ESX Legacy</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-100 mb-4">Features</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm text-gray-300">Custom Economy System</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm text-gray-300">Advanced Police & EMS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm text-gray-300">Custom Vehicles & Maps</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm text-gray-300">Active Community</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
