"use client"

export default function CategorySelector({ categories, activeCategory, onCategoryChange }) {
  const getCategoryDisplayName = (category) => {
    if (category === "all") return "All Items"
    return category
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-6 py-3 rounded-full font-medium transition-all duration-200 text-sm md:text-base
            ${
              activeCategory === category
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          `}
        >
          {getCategoryDisplayName(category)}
        </button>
      ))}
    </div>
  )
}
