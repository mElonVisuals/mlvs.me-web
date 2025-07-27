"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Code, Book, Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DocsPage() {
  const [selectedSection, setSelectedSection] = useState("getting-started")
  const router = useRouter()

  const sections = [
    { id: "getting-started", title: "Getting Started", icon: Book },
    { id: "api-reference", title: "API Reference", icon: Code },
    { id: "tutorials", title: "Tutorials", icon: FileText },
    { id: "examples", title: "Examples", icon: Code },
  ]

  const content = {
    "getting-started": {
      title: "Getting Started",
      content: `
# Welcome to MLVS Documentation

This documentation will help you get started with the MLVS platform and explore all available features.

## Quick Start

1. **Authentication**: Use the invitation code system to access the platform
2. **Navigation**: Explore different sections through the 3D loading character
3. **Features**: Each destination offers unique functionality

## Platform Overview

The MLVS platform consists of several interconnected modules:

- **Control Dashboard**: System monitoring and analytics
- **3D Playground**: Interactive 3D environments
- **Creative Portfolio**: Project showcases and galleries
- **Code Laboratory**: Development and experimentation tools
- **Digital Universe**: Immersive space exploration
- **Documentation**: This comprehensive guide

## System Requirements

- Modern web browser with WebGL support
- JavaScript enabled
- Minimum 4GB RAM recommended
- Stable internet connection
      `,
    },
    "api-reference": {
      title: "API Reference",
      content: `
# API Reference

## Authentication

### POST /api/auth/login
Authenticate with invitation code

\`\`\`javascript
{
  "invitationCode": "TEST",
  "timestamp": "2025-01-27T16:38:30Z"
}
\`\`\`

### Response
\`\`\`javascript
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "permissions": ["dashboard", "playground", "portfolio"]
  }
}
\`\`\`

## Dashboard API

### GET /api/dashboard/metrics
Retrieve system metrics

### GET /api/dashboard/logs
Fetch system logs with pagination

## 3D Playground API

### POST /api/playground/scene
Create new 3D scene

### GET /api/playground/objects
List available 3D objects
      `,
    },
    tutorials: {
      title: "Tutorials",
      content: `
# Tutorials

## Tutorial 1: Setting Up Your First Project

Learn how to create and configure your first project in the MLVS platform.

### Step 1: Access the Platform
1. Navigate to the invitation page
2. Enter your invitation code
3. Complete the authentication process

### Step 2: Explore the Dashboard
1. Use the 3D loading character to navigate
2. Select "Control Dashboard" from the destinations
3. Familiarize yourself with the interface

### Step 3: Create Your First Scene
1. Navigate to the 3D Playground
2. Use the scene editor to add objects
3. Configure physics and interactions

## Tutorial 2: Building Interactive Experiences

Advanced techniques for creating engaging user experiences.

## Tutorial 3: Performance Optimization

Best practices for optimizing your applications.
      `,
    },
    examples: {
      title: "Code Examples",
      content: `
# Code Examples

## Basic 3D Scene Setup

\`\`\`javascript
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
\`\`\`

## Dashboard Widget Creation

\`\`\`javascript
const widget = {
  id: 'cpu-usage',
  title: 'CPU Usage',
  type: 'chart',
  config: {
    chartType: 'line',
    dataSource: '/api/metrics/cpu',
    refreshInterval: 1000
  }
};

dashboard.addWidget(widget);
\`\`\`

## Portfolio Project Structure

\`\`\`javascript
const project = {
  title: 'My Awesome Project',
  description: 'A detailed description of the project',
  technologies: ['React', 'Three.js', 'Node.js'],
  images: ['screenshot1.jpg', 'screenshot2.jpg'],
  demoUrl: 'https://demo.example.com',
  githubUrl: 'https://github.com/user/project'
};
\`\`\`
      `,
    },
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/50 border-r border-gray-800 min-h-screen p-6">
          <div className="flex items-center space-x-4 mb-8">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-light">Documentation</h1>
          </div>

          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedSection === section.id
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/50"
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="text-sm">{section.title}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search docs..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-light">{content[selectedSection as keyof typeof content].title}</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Docs Active</span>
              </div>
            </div>

            <Card className="bg-gray-900/30 border-gray-800">
              <CardContent className="p-8">
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {content[selectedSection as keyof typeof content].content}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:border-yellow-500 bg-transparent"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:border-yellow-500 bg-transparent"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
