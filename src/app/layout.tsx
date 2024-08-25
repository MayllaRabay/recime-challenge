import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trending Hamburger Recipes - Gourmet Burgers for Every Skill Level",
  description:
    "Explore our curated collection of 30 trending hamburger recipes, ranging from easy to hard. Perfect for burger enthusiasts looking to try new and exciting flavors, whether you're a beginner or an expert chef!",
  keywords:
    "hamburger recipes, gourmet burgers, easy recipes, medium recipes, hard recipes, trending burgers"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
