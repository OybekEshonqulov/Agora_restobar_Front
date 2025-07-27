"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t("contactTitle")} <span className="text-orange-400">{t("contactTitleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("contactDescription")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">Get in Touch</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Address</h4>
                  <p className="text-gray-400">
                    123 Entertainment Street
                    <br />
                    Tashkent, Uzbekistan 100000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{t("phone")}</h4>
                  <p className="text-gray-400">+998 90 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{t("email")}</h4>
                  <p className="text-gray-400">info@agora-entertainment.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Hours</h4>
                  <p className="text-gray-400">
                    Monday - Thursday: 10:00 AM - 11:00 PM
                    <br />
                    Friday - Saturday: 10:00 AM - 12:00 AM
                    <br />
                    Sunday: 11:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <Input
                      placeholder="Your first name"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <Input
                      placeholder="Your last name"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("email")}</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("phone")}</label>
                  <Input
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <Textarea
                    placeholder="Your message..."
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
                  />
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-medium">
                  {t("submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
