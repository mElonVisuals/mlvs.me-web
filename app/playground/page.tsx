"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Settings,
  Zap,
  CuboidIcon as Cube,
  SpaceIcon as Sphere,
  Triangle,
  Square,
  Eye,
  EyeOff,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface GameObject {
  id: string
  type: "cube" | "sphere" | "pyramid" | "plane"
  x: number
  y: number
  z: number
  rotationX: number
  rotationY: number
  rotationZ: number
  scaleX: number
  scaleY: number
  scaleZ: number
  color: string
  physics: boolean
  velocityX: number
  velocityY: number
  velocityZ: number
  mass: number
  visible: boolean
}

export default function PlaygroundPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedObject, setSelectedObject] = useState<GameObject | null>(null)
  const [objects, setObjects] = useState<GameObject[]>([])
  const [showPhysics, setShowPhysics] = useState(true)
  const [showGrid, setShowGrid] = useState(true)
  const [cameraX, setCameraX] = useState(0)
  const [cameraY, setCameraY] = useState(0)
  const [cameraZ, setCameraZ] = useState(5)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const router = useRouter()

  // Initialize with some default objects
  useEffect(() => {
    const defaultObjects: GameObject[] = [
      {
        id: "cube1",
        type: "cube",
        x: -2,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        color: "#FF6B6B",
        physics: true,
        velocityX: 0,
        velocityY: 0,
        velocityZ: 0,
        mass: 1,
        visible: true,
      },
      {
        id: "sphere1",
        type: "sphere",
        x: 2,
        y: 2,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        color: "#4ECDC4",
        physics: true,
        velocityX: 0,
        velocityY: -0.02,
        velocityZ: 0,
        mass: 0.8,
        visible: true,
      },
      {
        id: "pyramid1",
        type: "pyramid",
        x: 0,
        y: -1,
        z: -2,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1.5,
        scaleY: 1.5,
        scaleZ: 1.5,
        color: "#45B7D1",
        physics: false,
        velocityX: 0,
        velocityY: 0,
        velocityZ: 0,
        mass: 1.2,
        visible: true,
      },
    ]
    setObjects(defaultObjects)
  }, [])

  // 3D Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let time = 0
    let animationId: number

    const project3D = (x: number, y: number, z: number) => {
      const distance = 5
      const scale = distance / (distance + z - cameraZ)
      return {
        x: (x - cameraX) * scale * 100 + canvas.width / 2,
        y: -(y - cameraY) * scale * 100 + canvas.height / 2,
        scale,
      }
    }

    const drawCube = (obj: GameObject) => {
      const size = 0.5
      const vertices = [
        [-size, -size, -size],
        [size, -size, -size],
        [size, size, -size],
        [-size, size, -size],
        [-size, -size, size],
        [size, -size, size],
        [size, size, size],
        [-size, size, size],
      ]

      // Apply transformations
      const transformedVertices = vertices.map(([vx, vy, vz]) => {
        // Scale
        vx *= obj.scaleX
        vy *= obj.scaleY
        vz *= obj.scaleZ

        // Rotate
        const cosX = Math.cos(obj.rotationX)
        const sinX = Math.sin(obj.rotationX)
        const cosY = Math.cos(obj.rotationY)
        const sinY = Math.sin(obj.rotationY)
        const cosZ = Math.cos(obj.rotationZ)
        const sinZ = Math.sin(obj.rotationZ)

        // Rotation around X axis
        const y1 = vy * cosX - vz * sinX
        const z1 = vy * sinX + vz * cosX

        // Rotation around Y axis
        const x2 = vx * cosY + z1 * sinY
        const z2 = -vx * sinY + z1 * cosY

        // Rotation around Z axis
        const x3 = x2 * cosZ - y1 * sinZ
        const y3 = x2 * sinZ + y1 * cosZ

        // Translate
        return [x3 + obj.x, y3 + obj.y, z2 + obj.z]
      })

      const projectedVertices = transformedVertices.map(([x, y, z]) => project3D(x, y, z))

      // Draw faces
      const faces = [
        [0, 1, 2, 3], // Front
        [4, 7, 6, 5], // Back
        [0, 4, 5, 1], // Bottom
        [2, 6, 7, 3], // Top
        [0, 3, 7, 4], // Left
        [1, 5, 6, 2], // Right
      ]

      faces.forEach((face, faceIndex) => {
        const faceVertices = face.map((i) => projectedVertices[i])
        const avgZ = face.reduce((sum, i) => sum + transformedVertices[i][2], 0) / 4

        if (avgZ > cameraZ - 10) {
          const brightness = Math.max(0.3, Math.min(1, (avgZ + 5) / 10))
          const color = obj.color
          const r = Number.parseInt(color.slice(1, 3), 16)
          const g = Number.parseInt(color.slice(3, 5), 16)
          const b = Number.parseInt(color.slice(5, 7), 16)

          ctx.fillStyle = `rgba(${r * brightness}, ${g * brightness}, ${b * brightness}, 0.8)`
          ctx.strokeStyle = selectedObject?.id === obj.id ? "#FFFFFF" : `rgba(${r}, ${g}, ${b}, 1)`
          ctx.lineWidth = selectedObject?.id === obj.id ? 3 : 1

          ctx.beginPath()
          ctx.moveTo(faceVertices[0].x, faceVertices[0].y)
          faceVertices.slice(1).forEach((vertex) => ctx.lineTo(vertex.x, vertex.y))
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        }
      })
    }

    const drawSphere = (obj: GameObject) => {
      const projected = project3D(obj.x, obj.y, obj.z)
      const radius = 50 * obj.scaleX * projected.scale

      if (projected.scale > 0.1) {
        const gradient = ctx.createRadialGradient(
          projected.x - radius * 0.3,
          projected.y - radius * 0.3,
          0,
          projected.x,
          projected.y,
          radius,
        )
        gradient.addColorStop(0, obj.color)
        gradient.addColorStop(1, obj.color + "66")

        ctx.fillStyle = gradient
        ctx.strokeStyle = selectedObject?.id === obj.id ? "#FFFFFF" : obj.color
        ctx.lineWidth = selectedObject?.id === obj.id ? 3 : 2

        ctx.beginPath()
        ctx.arc(projected.x, projected.y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }
    }

    const drawPyramid = (obj: GameObject) => {
      const size = 0.5
      const vertices = [
        [0, size, 0], // Top
        [-size, -size, -size], // Bottom corners
        [size, -size, -size],
        [size, -size, size],
        [-size, -size, size],
      ]

      const transformedVertices = vertices.map(([vx, vy, vz]) => {
        vx *= obj.scaleX
        vy *= obj.scaleY
        vz *= obj.scaleZ

        const cosY = Math.cos(obj.rotationY)
        const sinY = Math.sin(obj.rotationY)
        const x2 = vx * cosY + vz * sinY
        const z2 = -vx * sinY + vz * cosY

        return [x2 + obj.x, vy + obj.y, z2 + obj.z]
      })

      const projectedVertices = transformedVertices.map(([x, y, z]) => project3D(x, y, z))

      const faces = [
        [0, 1, 2], // Front
        [0, 2, 3], // Right
        [0, 3, 4], // Back
        [0, 4, 1], // Left
        [1, 4, 3, 2], // Bottom
      ]

      faces.forEach((face) => {
        const faceVertices = face.map((i) => projectedVertices[i])
        const avgZ = face.reduce((sum, i) => sum + transformedVertices[i][2], 0) / face.length

        if (avgZ > cameraZ - 10) {
          const brightness = Math.max(0.3, Math.min(1, (avgZ + 5) / 10))
          const color = obj.color
          const r = Number.parseInt(color.slice(1, 3), 16)
          const g = Number.parseInt(color.slice(3, 5), 16)
          const b = Number.parseInt(color.slice(5, 7), 16)

          ctx.fillStyle = `rgba(${r * brightness}, ${g * brightness}, ${b * brightness}, 0.8)`
          ctx.strokeStyle = selectedObject?.id === obj.id ? "#FFFFFF" : `rgba(${r}, ${g}, ${b}, 1)`
          ctx.lineWidth = selectedObject?.id === obj.id ? 3 : 1

          ctx.beginPath()
          ctx.moveTo(faceVertices[0].x, faceVertices[0].y)
          faceVertices.slice(1).forEach((vertex) => ctx.lineTo(vertex.x, vertex.y))
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        }
      })
    }

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "#0F172A"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      if (showGrid) {
        ctx.strokeStyle = "#1E293B"
        ctx.lineWidth = 1
        for (let i = -10; i <= 10; i++) {
          const startProj = project3D(i, 0, -10)
          const endProj = project3D(i, 0, 10)
          ctx.beginPath()
          ctx.moveTo(startProj.x, startProj.y)
          ctx.lineTo(endProj.x, endProj.y)
          ctx.stroke()

          const startProj2 = project3D(-10, 0, i)
          const endProj2 = project3D(10, 0, i)
          ctx.beginPath()
          ctx.moveTo(startProj2.x, startProj2.y)
          ctx.lineTo(endProj2.x, endProj2.y)
          ctx.stroke()
        }
      }

      // Create a copy of objects for physics updates
      const currentObjects = [...objects]

      // Update physics and render objects
      const updatedObjects = currentObjects.map((obj) => {
        if (!obj.visible) return obj

        const newObj = { ...obj }

        if (showPhysics && obj.physics && isPlaying) {
          // Apply gravity
          newObj.velocityY -= 0.001

          // Update position
          newObj.x += newObj.velocityX
          newObj.y += newObj.velocityY
          newObj.z += newObj.velocityZ

          // Ground collision
          if (newObj.y < -2) {
            newObj.y = -2
            newObj.velocityY = -newObj.velocityY * 0.8 // Bounce with energy loss
          }

          // Boundary collisions
          if (Math.abs(newObj.x) > 5) {
            newObj.velocityX = -newObj.velocityX * 0.8
            newObj.x = Math.sign(newObj.x) * 5
          }
          if (Math.abs(newObj.z) > 5) {
            newObj.velocityZ = -newObj.velocityZ * 0.8
            newObj.z = Math.sign(newObj.z) * 5
          }

          // Auto rotation for dynamic objects
          newObj.rotationX += 0.01
          newObj.rotationY += 0.02
        }

        // Render object
        switch (obj.type) {
          case "cube":
            drawCube(newObj)
            break
          case "sphere":
            drawSphere(newObj)
            break
          case "pyramid":
            drawPyramid(newObj)
            break
        }

        return newObj
      })

      // Only update state if objects have actually changed
      const hasChanges = updatedObjects.some((obj, index) => {
        const original = currentObjects[index]
        return (
          !original ||
          obj.x !== original.x ||
          obj.y !== original.y ||
          obj.z !== original.z ||
          obj.rotationX !== original.rotationX ||
          obj.rotationY !== original.rotationY ||
          obj.velocityX !== original.velocityX ||
          obj.velocityY !== original.velocityY ||
          obj.velocityZ !== original.velocityZ
        )
      })

      if (hasChanges) {
        setObjects(updatedObjects)
      }

      time += 1
      if (isPlaying) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPlaying, showPhysics, showGrid, cameraX, cameraY, cameraZ, selectedObject?.id]) // Removed 'objects' from dependencies

  // Mouse controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = (e.clientX - dragStart.x) * 0.01
      const deltaY = (e.clientY - dragStart.y) * 0.01
      setCameraX((prev) => prev - deltaX)
      setCameraY((prev) => prev + deltaY)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setCameraZ((prev) => Math.max(1, Math.min(20, prev + e.deltaY * 0.01)))
  }

  const addObject = (type: GameObject["type"]) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]
    const newObject: GameObject = {
      id: `${type}_${Date.now()}`,
      type,
      x: (Math.random() - 0.5) * 4,
      y: Math.random() * 3 + 1,
      z: (Math.random() - 0.5) * 4,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      physics: true,
      velocityX: (Math.random() - 0.5) * 0.02,
      velocityY: 0,
      velocityZ: (Math.random() - 0.5) * 0.02,
      mass: Math.random() * 0.5 + 0.5,
      visible: true,
    }
    setObjects((prev) => [...prev, newObject])
  }

  const deleteObject = (id: string) => {
    setObjects((prev) => prev.filter((obj) => obj.id !== id))
    if (selectedObject?.id === id) {
      setSelectedObject(null)
    }
  }

  const updateObject = (id: string, updates: Partial<GameObject>) => {
    setObjects((prev) => prev.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj)))
    if (selectedObject?.id === id) {
      setSelectedObject((prev) => (prev ? { ...prev, ...updates } : null))
    }
  }

  const resetScene = () => {
    setObjects([])
    setSelectedObject(null)
    setCameraX(0)
    setCameraY(0)
    setCameraZ(5)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={() => router.back()} variant="ghost" className="text-gray-400 hover:text-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-light">3D Playground</h1>
            </div>

            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-100"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button onClick={resetScene} variant="ghost" size="sm" className="text-gray-400 hover:text-gray-100">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setShowPhysics(!showPhysics)}
                variant="ghost"
                size="sm"
                className={`${showPhysics ? "text-green-400" : "text-gray-400"} hover:text-gray-100`}
              >
                <Zap className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setShowGrid(!showGrid)}
                variant="ghost"
                size="sm"
                className={`${showGrid ? "text-blue-400" : "text-gray-400"} hover:text-gray-100`}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 3D Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-screen cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ marginTop: "80px" }}
        />

        {/* Controls Info */}
        <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-100 mb-2">Controls</h4>
          <div className="space-y-1 text-xs text-gray-400">
            <div>Drag: Rotate camera</div>
            <div>Scroll: Zoom in/out</div>
            <div>Physics: {showPhysics ? "ON" : "OFF"}</div>
            <div>Objects: {objects.length}</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-80 bg-gray-900/50 border-l border-gray-800 p-4 overflow-y-auto">
        {/* Add Objects */}
        <Card className="mb-4 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Objects</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => addObject("cube")} variant="outline" size="sm" className="border-gray-600">
                <Cube className="w-4 h-4 mr-2" />
                Cube
              </Button>
              <Button onClick={() => addObject("sphere")} variant="outline" size="sm" className="border-gray-600">
                <Sphere className="w-4 h-4 mr-2" />
                Sphere
              </Button>
              <Button onClick={() => addObject("pyramid")} variant="outline" size="sm" className="border-gray-600">
                <Triangle className="w-4 h-4 mr-2" />
                Pyramid
              </Button>
              <Button onClick={() => addObject("plane")} variant="outline" size="sm" className="border-gray-600">
                <Square className="w-4 h-4 mr-2" />
                Plane
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Object List */}
        <Card className="mb-4 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Scene Objects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {objects.map((obj) => (
                <div
                  key={obj.id}
                  className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-colors ${
                    selectedObject?.id === obj.id
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                  onClick={() => setSelectedObject(obj)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: obj.color }} />
                    <span className="text-sm capitalize">{obj.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        updateObject(obj.id, { visible: !obj.visible })
                      }}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto"
                    >
                      {obj.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteObject(obj.id)
                      }}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Object Properties */}
        {selectedObject && (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Position</label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <input
                      type="number"
                      step="0.1"
                      value={selectedObject.x.toFixed(1)}
                      onChange={(e) => updateObject(selectedObject.id, { x: Number.parseFloat(e.target.value) })}
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs"
                    />
                    <input
                      type="number"
                      step="0.1"
                      value={selectedObject.y.toFixed(1)}
                      onChange={(e) => updateObject(selectedObject.id, { y: Number.parseFloat(e.target.value) })}
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs"
                    />
                    <input
                      type="number"
                      step="0.1"
                      value={selectedObject.z.toFixed(1)}
                      onChange={(e) => updateObject(selectedObject.id, { z: Number.parseFloat(e.target.value) })}
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Scale</label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={selectedObject.scaleX.toFixed(1)}
                      onChange={(e) => updateObject(selectedObject.id, { scaleX: Number.parseFloat(e.target.value) })}
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs"
                    />
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={selectedObject.scaleY.toFixed(1)}
                      onChange={(e) => updateObject(selectedObject.id, { scaleY: Number.parseFloat(e.target.value) })}
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs"
                    />
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={selectedObject.scaleZ.toFixed(1)}
                      onChange={(e) => updateObject(selectedObject.id, { scaleZ: Number.parseFloat(e.target.value) })}
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Color</label>
                  <input
                    type="color"
                    value={selectedObject.color}
                    onChange={(e) => updateObject(selectedObject.id, { color: e.target.value })}
                    className="w-full h-8 bg-gray-700 border border-gray-600 rounded mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-400">Physics</label>
                  <input
                    type="checkbox"
                    checked={selectedObject.physics}
                    onChange={(e) => updateObject(selectedObject.id, { physics: e.target.checked })}
                    className="w-4 h-4"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Mass</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={selectedObject.mass.toFixed(1)}
                    onChange={(e) => updateObject(selectedObject.id, { mass: Number.parseFloat(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs mt-1"
                  />
                </div>

                <Button
                  onClick={() => {
                    updateObject(selectedObject.id, {
                      velocityX: (Math.random() - 0.5) * 0.1,
                      velocityY: Math.random() * 0.05,
                      velocityZ: (Math.random() - 0.5) * 0.1,
                    })
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Apply Force
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
