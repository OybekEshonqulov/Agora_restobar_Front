"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, Wifi, WifiOff, ArrowLeft, ShoppingCart, Star } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import axios from "axios"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
  rating?: number
  ingredients?: string[]
}

type ViewState = "categories" | "products" | "details"

// Demo data for fallback
const demoMenuItems: MenuItem[] = [
  // Ichimliklar
  {
    id: 1,
    name: "Coca Cola",
    description: "Gazli ichimlik, sovuq holda xizmat qilinadi. Yangi va tetik his beradi.",
    price: 8000,
    category: "Ichimliklar",
    rating: 4.5,
    ingredients: ["Gazlangan suv", "Shakar", "Karamel rangi", "Fosfat kislotasi"],
  },
  {
    id: 2,
    name: "Fresh Orange Juice",
    description: "Yangi siqilgan apelsin sharbati, 100% tabiiy va vitaminlarga boy.",
    price: 12000,
    category: "Ichimliklar",
    rating: 4.8,
    ingredients: ["Yangi apelsin", "Muz", "Shakar (ixtiyoriy)"],
  },
  {
    id: 3,
    name: "Green Tea",
    description: "Yuqori sifatli yashil choy, antioksidantlarga boy va sog'liq uchun foydali.",
    price: 6000,
    category: "Ichimliklar",
    rating: 4.3,
    ingredients: ["Yashil choy barglari", "Issiq suv", "Limon (ixtiyoriy)"],
  },
  {
    id: 4,
    name: "Cappuccino",
    description: "Italyan uslubidagi kappuchino, yumshoq sut ko'pigi bilan.",
    price: 15000,
    category: "Ichimliklar",
    rating: 4.7,
    ingredients: ["Espresso", "Bug'langan sut", "Sut ko'pigi", "Dolchin"],
  },

  // Hookah
  {
    id: 5,
    name: "Apple Hookah",
    description: "An'anaviy olma ta'mli kalyan, yumshoq va mazali tutun bilan.",
    price: 35000,
    category: "Hookah",
    rating: 4.6,
    ingredients: ["Olma tutuni", "Tabiiy ko'mir", "Toza suv"],
  },
  {
    id: 6,
    name: "Mint Hookah",
    description: "Yalpiz ta'mli kalyan, tetik va sovuq his beradi.",
    price: 40000,
    category: "Hookah",
    rating: 4.4,
    ingredients: ["Yalpiz tutuni", "Tabiiy ko'mir", "Muzli suv"],
  },
  {
    id: 7,
    name: "Mixed Fruit Hookah",
    description: "Turli mevalar aralashmasi, boy va murakkab ta'm.",
    price: 45000,
    category: "Hookah",
    rating: 4.8,
    ingredients: ["Meva tutunlari aralashmasi", "Premium ko'mir", "Aromatik suv"],
  },

  // Palov
  {
    id: 8,
    name: "Toshkent Palov",
    description: "An'anaviy o'zbek palovi, qo'y go'shti va sabzi bilan, maxsus ziravorlar qo'shilgan.",
    price: 30000,
    category: "Palov",
    rating: 4.9,
    ingredients: ["Guruch", "Qo'y go'shti", "Sabzi", "Piyoz", "Ziravorlar"],
  },
  {
    id: 9,
    name: "Samarqand Palov",
    description: "Samarqand uslubidagi palov, noyob retsept bo'yicha tayyorlangan.",
    price: 35000,
    category: "Palov",
    rating: 4.7,
    ingredients: ["Maxsus guruch", "Mol go'shti", "Sabzi", "Noxat", "Ziravorlar"],
  },
  {
    id: 10,
    name: "Tovuq Palov",
    description: "Tovuq go'shti bilan tayyorlangan palov, yengil va mazali.",
    price: 28000,
    category: "Palov",
    rating: 4.5,
    ingredients: ["Guruch", "Tovuq go'shti", "Sabzi", "Piyoz", "Ziravorlar"],
  },

  // Saladlar
  {
    id: 11,
    name: "Caesar Salad",
    description: "Yangi salat barglari, kruton, parmesan pishloqi va maxsus sous bilan.",
    price: 25000,
    category: "Saladlar",
    rating: 4.6,
    ingredients: ["Salat barglari", "Kruton", "Parmesan", "Caesar sousi", "Anchous"],
  },
  {
    id: 12,
    name: "Greek Salad",
    description: "Pomidor, bodring, zaytun va feta pishloqi bilan tayyorlangan salat.",
    price: 22000,
    category: "Saladlar",
    rating: 4.4,
    ingredients: ["Pomidor", "Bodring", "Zaytun", "Feta pishloqi", "Zaytun moyi"],
  },
  {
    id: 13,
    name: "Avocado Salad",
    description: "Avokado, pomidor va yangi ko'katlar bilan sog'lom salat.",
    price: 24000,
    category: "Saladlar",
    rating: 4.7,
    ingredients: ["Avokado", "Pomidor", "Ko'katlar", "Limon", "Zaytun moyi"],
  },

  // Stacklar
  {
    id: 14,
    name: "Beef Steak",
    description: "Premium mol go'shti steyk, sabzavotlar va maxsus sous bilan xizmat qilinadi.",
    price: 85000,
    category: "Stacklar",
    rating: 4.9,
    ingredients: ["Premium mol go'shti", "Sabzavotlar", "Maxsus sous", "Kartoshka"],
  },
  {
    id: 15,
    name: "Chicken Steak",
    description: "Tovuq go'shti steyk, o'tlar va ziravorlar bilan marinlangan.",
    price: 45000,
    category: "Stacklar",
    rating: 4.5,
    ingredients: ["Tovuq go'shti", "O'tlar", "Ziravorlar", "Sabzavotlar"],
  },
  {
    id: 16,
    name: "Salmon Steak",
    description: "Yangi losos baliq steyk, limon va ko'katlar bilan.",
    price: 65000,
    category: "Stacklar",
    rating: 4.8,
    ingredients: ["Losos baliq", "Limon", "Ko'katlar", "Zaytun moyi"],
  },
]

