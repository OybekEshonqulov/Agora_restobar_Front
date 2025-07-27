"use client"

import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { name: t("home"), href: "#home" },
    { name: t("menu"), href: "#menu" },
    { name: t("about"), href: "#about" },
    { name: t("news"), href: "#news" },
    { name: t("contact"), href: "#contact" },
  ]

  const languages = [
    { code: "uz", name: "O'zbek", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleBookTable = () => {
    const element = document.querySelector("#book-table")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400 tracking-wider">AGORA</div>
            <div className="text-xs text-gray-300 tracking-widest uppercase">Entertainment</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-orange-400 transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-orange-400">
                  <Globe className="w-4 h-4 mr-2" />
                  {languages.find((lang) => lang.code === language)?.flag}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as "uz" | "ru" | "en")}
                    className="text-white hover:bg-gray-800 cursor-pointer"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Book Table Button */}
            <Button
              onClick={handleBookTable}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
            >
              {t("bookTable")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-700">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 text-white hover:text-orange-400 transition-colors"
              >
                {item.name}
              </button>
            ))}

            {/* Mobile Language Selector */}
            <div className="py-3 border-t border-gray-700 mt-3">
              <div className="text-gray-400 text-sm mb-2">Language:</div>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as "uz" | "ru" | "en")}
                    className={`px-3 py-1 rounded text-sm ${
                      language === lang.code
                        ? "bg-orange-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleBookTable} className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
              {t("bookTable")}
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
