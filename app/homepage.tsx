"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Code, Palette, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Homepage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Mouse tracking effect
  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (event && typeof event.clientX === "number" && typeof event.clientY === "number") {
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = (event.clientY / window.innerHeight) * 2 - 1
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  function handleLogout() {
    window.location.reload()
  }

  const skills = [
    {
      icon: Code,
      label: "Vibe Coding",
      desc: "JavaScript, React, Learning",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: Palette,
      label: "Graphics & Design",
      desc: "Visual Design, UI/UX",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      label: "Cinematics",
      desc: "YouTube, Video Editing",
      color: "from-purple-500 to-pink-500",
    },
  ]

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "Email", href: "#" },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${20 + i * 8}px`,
              height: `${20 + i * 8}px`,
              left: `${15 + i * 12}%`,
              top: `${20 + i * 10}%`,
              background: `radial-gradient(circle, rgba(147, 51, 234, ${0.1 - i * 0.01}) 0%, transparent 70%)`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}

        {/* Connecting lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-purple-400/5 to-transparent animate-pulse"
            style={{
              width: `${300 + i * 50}px`,
              height: "1px",
              left: `${10 + i * 15}%`,
              top: `${30 + i * 12}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${6 + i}s`,
              transform: `rotate(${i * 15}deg)`,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x * 5}% ${50 + mousePosition.y * 5}%, #8B5CF6 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transition: "background-image 0.5s ease-out",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
          <div className="flex space-x-8">
            <button className="text-sm font-medium text-gray-100 border-b-2 border-purple-400 pb-1">Home</button>
            <button
              onClick={() => router.push("/portal")}
              className="text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors"
            >
              Explore
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Moved down significantly */}
      <div className="min-h-screen bg-gray-950 pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Large spacer to push content down */}
          <div className="h-20"></div>

          {/* Logo Animation Section */}
          <div className="text-center mb-16">
            <div
              className={`mb-12 transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="relative inline-block group">
                {/* Hexagonal matrix background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-80">
                    {/* Hexagonal rings */}
                    {Array.from({ length: 3 }).map((_, ring) => (
                      <div
                        key={`hex-ring-${ring}`}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          animation: `spin ${20 + ring * 10}s linear infinite ${ring % 2 === 0 ? "" : "reverse"}`,
                        }}
                      >
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={`hex-${ring}-${i}`}
                            className="absolute w-2 h-2 rounded-full bg-purple-400/20 animate-pulse"
                            style={{
                              transform: `rotate(${i * 60}deg) translateY(-${50 + ring * 25}px)`,
                              animationDelay: `${i * 0.2 + ring * 0.5}s`,
                            }}
                          />
                        ))}
                      </div>
                    ))}

                    {/* Data streams */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={`stream-${i}`}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          animation: `spin ${15 + i * 5}s linear infinite`,
                        }}
                      >
                        <div
                          className="absolute w-1 h-16 bg-gradient-to-t from-blue-400/30 to-transparent"
                          style={{
                            transform: `rotate(${i * 90}deg) translateY(-70px)`,
                          }}
                        />
                      </div>
                    ))}

                    {/* Central logo container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="relative w-28 h-28 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                        style={{
                          transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
                        }}
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />

                        {/* Logo */}
                        <div className="relative z-10 w-20 h-20 flex items-center justify-center">
                          <Image
                            src="/logo-new.png"
                            alt="MLVS Logo"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain filter drop-shadow-lg"
                            onLoad={() => setLogoLoaded(true)}
                            priority
                          />
                        </div>

                        {/* Energy rings */}
                        <div
                          className="absolute inset-0 border-2 border-purple-400/30 rounded-full animate-ping"
                          style={{ animationDuration: "3s" }}
                        />
                        <div
                          className="absolute inset-2 border border-blue-400/20 rounded-full animate-ping"
                          style={{ animationDuration: "2s", animationDelay: "1s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading Section */}
          <div className="text-center mb-12">
            <h1
              className={`text-4xl md:text-6xl font-light mb-6 tracking-tight transform transition-all duration-1000 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              Vibe{" "}
              <span className="font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Coder
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl text-gray-400 font-light leading-relaxed transform transition-all duration-1000 delay-400 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              Creating digital experiences with
              <br />
              <span className="text-gray-200 font-medium">code</span>,{" "}
              <span className="text-gray-200 font-medium">graphics</span>, and{" "}
              <span className="text-gray-200 font-medium">cinematics</span>
            </p>
          </div>

          {/* About Me Section */}
          <div
            className={`max-w-4xl mx-auto mb-16 text-center transform transition-all duration-1000 delay-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="space-y-8">
              <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed px-4">
                <p className="max-w-3xl mx-auto">
                  I'm a passionate vibe coder with about a year of experience in development. I love experimenting with
                  code, creating graphics for fun, and producing cinematic content for YouTube. My journey is all about
                  learning, creating, and sharing the creative process.
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-12 mt-12">
                {skills.map((skill) => (
                  <div key={skill.label} className="text-center group cursor-pointer">
                    <div
                      className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${skill.color} bg-opacity-10 rounded-2xl flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300 border border-gray-800 group-hover:border-gray-700`}
                    >
                      <skill.icon className="w-10 h-10 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="font-medium mb-3 text-gray-200 text-lg">{skill.label}</h4>
                    <p className="text-sm text-gray-400">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transform transition-all duration-1000 delay-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Button
              onClick={() => router.push("/portal")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              Explore My Work
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-700 hover:border-purple-500 text-gray-300 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 bg-transparent hover:bg-purple-600/10"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div
            className={`flex justify-center space-x-8 pb-8 transform transition-all duration-1000 delay-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-14 h-14 bg-gray-800 hover:bg-purple-600 text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-purple-500"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
