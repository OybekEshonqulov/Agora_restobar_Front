import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-orange-400 tracking-wider">AGORA</div>
              <div className="text-xs text-gray-400 tracking-widest uppercase">Entertainment</div>
            </div>
            <p className="text-gray-400 mb-4 text-center md:text-left">
              Your ultimate entertainment destination with restaurant, bar, karaoke, PlayStation gaming and hookah
              lounge all in one place.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Our Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <span>🍽️</span>
                <span>Fine Dining Restaurant</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>🍸</span>
                <span>Premium Bar & Cocktails</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>🎤</span>
                <span>Karaoke Rooms</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>🎮</span>
                <span>PlayStation Gaming Zone</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>💨</span>
                <span>Hookah Lounge</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-orange-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#menu" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#news" className="text-gray-400 hover:text-orange-400 transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>123 Entertainment Street</p>
              <p>Tashkent, Uzbekistan</p>
              <p>+998 90 123 45 67</p>
              <p>info@agora-entertainment.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AGORA Entertainment. All rights reserved. | Your ultimate entertainment destination</p>
        </div>
      </div>
    </footer>
  )
}
