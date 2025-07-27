"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Hero() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=1080&width=1920&text=Restaurant+Fine+Dining",
      title: t("restaurant"),
      description: t("restaurantDesc"),
      service: "restaurant",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920&text=Bar+Premium+Drinks",
      title: t("bar"),
      description: t("barDesc"),
      service: "bar",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920&text=Karaoke+Fun+Night",
      title: t("karaoke"),
      description: t("karaokeDesc"),
      service: "karaoke",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920&text=PlayStation+Gaming",
      title: t("playstation"),
      description: t("playstationDesc"),
      service: "playstation",
    },
    {
      image: "/placeholder.svg?height=1080&width=1920&text=Hookah+Lounge",
      title: t("hookah"),
      description: t("hookahDesc"),
      service: "hookah",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleViewMenu = () => {
    const element = document.querySelector("#menu")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleBookTable = () => {
    const element = document.querySelector("#book-table")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30 inline-block mb-4">
            <span className="text-orange-400 font-medium">{slides[currentSlide].title}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {t("heroTitle")} <span className="text-orange-400">{t("heroTitleHighlight")}</span>
          <br />
          {t("heroTitleEnd")}
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          {t("heroDescription")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            onClick={handleViewMenu}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-medium rounded-md transition-all duration-300 hover:scale-105"
          >
            {t("viewMenu")}
          </Button>
          <Button
            onClick={handleBookTable}
            size="lg"
            variant="outline"
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-medium rounded-md bg-transparent transition-all duration-300 hover:scale-105"
          >
            {t("bookATable")}
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                index === currentSlide ? "bg-orange-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <div className="text-2xl mb-2">
                {slide.service === "restaurant" && "🍽️"}
                {slide.service === "bar" && "🍸"}
                {slide.service === "karaoke" && "🎤"}
                {slide.service === "playstation" && "🎮"}
                {slide.service === "hookah" && "💨"}
              </div>
              <div className="text-sm font-medium">{slide.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-orange-400" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
