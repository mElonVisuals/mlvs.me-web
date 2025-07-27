"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Activity, Cpu, HardDrive, Wifi, Users, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 67,
    disk: 23,
    network: 89,
    users: 1247,
    uptime: "99.9%",
  })

  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpu: Math.floor(Math.random() * 40 + 30),
        memory: Math.floor(Math.random() * 30 + 50),
        network: Math.floor(Math.random() * 20 + 80),
        users: Math.floor(Math.random() * 100 + 1200),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

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
            <h1 className="text-3xl font-light">Control Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">System Online</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Cpu, label: "CPU Usage", value: `${metrics.cpu}%`, color: "text-blue-400" },
            { icon: HardDrive, label: "Memory", value: `${metrics.memory}%`, color: "text-purple-400" },
            { icon: Wifi, label: "Network", value: `${metrics.network}%`, color: "text-green-400" },
            { icon: Users, label: "Active Users", value: metrics.users.toLocaleString(), color: "text-orange-400" },
          ].map((metric, index) => (
            <Card key={metric.label} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{metric.label}</p>
                    <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  </div>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <span>System Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Performance Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span>System Logs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 h-64 overflow-y-auto">
                {[
                  "System startup completed successfully",
                  "User authentication verified",
                  "Database connection established",
                  "Cache optimization in progress",
                  "Security scan completed - no threats detected",
                ].map((log, index) => (
                  <div key={index} className="text-sm text-gray-400 p-2 bg-gray-800/30 rounded">
                    <span className="text-green-400">[OK]</span> {log}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
