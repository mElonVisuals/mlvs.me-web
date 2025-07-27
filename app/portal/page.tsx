"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RotateCcw, Zap, Cpu, Wifi, ArrowRight, Car, Palette, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function MLVSPortalPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showDestinations, setShowDestinations] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const router = useRouter()

  // Check if user has already been through the portal
  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== "undefined") {
      const hasAccessedPortal = localStorage.getItem("mlvs_portal_accessed")
      const invitationCode = localStorage.getItem("mlvs_invitation_code")

      if (hasAccessedPortal === "true" && invitationCode) {
        // Skip loading animation and go straight to destinations
        setIsLoading(false)
        setProgress(100)
        setCurrentPhase(phases.length - 1)
        setShowDestinations(true)
      }
    }
  }, [])

  const phases = [
    { name: "Connecting to MLVS", color: "#8B5CF6", duration: 2000 },
    { name: "Loading Assets", color: "#06B6D4", duration: 3000 },
    { name: "Initializing Portal", color: "#10B981", duration: 2500 },
    { name: "Syncing Data", color: "#F59E0B", duration: 2000 },
    { name: "Portal Ready", color: "#EF4444", duration: 1000 },
  ]

  const destinations = [
    {
      id: "fivem",
      title: "FiveM Development",
      description: "Custom FiveM server resources and development tools",
      icon: Car,
      color: "from-green-500 to-emerald-500",
      route: "/fivem",
      features: ["Custom scripts", "Server resources", "Roleplay systems"],
    },
    {
      id: "portfolio",
      title: "Creative Portfolio",
      description: "Showcase of creative projects and digital art",
      icon: Palette,
      color: "from-orange-500 to-red-500",
      route: "/portfolio",
      features: ["Project gallery", "Interactive demos", "Case studies"],
    },
    {
      id: "docs",
      title: "Documentation",
      description: "Technical documentation and guides",
      icon: FileText,
      color: "from-yellow-500 to-orange-500",
      route: "/docs",
      features: ["API reference", "Tutorials", "Code examples"],
    },
  ]

  // Replace the canvas animation useEffect with this new holographic effect:

  useEffect(() => {
    // No canvas needed - using pure CSS animations
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, currentPhase, progress, isLoading])

  // Loading simulation with session saving
  useEffect(() => {
    if (!isLoading) return

    let currentProgress = 0
    let phaseIndex = 0
    let phaseStartTime = Date.now()

    const updateProgress = () => {
      const now = Date.now()
      const phaseElapsed = now - phaseStartTime
      const currentPhaseDuration = phases[phaseIndex]?.duration || 2000

      if (phaseElapsed >= currentPhaseDuration) {
        phaseIndex++
        phaseStartTime = now
        setCurrentPhase(phaseIndex)

        if (phaseIndex >= phases.length) {
          setProgress(100)
          setTimeout(() => {
            setIsLoading(false)
            setShowDestinations(true)
            // Save that user has accessed the portal - only in browser
            if (typeof window !== "undefined") {
              localStorage.setItem("mlvs_portal_accessed", "true")
            }
          }, 500)
          return
        }
      }

      const phaseProgress = Math.min(phaseElapsed / currentPhaseDuration, 1)
      const totalPhaseProgress = (phaseIndex + phaseProgress) / phases.length
      currentProgress = Math.floor(totalPhaseProgress * 100)
      setProgress(currentProgress)

      if (isLoading) {
        requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
  }, [isLoading])

  const resetAnimation = () => {
    setIsLoading(true)
    setProgress(0)
    setCurrentPhase(0)
    setShowDestinations(false)
    // Clear the session flag to show loading again - only in browser
    if (typeof window !== "undefined") {
      localStorage.removeItem("mlvs_portal_accessed")
    }
  }

  const navigateToDestination = (route: string) => {
    // Save that user has accessed the portal - only in browser
    if (typeof window !== "undefined") {
      localStorage.setItem("mlvs_portal_accessed", "true")
    }
    setTimeout(() => {
      router.push(route)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-purple-500/5 via-transparent to-blue-500/5 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
          <h1 className="text-xl font-light text-gray-100">MLVS Portal</h1>
        </div>
      </nav>

      {/* Main Content - Moved down significantly */}
      <div className="flex items-center justify-center min-h-screen pt-32 relative z-10">
        <div className="text-center max-w-6xl mx-auto px-6">
          {/* Large spacer to push content down */}
          <div className="h-16"></div>

          {/* MLVS Logo Holographic Projection */}
          <div className="relative mb-8">
            <div className="relative inline-block">
              {/* Holographic projection base */}
              <div className="relative w-96 h-96 flex items-center justify-center">
                {/* Scanning lines */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`scan-${i}`}
                      className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                      style={{
                        top: `${12.5 * i}%`,
                        animation: `scan ${3 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Holographic grid */}
                <div className="absolute inset-0">
                  <div
                    className="w-full h-full opacity-20"
                    style={{
                      backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
                      backgroundSize: "20px 20px",
                      animation: "pulse 4s ease-in-out infinite",
                    }}
                  />
                </div>

                {/* Orbital rings */}
                {Array.from({ length: 4 }).map((_, ring) => (
                  <div
                    key={`orbital-${ring}`}
                    className="absolute border border-cyan-400/20 rounded-full"
                    style={{
                      width: `${120 + ring * 40}px`,
                      height: `${120 + ring * 40}px`,
                      animation: `orbit ${10 + ring * 5}s linear infinite ${ring % 2 === 0 ? "" : "reverse"}`,
                    }}
                  >
                    {/* Orbital nodes */}
                    {Array.from({ length: 3 + ring }).map((_, node) => (
                      <div
                        key={`node-${ring}-${node}`}
                        className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
                        style={{
                          top: "-4px",
                          left: "50%",
                          transform: `translateX(-50%) rotate(${(360 / (3 + ring)) * node}deg) translateY(${60 + ring * 20}px)`,
                          animation: `pulse ${2 + node * 0.3}s ease-in-out infinite`,
                        }}
                      />
                    ))}
                  </div>
                ))}

                {/* Central logo platform */}
                <div className="relative z-10 flex items-center justify-center">
                  <div
                    className="relative w-32 h-32 flex items-center justify-center"
                    style={{
                      animation: "float 6s ease-in-out infinite",
                    }}
                  >
                    {/* Holographic glow */}
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-60"
                      style={{
                        background: `radial-gradient(circle, ${phases[currentPhase]?.color || "#06B6D4"}40 0%, transparent 70%)`,
                        animation: "pulse 3s ease-in-out infinite",
                      }}
                    />

                    {/* Logo container */}
                    <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                      <Image
                        src="/logo-new.png"
                        alt="MLVS Logo"
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                        style={{
                          filter: `drop-shadow(0 0 20px ${phases[currentPhase]?.color || "#06B6D4"}60)`,
                          animation: "logoGlow 4s ease-in-out infinite",
                        }}
                        priority
                      />
                    </div>

                    {/* Energy field */}
                    <div
                      className="absolute inset-0 border-2 rounded-full"
                      style={{
                        borderColor: phases[currentPhase]?.color || "#06B6D4",
                        opacity: 0.3,
                        animation: "energyField 2s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>

                {/* Data streams */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`stream-${i}`}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      animation: `dataStream ${8 + i * 2}s linear infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    <div
                      className="absolute w-1 h-16 bg-gradient-to-t from-cyan-400/40 to-transparent"
                      style={{
                        transform: `rotate(${i * 60}deg) translateY(-120px)`,
                      }}
                    />
                  </div>
                ))}

                {/* Progress indicator for loading */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-40 h-40 border-4 border-transparent rounded-full"
                      style={{
                        borderTopColor: "#FFFFFF",
                        transform: `rotate(${(progress / 100) * 360}deg)`,
                        transition: "transform 0.3s ease-out",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <style jsx>{`
  @keyframes scan {
    0%, 100% { opacity: 0; transform: translateX(-100%); }
    50% { opacity: 1; transform: translateX(100%); }
  }
  
  @keyframes orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes logoGlow {
    0%, 100% { filter: drop-shadow(0 0 20px ${phases[currentPhase]?.color || "#06B6D4"}60); }
    50% { filter: drop-shadow(0 0 30px ${phases[currentPhase]?.color || "#06B6D4"}80); }
  }
  
  @keyframes energyField {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.1); opacity: 0.6; }
  }
  
  @keyframes dataStream {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`}</style>

          {/* Loading Status or Destinations */}
          {!showDestinations ? (
            <div className="space-y-6 mb-8">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                {isLoading ? (
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {phases[currentPhase]?.name || "Loading..."}
                  </span>
                ) : (
                  <span className="text-green-400">Portal Ready!</span>
                )}
              </h2>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Phase Indicators */}
              <div className="flex justify-center space-x-4 flex-wrap">
                {phases.map((phase, index) => (
                  <div
                    key={phase.name}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-300 ${
                      index === currentPhase
                        ? "border-purple-500 bg-purple-500/10 text-purple-300"
                        : index < currentPhase
                          ? "border-green-500 bg-green-500/10 text-green-300"
                          : "border-gray-700 bg-gray-800/50 text-gray-500"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        index === currentPhase
                          ? "bg-purple-400 animate-pulse"
                          : index < currentPhase
                            ? "bg-green-400"
                            : "bg-gray-600"
                      }`}
                    />
                    <span className="text-xs font-medium">{phase.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Destination Selection */
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Welcome to MLVS
                  </span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Select your destination to explore different aspects of the MLVS platform. Each area offers unique
                  experiences and functionality.
                </p>
              </div>

              {/* Destination Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {destinations.map((destination, index) => (
                  <Card
                    key={destination.id}
                    className="group cursor-pointer border border-gray-800 hover:border-gray-600 bg-gray-900/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
                    onClick={() => navigateToDestination(destination.route)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${destination.color} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <destination.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors">
                            {destination.title}
                          </h3>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{destination.description}</p>

                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-300 uppercase tracking-wide">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {destination.features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions - Only Reset Portal button */}
              <div className="flex justify-center mt-8">
                <Button
                  onClick={resetAnimation}
                  variant="outline"
                  className="border-2 border-gray-700 hover:border-purple-500 text-gray-300 hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 bg-transparent hover:bg-purple-600/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Portal
                </Button>
              </div>
            </div>
          )}

          {/* System Stats - Only show during loading */}
          {!showDestinations && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                {
                  icon: Cpu,
                  label: "System Load",
                  value: `${Math.floor(Math.random() * 40 + 20)}%`,
                  color: "text-purple-400",
                },
                {
                  icon: Zap,
                  label: "Portal Energy",
                  value: `${Math.floor(Math.random() * 30 + 85)}%`,
                  color: "text-blue-400",
                },
                {
                  icon: Wifi,
                  label: "Connection",
                  value: isLoading ? "Establishing..." : "Connected",
                  color: "text-green-400",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-sm text-gray-300">{stat.label}</span>
                    </div>
                    <span className={`text-sm font-medium ${stat.color}`}>{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="fixed bottom-6 right-6 space-y-2">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-xs text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>MLVS Portal Active</span>
          </div>
        </div>
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-xs text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>Session: mlvs.me</span>
          </div>
        </div>
      </div>
    </div>
  )
}
