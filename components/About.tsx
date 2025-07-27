"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, Award, Clock, Heart, Gamepad2, Mic } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function About() {
  const { t } = useLanguage()

  const features = [
    {
      icon: ChefHat,
      title: t("restaurant"),
      description: t("restaurantDesc"),
    },
    {
      icon: Award,
      title: t("bar"),
      description: t("barDesc"),
    },
    {
      icon: Mic,
      title: t("karaoke"),
      description: t("karaokeDesc"),
    },
    {
      icon: Gamepad2,
      title: t("playstation"),
      description: t("playstationDesc"),
    },
    {
      icon: Heart,
      title: t("hookah"),
      description: t("hookahDesc"),
    },
    {
      icon: Clock,
      title: "VIP Service",
      description: "Maxsus xizmat va individual yondashuv",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t("aboutTitle")} <span className="text-orange-400">{t("aboutTitleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("aboutDescription")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
