"use client"

export default function MenuItemCard({ item }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
      {/* Card Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
            {item.category}
          </span>
        </div>

        {/* Item Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{item.description}</p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-green-600">{formatPrice(item.price)}</div>

          {/* Optional: Add to cart button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  )
}
