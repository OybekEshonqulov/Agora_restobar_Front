"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export default function News() {
  const { t } = useLanguage()

  const newsItems = [
    {
      id: 1,
      title: "Yangi PlayStation 5 O'yinlari",
      excerpt: "Eng so'nggi PS5 o'yinlari bizning gaming zonada! FIFA 24, Call of Duty va boshqalar.",
      date: "2024-01-15",
      author: "Gaming Team",
      image: "/placeholder.svg?height=200&width=400&text=PlayStation+Games",
      category: "Gaming",
    },
    {
      id: 2,
      title: "Karaoke Kechalari - Har Juma",
      excerpt: "Har juma kuni maxsus karaoke kechalari. Do'stlar bilan qo'shiq aytish va dam olish.",
      date: "2024-01-10",
      author: "Entertainment Team",
      image: "/placeholder.svg?height=200&width=400&text=Karaoke+Night",
      category: "Karaoke",
    },
    {
      id: 3,
      title: "Yangi Kalyan Menyusi",
      excerpt: "20 ta yangi ta'm bilan kalyan menyumiz yangilandi. Premium sifat va ajoyib ta'm.",
      date: "2024-01-05",
      author: "Hookah Master",
      image: "/placeholder.svg?height=200&width=400&text=Hookah+Menu",
      category: "Hookah",
    },
    {
      id: 4,
      title: "VIP Xona Ochildi",
      excerpt: "Maxsus tadbirlar uchun yangi VIP xona. PlayStation, karaoke va bar xizmatlari.",
      date: "2024-01-01",
      author: "AGORA Team",
      image: "/placeholder.svg?height=200&width=400&text=VIP+Room",
      category: "VIP",
    },
    {
      id: 5,
      title: "Happy Hour - 30% Chegirma",
      excerpt: "Har kuni 15:00-18:00 oralig'ida barcha ichimliklar uchun 30% chegirma.",
      date: "2023-12-25",
      author: "Bar Manager",
      image: "/placeholder.svg?height=200&width=400&text=Happy+Hour",
      category: "Bar",
    },
    {
      id: 6,
      title: "Turnir: FIFA 24 Championship",
      excerpt: "Oylik FIFA 24 turniri. G'olib 1,000,000 so'm mukofot oladi!",
      date: "2023-12-20",
      author: "Gaming Team",
      image: "/placeholder.svg?height=200&width=400&text=FIFA+Tournament",
      category: "Tournament",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Gaming: "bg-blue-500",
      Karaoke: "bg-purple-500",
      Hookah: "bg-green-500",
      VIP: "bg-yellow-500",
      Bar: "bg-red-500",
      Tournament: "bg-pink-500",
    }
    return colors[category] || "bg-gray-500"
  }

  return (
    <section id="news" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t("newsTitle")} <span className="text-orange-400">{t("newsTitleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("newsDescription")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card
              key={item.id}
              className="bg-gray-800 border-gray-700 overflow-hidden hover:bg-gray-750 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span
                    className={`${getCategoryColor(item.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full text-orange-400 hover:text-white hover:bg-orange-500 transition-colors duration-300"
                >
                  Batafsil o'qish
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">Barcha yangiliklar</Button>
        </div>
      </div>
    </section>
  )
}
