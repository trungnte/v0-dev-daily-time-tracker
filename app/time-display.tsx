"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

type Weather = "sunny" | "cloudy" | "rainy" | "snowy" | "stormy"

const weatherBackgrounds: Record<Weather, { light: string; dark: string }> = {
  sunny: {
    light: "/placeholder.svg?height=400&width=600&text=Sunny+Light+Background",
    dark: "/placeholder.svg?height=400&width=600&text=Sunny+Dark+Background",
  },
  cloudy: {
    light: "/placeholder.svg?height=400&width=600&text=Cloudy+Light+Background",
    dark: "/placeholder.svg?height=400&width=600&text=Cloudy+Dark+Background",
  },
  rainy: {
    light: "/placeholder.svg?height=400&width=600&text=Rainy+Light+Background",
    dark: "/placeholder.svg?height=400&width=600&text=Rainy+Dark+Background",
  },
  snowy: {
    light: "/placeholder.svg?height=400&width=600&text=Snowy+Light+Background",
    dark: "/placeholder.svg?height=400&width=600&text=Snowy+Dark+Background",
  },
  stormy: {
    light: "/placeholder.svg?height=400&width=600&text=Stormy+Light+Background",
    dark: "/placeholder.svg?height=400&width=600&text=Stormy+Dark+Background",
  },
}

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [passedSeconds, setPassedSeconds] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [remainingPercentage, setRemainingPercentage] = useState(100)
  const [isDaytime, setIsDaytime] = useState(true)
  const [weather, setWeather] = useState<Weather>("sunny")
  const [temperature, setTemperature] = useState(20)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      const secondsPassed = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
      setPassedSeconds(secondsPassed)

      const secondsRemaining = 86400 - secondsPassed
      setRemainingSeconds(secondsRemaining)

      const percentageRemaining = (secondsRemaining / 86400) * 100
      setRemainingPercentage(percentageRemaining)

      setIsDaytime(now.getHours() >= 6 && now.getHours() < 18)

      // Simulate changing weather every hour
      if (now.getMinutes() === 0 && now.getSeconds() === 0) {
        updateWeather()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const updateWeather = () => {
    const weathers: Weather[] = ["sunny", "cloudy", "rainy", "snowy", "stormy"]
    const newWeather = weathers[Math.floor(Math.random() * weathers.length)]
    setWeather(newWeather)
    setTemperature(Math.floor(Math.random() * 30) + 10) // Random temperature between 10 and 40
  }

  const getWeatherIcon = () => {
    switch (weather) {
      case "sunny":
        return isDaytime ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-200" />
      case "cloudy":
        return <Cloud className="w-6 h-6 text-gray-400" />
      case "rainy":
        return <CloudRain className="w-6 h-6 text-blue-400" />
      case "snowy":
        return <CloudSnow className="w-6 h-6 text-blue-200" />
      case "stormy":
        return <CloudLightning className="w-6 h-6 text-yellow-500" />
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour12: false })
  }

  const formatSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${weatherBackgrounds[weather][theme === "dark" ? "dark" : "light"]})` }}
      />
      <div className="relative bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Daily Time Tracker</CardTitle>
          <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/*
          <--! Weather -->
          */}

          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Weather</h2>
            <div className="flex items-center justify-center space-x-2">
              {getWeatherIcon()}
              <span className="text-2xl font-bold dark:text-gray-200">{temperature}°C</span>
              <span className="text-lg capitalize dark:text-gray-300">{weather}</span>
            </div>
          </div>


          {/*
          <--! Time -->
          */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Current Time</h2>
              <p className="text-3xl font-mono font-bold bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                {formatSeconds(passedSeconds)}
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Remaining Time</h2>
              <p className="text-3xl font-mono font-bold bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 text-transparent bg-clip-text">
                {formatSeconds(remainingSeconds)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Seconds Passed</h2>
              <p className="text-3xl font-mono font-bold bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text">
                {passedSeconds.toLocaleString()}
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Seconds Remaining</h2>
              <p className="text-3xl font-mono font-bold bg-gradient-to-r from-orange-400 to-yellow-300 dark:from-orange-300 dark:to-yellow-200 text-transparent bg-clip-text">
                {remainingSeconds.toLocaleString()}
              </p>
            </div>
          </div>

          

          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-center dark:text-gray-200">Day Progress</h2>
            <div className="relative pt-1">
              <div className="overflow-hidden h-8 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                <div
                  style={{ width: `${100 - remainingPercentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 relative"
                >
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    {getWeatherIcon()}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {(100 - remainingPercentage).toFixed(2)}% Passed
              </span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                {remainingPercentage.toFixed(2)}% Remaining
              </span>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground dark:text-gray-400">
            <h3 className="font-semibold">Current Time</h3>
            <p className="font-mono">{formatTime(currentTime)}</p>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

