export default function Gallery() {
  const images = [
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Restaurant Interior",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Gourmet Dish",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Bar Area",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Kitchen",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Wine Cellar",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Terrace",
    },
  ]

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our <span className="text-amber-600">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a visual journey through our restaurant and discover the ambiance that makes every visit special
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
