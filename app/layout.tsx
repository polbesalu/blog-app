import { Inter, Fira_Code } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"
import { Providers } from "./Providers"
import type React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" })

export const metadata = {
  title: "Tech Blog",
  description: "A blog about coding, technology, and more",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="bg-gray-900 text-white font-fira-code min-h-screen flex">
        <Providers>
          <Sidebar />
          <main className="flex-grow p-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}

