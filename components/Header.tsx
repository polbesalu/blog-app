"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react"

export const Header = () => {
  const [mounted, setMounted] = useState(false)
  const sessionData = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Return null on server-side rendering
  }

  const renderAuthLinks = () => {
    if (!sessionData || typeof sessionData.status === "undefined") {
      return <span>Loading...</span>
    }

    if (sessionData.status === "authenticated") {
      return (
        <>
          <Link href="/blog/create" className="hover:text-blue-400">
            Create Post
          </Link>
          <button onClick={() => signOut()} className="hover:text-blue-400">
            Sign Out
          </button>
        </>
      )
    }

    return (
      <>
        <Link href="/login" className="hover:text-blue-400">
          Login
        </Link>
        <Link href="/register" className="hover:text-blue-400">
          Register
        </Link>
      </>
    )
  }

  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Tech Blog
        </Link>
        <div className="space-x-4">
          <Link href="/blog" className="hover:text-blue-400">
            Blog
          </Link>
          {renderAuthLinks()}
        </div>
      </nav>
    </header>
  )
}

