import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Menu from "@/components/Menu"
import News from "@/components/News"
import Contact from "@/components/Contact"
import BookTable from "@/components/BookTable"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Menu />
      <News />
      <BookTable />
      <Contact />
      <Footer />
    </main>
  )
}
