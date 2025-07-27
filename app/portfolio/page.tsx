"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()

  const categories = ["all", "web", "mobile", "ai", "design"]

  const projects = [
    {
      id: 1,
      title: "Neural Dashboard",
      description: "AI-powered analytics platform with real-time data visualization and machine learning insights",
      category: "ai",
      tech: ["React", "TypeScript", "D3.js", "Python"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
      github: "#",
      demo: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Quantum Commerce",
      description: "Next-generation e-commerce platform with AR integration and immersive shopping experiences",
      category: "web",
      tech: ["Next.js", "WebGL", "Stripe", "Three.js"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
      github: "#",
      demo: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Mindful Mobile",
      description: "Meditation app with biometric feedback, AI coaching, and personalized wellness tracking",
      category: "mobile",
      tech: ["React Native", "TensorFlow", "Firebase", "HealthKit"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&crop=center",
      github: "#",
      demo: "#",
      featured: false,
    },
    {
      id: 4,
      title: "CloudSync Pro",
      description: "Enterprise cloud storage solution with advanced security and real-time collaboration features",
      category: "web",
      tech: ["Vue.js", "Node.js", "AWS", "Docker"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center",
      github: "#",
      demo: "#",
      featured: false,
    },
    {
      id: 5,
      title: "FinTech Dashboard",
      description: "Comprehensive financial analytics platform with real-time market data and portfolio management",
      category: "web",
      tech: ["Angular", "Python", "PostgreSQL", "Redis"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&crop=center",
      github: "#",
      demo: "#",
      featured: true,
    },
    {
      id: 6,
      title: "Smart Home Hub",
      description: "IoT management platform for smart home devices with voice control and automation workflows",
      category: "ai",
      tech: ["React", "IoT", "Raspberry Pi", "MQTT"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
      github: "#",
      demo: "#",
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
            <h1 className="text-3xl font-light">Creative Portfolio</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Portfolio Active</span>
          </div>
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
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  : "border-gray-700 text-gray-300 hover:border-orange-500"
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
              className="group cursor-pointer border border-gray-800 hover:border-gray-600 bg-gray-900/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
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
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-orange-400 hover:text-orange-300 font-medium hover:bg-transparent"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-gray-400 hover:text-gray-300 font-medium hover:bg-transparent"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