export default function Menu() {
  const { t } = useLanguage()
  const [viewState, setViewState] = useState<ViewState>("categories")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingDemoData, setIsUsingDemoData] = useState(false)

  const categories = [
    {
      id: "Ichimliklar",
      name: t("ichimliklar"),
      icon: "🥤",
      image: "/placeholder.svg?height=300&width=400&text=Beverages+Collection",
      description: "Sovuq va issiq ichimliklar, fresh sharbatlar va kofe",
      itemCount: 0,
    },
    {
      id: "Hookah",
      name: t("hookahMenu"),
      icon: "💨",
      image: "/placeholder.svg?height=300&width=400&text=Premium+Hookah+Lounge",
      description: "Premium kalyan va turli xil ta'mlar",
      itemCount: 0,
    },
    {
      id: "Palov",
      name: t("palov"),
      icon: "🍚",
      image: "/placeholder.svg?height=300&width=400&text=Traditional+Uzbek+Pilaf",
      description: "An'anaviy o'zbek palovi turli uslublarda",
      itemCount: 0,
    },
    {
      id: "Saladlar",
      name: t("saladlar"),
      icon: "🥗",
      image: "/placeholder.svg?height=300&width=400&text=Fresh+Healthy+Salads",
      description: "Yangi va sog'lom salatlar to'plami",
      itemCount: 0,
    },
    {
      id: "Stacklar",
      name: t("stacklar"),
      icon: "🥩",
      image: "/placeholder.svg?height=300&width=400&text=Premium+Grilled+Steaks",
      description: "Premium go'sht va baliq steyklari",
      itemCount: 0,
    },
  ]

  // Load demo data immediately
  const loadDemoData = () => {
    setMenuItems(demoMenuItems)
    setIsUsingDemoData(true)
    setError(null)
    setLoading(false)
  }

  // Fetch menu data from API
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true)
        setError(null)

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await axios.get("https://localhost:7160/admin/menu", {
          signal: controller.signal,
          timeout: 5000,
        })

        clearTimeout(timeoutId)

        if (response.data && Array.isArray(response.data)) {
          const items = response.data
          setMenuItems(items)
          setIsUsingDemoData(false)
        } else {
          throw new Error("Invalid data format received from API")
        }
      } catch (err) {
        console.warn("API fetch failed, using demo data:", err)
        loadDemoData()
        setError("API bilan bog'lanib bo'lmadi. Demo ma'lumotlar ko'rsatilmoqda.")
      }
    }

    fetchMenuData()
  }, [])

  // Update category item counts
  const getCategoriesWithCounts = () => {
    return categories.map((category) => ({
      ...category,
      itemCount: menuItems.filter((item) => item.category === category.id).length,
    }))
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const filtered = menuItems.filter((item) => item.category === categoryId)
    setFilteredItems(filtered)
    setViewState("products")
  }

  const handleProductSelect = (item: MenuItem) => {
    setSelectedItem(item)
    setViewState("details")
  }

  const handleBackToCategories = () => {
    setViewState("categories")
    setSelectedCategory("")
  }

  const handleBackToProducts = () => {
    setViewState("products")
    setSelectedItem(null)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
      />
    ))
  }

  if (loading) {
    return (
      <section id="menu" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-orange-400 mx-auto mb-4" />
              <p className="text-gray-300">{t("loading")}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="menu" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t("menuTitle")} <span className="text-orange-400">{t("menuTitleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("menuDescription")}</p>

          {/* Data Source Indicator */}
          <div className="mt-6 flex justify-center">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                isUsingDemoData
                  ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                  : "bg-green-500/10 border border-green-500/20 text-green-400"
              }`}
            >
              {isUsingDemoData ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
              <span>{isUsingDemoData ? "Demo ma'lumotlar" : "Jonli ma'lumotlar"}</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-yellow-400 text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories View */}
        {viewState === "categories" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {getCategoriesWithCounts().map((category) => (
              <Card
                key={category.id}
                className="bg-gray-900 border-gray-700 overflow-hidden hover:bg-gray-800 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-orange-500/10 hover:scale-105"
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.itemCount} ta</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{category.description}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm">{category.itemCount} mahsulot</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Ko'rish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Products View */}
        {viewState === "products" && (
          <div>
            {/* Back Button */}
            <div className="mb-8">
              <Button
                onClick={handleBackToCategories}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kategoriyalarga qaytish
              </Button>
            </div>

            {/* Category Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                {categories.find((cat) => cat.id === selectedCategory)?.name}
              </h3>
              <p className="text-gray-300">{filteredItems.length} ta mahsulot topildi</p>
            </div>

            {/* Products Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="bg-gray-900 border-gray-700 overflow-hidden hover:bg-gray-800 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-orange-500/10"
                    onClick={() => handleProductSelect(item)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          item.image || `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(item.name)}`
                        }
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{item.rating || 4.5}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                          {item.name}
                        </h4>
                        <span className="text-xl font-bold text-orange-400">{formatPrice(item.price)}</span>
                      </div>
                      <p className="text-gray-400 leading-relaxed line-clamp-2 mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">{renderStars(item.rating || 4.5)}</div>
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleProductSelect(item)
                          }}
                        >
                          Tafsilot
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Hech qanday mahsulot topilmadi</h3>
                <p className="text-gray-400">Bu kategoriyada hozircha mahsulotlar mavjud emas.</p>
              </div>
            )}
          </div>
        )}

        {/* Product Details View */}
        {viewState === "details" && selectedItem && (
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Button
                onClick={handleBackToProducts}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Mahsulotlarga qaytish
              </Button>
            </div>

            <Card className="bg-gray-900 border-gray-700 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative h-96 md:h-full">
                  <img
                    src={
                      selectedItem.image ||
                      `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(selectedItem.name) || "/placeholder.svg"}`
                    }
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-full flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{selectedItem.rating || 4.5}</span>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Category Badge */}
                    <div>
                      <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {selectedItem.category}
                      </span>
                    </div>

                    {/* Title and Price */}
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{selectedItem.name}</h1>
                      <div className="text-4xl font-bold text-orange-400">{formatPrice(selectedItem.price)}</div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">{renderStars(selectedItem.rating || 4.5)}</div>
                      <span className="text-gray-400">({selectedItem.rating || 4.5} yulduz)</span>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Tavsif</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedItem.description}</p>
                    </div>

                    {/* Ingredients */}
                    {selectedItem.ingredients && selectedItem.ingredients.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Tarkibi</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.ingredients.map((ingredient, index) => (
                            <span
                              key={index}
                              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-medium">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Buyurtma berish
                      </Button>
                      <Button
                        variant="outline"
                        className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent px-6"
                      >
                        ♡ Sevimli
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
