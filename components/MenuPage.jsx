"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import CategorySelector from "./CategorySelector"
import MenuItemCard from "./MenuItemCard"
import { Loader2, AlertCircle } from "lucide-react"

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch menu data from API
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://localhost:7160/admin/menu")
        const items = response.data

        setMenuItems(items)
        setFilteredItems(items)

        // Extract unique categories
        const uniqueCategories = [...new Set(items.map((item) => item.category))]
        setCategories(["all", ...uniqueCategories])

        setError(null)
      } catch (err) {
        console.error("Error fetching menu data:", err)
        setError("Failed to load menu items. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchMenuData()
  }, [])

  // Filter items by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(menuItems)
    } else {
      const filtered = menuItems.filter((item) => item.category === activeCategory)
      setFilteredItems(filtered)
    }
  }, [activeCategory, menuItems])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Menu</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our delicious selection of dishes and beverages, carefully crafted for your enjoyment
            </p>
          </div>
        </div>
      </div>

      {/* Category Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategorySelector
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">
              {activeCategory === "all"
                ? "No menu items available at the moment."
                : `No items found in "${activeCategory}" category.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
