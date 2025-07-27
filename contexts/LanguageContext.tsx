"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "uz" | "ru" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  uz: {
    // Header
    home: "Bosh sahifa",
    menu: "Menyu",
    about: "Biz haqimizda",
    news: "Yangiliklar",
    contact: "Aloqa",
    bookTable: "Stol bron qilish",

    // Hero
    heroTitle: "Bizning",
    heroTitleHighlight: "Ajoyib",
    heroTitleEnd: "Xizmatlarimizdan bahramand bo'ling",
    heroDescription:
      "PlayStation, bar, karaoke, kalyan va restoran - hammasi bir joyda! Har bir tashrif unutilmas xotiralar yaratadi.",
    viewMenu: "Menyuni ko'rish",
    bookATable: "Stol bron qilish",

    // Services
    restaurant: "Restoran",
    restaurantDesc: "Mazali taomlar va professional xizmat",
    bar: "Bar",
    barDesc: "Premium ichimliklar va kokteylar",
    karaoke: "Karaoke",
    karaokeDesc: "Do'stlar bilan qo'shiq aytish va dam olish",
    playstation: "PlayStation",
    playstationDesc: "Eng so'nggi o'yinlar va zamonaviy konsol",
    hookah: "Kalyan",
    hookahDesc: "Yuqori sifatli kalyan va qulay muhit",

    // About
    aboutTitle: "Bizning",
    aboutTitleHighlight: "AGORA",
    aboutDescription:
      "10 yildan ortiq vaqt davomida AGORA ajoyib dam olish va ovqatlanish tajribasini taqdim etib kelmoqda. Biz an'anaviy oshpazlik texnikasini zamonaviy innovatsiyalar bilan birlashtirib, mehmonlarimiz uchun unutilmas lahzalar yaratamiz.",

    // Menu
    menuTitle: "Bizning",
    menuTitleHighlight: "Menyu",
    menuDescription:
      "Eng yaxshi ingredientlar bilan tayyorlangan maxsus taomlarimizni kashf eting. Har bir taom sevgi va professional mahorat bilan yaratilgan.",

    // Categories
    ichimliklar: "Ichimliklar",
    hookahMenu: "Kalyan",
    palov: "Palov",
    saladlar: "Saladlar",
    stacklar: "Steaklar",

    // News
    newsTitle: "So'nggi",
    newsTitleHighlight: "Yangiliklar",
    newsDescription: "Bizning eng so'nggi yangiliklar, aksiyalar va tadbirlar haqida bilib oling.",

    // Book Table
    bookTableTitle: "Stol",
    bookTableTitleHighlight: "Bron Qilish",
    bookTableDescription: "Bizda unutilmas kechani o'tkazish uchun stol bron qiling.",

    // Contact
    contactTitle: "Biz bilan",
    contactTitleHighlight: "Bog'laning",
    contactDescription: "Savollaringiz bo'lsa yoki bron qilmoqchi bo'lsangiz, biz bilan bog'laning.",

    // Common
    loading: "Yuklanmoqda...",
    error: "Xatolik yuz berdi",
    retry: "Qayta urinish",
    close: "Yopish",
    submit: "Yuborish",
    name: "Ism",
    phone: "Telefon",
    email: "Email",
    date: "Sana",
    time: "Vaqt",
    guests: "Mehmonlar",
    specialRequests: "Maxsus so'rovlar",
  },
  ru: {
    // Header
    home: "Главная",
    menu: "Меню",
    about: "О нас",
    news: "Новости",
    contact: "Контакты",
    bookTable: "Бронь столика",

    // Hero
    heroTitle: "Наслаждайтесь нашими",
    heroTitleHighlight: "Превосходными",
    heroTitleEnd: "Услугами",
    heroDescription:
      "PlayStation, бар, караоке, кальян и ресторан - всё в одном месте! Каждое посещение создаёт незабываемые воспоминания.",
    viewMenu: "Посмотреть меню",
    bookATable: "Забронировать столик",

    // Services
    restaurant: "Ресторан",
    restaurantDesc: "Вкусные блюда и профессиональное обслуживание",
    bar: "Бар",
    barDesc: "Премиальные напитки и коктейли",
    karaoke: "Караоке",
    karaokeDesc: "Пение с друзьями и отдых",
    playstation: "PlayStation",
    playstationDesc: "Новейшие игры и современная консоль",
    hookah: "Кальян",
    hookahDesc: "Качественный кальян и уютная атмосфера",

    // About
    aboutTitle: "О нашем",
    aboutTitleHighlight: "AGORA",
    aboutDescription:
      "Более 10 лет AGORA предоставляет исключительный опыт отдыха и питания. Мы сочетаем традиционные кулинарные техники с современными инновациями, создавая незабываемые моменты для наших гостей.",

    // Menu
    menuTitle: "Наше",
    menuTitleHighlight: "Меню",
    menuDescription:
      "Откройте для себя наши особые блюда, приготовленные из лучших ингредиентов. Каждое блюдо создано с любовью и профессиональным мастерством.",

    // Categories
    ichimliklar: "Напитки",
    hookahMenu: "Кальян",
    palov: "Плов",
    saladlar: "Салаты",
    stacklar: "Стейки",

    // News
    newsTitle: "Последние",
    newsTitleHighlight: "Новости",
    newsDescription: "Узнайте о наших последних новостях, акциях и мероприятиях.",

    // Book Table
    bookTableTitle: "Бронирование",
    bookTableTitleHighlight: "Столика",
    bookTableDescription: "Забронируйте столик для незабываемого вечера у нас.",

    // Contact
    contactTitle: "Свяжитесь",
    contactTitleHighlight: "с нами",
    contactDescription: "Если у вас есть вопросы или хотите забронировать, свяжитесь с нами.",

    // Common
    loading: "Загрузка...",
    error: "Произошла ошибка",
    retry: "Повторить",
    close: "Закрыть",
    submit: "Отправить",
    name: "Имя",
    phone: "Телефон",
    email: "Email",
    date: "Дата",
    time: "Время",
    guests: "Гости",
    specialRequests: "Особые пожелания",
  },
  en: {
    // Header
    home: "Home",
    menu: "Menu",
    about: "About",
    news: "News",
    contact: "Contact",
    bookTable: "Book Table",

    // Hero
    heroTitle: "Enjoy Our",
    heroTitleHighlight: "Amazing",
    heroTitleEnd: "Services",
    heroDescription:
      "PlayStation, bar, karaoke, hookah and restaurant - all in one place! Every visit creates unforgettable memories.",
    viewMenu: "View Menu",
    bookATable: "Book a Table",

    // Services
    restaurant: "Restaurant",
    restaurantDesc: "Delicious food and professional service",
    bar: "Bar",
    barDesc: "Premium drinks and cocktails",
    karaoke: "Karaoke",
    karaokeDesc: "Singing with friends and relaxation",
    playstation: "PlayStation",
    playstationDesc: "Latest games and modern console",
    hookah: "Hookah",
    hookahDesc: "High-quality hookah and cozy atmosphere",

    // About
    aboutTitle: "About Our",
    aboutTitleHighlight: "AGORA",
    aboutDescription:
      "For over 10 years, AGORA has been providing exceptional leisure and dining experiences. We combine traditional culinary techniques with modern innovation to create unforgettable moments for our guests.",

    // Menu
    menuTitle: "Our",
    menuTitleHighlight: "Menu",
    menuDescription:
      "Discover our special dishes made with the finest ingredients. Every dish is crafted with love and professional expertise.",

    // Categories
    ichimliklar: "Beverages",
    hookahMenu: "Hookah",
    palov: "Pilaf",
    saladlar: "Salads",
    stacklar: "Steaks",

    // News
    newsTitle: "Latest",
    newsTitleHighlight: "News",
    newsDescription: "Stay updated with our latest news, promotions and events.",

    // Book Table
    bookTableTitle: "Book",
    bookTableTitleHighlight: "Table",
    bookTableDescription: "Reserve a table for an unforgettable evening with us.",

    // Contact
    contactTitle: "Contact",
    contactTitleHighlight: "Us",
    contactDescription: "If you have questions or want to make a reservation, contact us.",

    // Common
    loading: "Loading...",
    error: "An error occurred",
    retry: "Retry",
    close: "Close",
    submit: "Submit",
    name: "Name",
    phone: "Phone",
    email: "Email",
    date: "Date",
    time: "Time",
    guests: "Guests",
    specialRequests: "Special Requests",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("uz")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["uz", "ru", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
