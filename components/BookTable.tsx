"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Phone, Mail, User } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function BookTable() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const timeSlots = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ]

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        guests: "",
        specialRequests: "",
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <section id="book-table" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Buyurtma Qabul Qilindi!</h3>
              <p className="text-gray-300">
                Sizning stol bron qilish so'rovingiz muvaffaqiyatli yuborildi. Tez orada sizga aloqaga chiqamiz.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="book-table" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t("bookTableTitle")} <span className="text-orange-400">{t("bookTableTitleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("bookTableDescription")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Bron Qilish Formasi</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        {t("name")}
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Ismingizni kiriting"
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        {t("phone")}
                      </label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+998 90 123 45 67"
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      {t("email")}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="email@example.com"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        {t("date")}
                      </label>
                      <Input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="bg-gray-800 border-gray-600 text-white focus:border-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        {t("time")}
                      </label>
                      <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-orange-400">
                          <SelectValue placeholder="Vaqtni tanlang" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time} className="text-white hover:bg-gray-700">
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        {t("guests")}
                      </label>
                      <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-orange-400">
                          <SelectValue placeholder="Soni" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {guestOptions.map((count) => (
                            <SelectItem key={count} value={count} className="text-white hover:bg-gray-700">
                              {count} kishi
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t("specialRequests")}</label>
                    <Textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      placeholder="Allergiya, maxsus talab yoki boshqa eslatmalar..."
                      rows={4}
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-medium"
                  >
                    {isSubmitting ? "Yuborilmoqda..." : t("bookTable")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Restaurant Info */}
            <div className="space-y-8">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Ish Vaqti</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Dushanba - Payshanba:</span>
                      <span>10:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Juma - Shanba:</span>
                      <span>10:00 - 24:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yakshanba:</span>
                      <span>11:00 - 22:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Xizmatlar</h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <span>🍽️</span>
                      <span>Restaurant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🍸</span>
                      <span>Bar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🎤</span>
                      <span>Karaoke</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🎮</span>
                      <span>PlayStation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💨</span>
                      <span>Hookah</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👑</span>
                      <span>VIP Room</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Aloqa Ma'lumotlari</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-orange-400" />
                      <span>+998 90 123 45 67</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-orange-400" />
                      <span>info@agora-entertainment.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
