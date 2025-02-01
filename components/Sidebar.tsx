"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { FiHome, FiSearch, FiPlusCircle, FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi"

export const Sidebar = () => {
  const { data: session, status } = useSession()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <aside className="bg-gray-800 w-64 min-h-screen p-4">
      <nav className="space-y-4">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
          <FiHome />
          <span>Tech Blog</span>
        </Link>
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center space-x-2 w-full text-left"
          >
            <FiSearch />
            <span>Search</span>
          </button>
          {isSearchOpen && (
            <input type="text" placeholder="Search..." className="mt-2 w-full p-2 bg-gray-700 rounded" />
          )}
        </div>
        {status === "authenticated" && (
          <Link href="/blog/create" className="flex items-center space-x-2">
            <FiPlusCircle />
            <span>Create Post</span>
          </Link>
        )}
        {status === "unauthenticated" ? (
          <>
            <Link href="/login" className="flex items-center space-x-2">
              <FiLogIn />
              <span>Login</span>
            </Link>
            <Link href="/register" className="flex items-center space-x-2">
              <FiUserPlus />
              <span>Register</span>
            </Link>
          </>
        ) : (
          <button onClick={() => signOut()} className="flex items-center space-x-2">
            <FiLogOut />
            <span>Logout</span>
          </button>
        )}
      </nav>
    </aside>
  )
}

