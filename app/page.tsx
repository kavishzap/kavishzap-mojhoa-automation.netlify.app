import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { Services } from "@/components/services"
import { Clients } from "@/components/clients"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Portfolio />
      <Services />
      <Clients />
      <Contact />
    </main>
  )
}
