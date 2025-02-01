import Link from "next/link"
import { AnimatedBackground } from "@/components/AnimatedBackground"

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <div className="text-center z-10">
        <h1 className="text-5xl font-bold mb-8">Welcome to Tech Blog</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Explore the latest in coding, technology, and innovation. Share your projects, insights, and stay updated with
          the tech world.
        </p>
        <Link
          href="/blog"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

