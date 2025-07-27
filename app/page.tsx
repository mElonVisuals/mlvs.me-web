"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ExternalLink, MessageCircle, Users, Shield, CheckCircle } from "lucide-react"
import Homepage from "./homepage"
import Image from "next/image"

export default function Component() {
  const [invitationCode, setInvitationCode] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [requestForm, setRequestForm] = useState({
    email: "",
    discordUsername: "",
    reason: "",
    experience: "",
  })
  const [requestStatus, setRequestStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (invitationCode.toUpperCase() === "TEST") {
      // Save the invitation code and authentication status
      localStorage.setItem("mlvs_invitation_code", invitationCode.toUpperCase())
      localStorage.setItem("mlvs_authenticated", "true")
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Invalid invitation code")
    }
  }

  const handleRequestSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setRequestStatus("submitting")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setRequestStatus("success")

      // Reset form after success
      setTimeout(() => {
        setRequestForm({ email: "", discordUsername: "", reason: "", experience: "" })
        setRequestStatus("idle")
        setIsRequestModalOpen(false)
      }, 3000)
    } catch (error) {
      setRequestStatus("error")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setRequestForm((prev) => ({ ...prev, [field]: value }))
  }

  const discordInviteUrl = "https://discord.gg/mlvs" // Replace with your actual Discord invite

  if (isAuthenticated) {
    return <Homepage />
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <Image
              src="/logo-new.png"
              alt="MLVS Logo"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          </div>
          <div className="w-8 sm:w-12 h-px bg-gray-600 mx-auto mt-3 sm:mt-4"></div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-light text-gray-300">Private Access</h2>
            <p className="text-sm text-gray-400 leading-relaxed px-2">
              This platform is available by invitation only.
              <br />
              Please enter your invitation code to continue.
            </p>
          </div>

          {/* Access Form */}
          <Card className="border-0 shadow-none bg-gray-800/50 backdrop-blur-sm mx-2 sm:mx-0">
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Invitation Code"
                    value={invitationCode}
                    onChange={(event) => setInvitationCode(event.target.value)}
                    className="border-0 bg-gray-700/50 text-white placeholder:text-gray-500 shadow-sm text-center font-mono text-sm tracking-wider focus:bg-gray-700"
                  />
                  {error && <p className="text-red-400 text-xs font-light text-center">{error}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-light tracking-wide py-2.5"
                >
                  Enter
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Discord Integration */}
          <Card className="border-0 shadow-none bg-gray-800/30 backdrop-blur-sm mx-2 sm:mx-0">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-sm font-medium text-gray-300">Join Our Community</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Connect with our community on Discord to stay updated and gain access to exclusive content.
                </p>
                <Button
                  onClick={() => window.open(discordInviteUrl, "_blank")}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-light tracking-wide py-2.5 transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Discord Server
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Access Request */}
          <div className="pt-6 sm:pt-8 text-center px-2">
            <p className="text-xs text-gray-500 font-light">
              Don't have an invitation?{" "}
              <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
                <DialogTrigger asChild>
                  <button className="underline underline-offset-2 hover:text-gray-400 transition-colors">
                    Request Access
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <span>Request Platform Access</span>
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Fill out this form to request access to the MLVS platform. We'll review your application and get
                      back to you.
                    </DialogDescription>
                  </DialogHeader>

                  {requestStatus === "success" ? (
                    <div className="text-center py-6 space-y-4">
                      <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                      <div>
                        <h3 className="text-lg font-medium text-white">Request Submitted!</h3>
                        <p className="text-sm text-gray-400 mt-2">
                          We've received your access request. You'll hear back from us within 24-48 hours.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Make sure to join our Discord server for updates!</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleRequestSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={requestForm.email}
                          onChange={(event) => handleInputChange("email", event.target.value)}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="discord" className="text-gray-300">
                          Discord Username
                        </Label>
                        <Input
                          id="discord"
                          type="text"
                          placeholder="username#1234"
                          value={requestForm.discordUsername}
                          onChange={(event) => handleInputChange("discordUsername", event.target.value)}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason" className="text-gray-300">
                          Why do you want access?
                        </Label>
                        <Textarea
                          id="reason"
                          placeholder="Tell us why you're interested in joining..."
                          value={requestForm.reason}
                          onChange={(event) => handleInputChange("reason", event.target.value)}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 min-h-[80px]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-gray-300">
                          Relevant Experience (Optional)
                        </Label>
                        <Textarea
                          id="experience"
                          placeholder="Any relevant background or experience..."
                          value={requestForm.experience}
                          onChange={(event) => handleInputChange("experience", event.target.value)}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 min-h-[60px]"
                        />
                      </div>

                      <div className="bg-gray-700/30 rounded-lg p-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-indigo-400" />
                          <span className="text-sm font-medium text-gray-300">Next Steps</span>
                        </div>
                        <ul className="text-xs text-gray-400 space-y-1 ml-6">
                          <li>• Join our Discord server for community access</li>
                          <li>• We'll review your application within 48 hours</li>
                          <li>• Approved users receive invitation codes via email</li>
                        </ul>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          type="button"
                          onClick={() => window.open(discordInviteUrl, "_blank")}
                          variant="outline"
                          className="flex-1 border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Join Discord
                        </Button>
                        <Button
                          type="submit"
                          disabled={requestStatus === "submitting"}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {requestStatus === "submitting" ? "Submitting..." : "Submit Request"}
                        </Button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </p>
            <p className="text-xs text-gray-600 font-light mt-2">Hint: Try "TEST"</p>
          </div>
        </div>
      </div>
    </div>
  )
}
