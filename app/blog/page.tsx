"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { PostCard } from "@/components/PostCard"
import { useSession } from "next-auth/react"
import { FiPlusCircle } from "react-icons/fi"

type Post = {
  id: string
  title: string
  category: string
  content: string
  author: string
  createdAt: string
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    // Mock posts data
    const mockPosts: Post[] = [
      {
        id: "1",
        title: "Introduction to React Hooks",
        category: "Frontend",
        content:
          "React Hooks are a powerful feature that allow you to use state and other React features without writing a class...",
        author: "Jane Doe",
        createdAt: "1/5/2023",
      },
      {
        id: "2",
        title: "Building RESTful APIs with Node.js",
        category: "Backend",
        content: "In this tutorial, we'll explore how to create a RESTful API using Node.js and Express...",
        author: "John Smith",
        createdAt: "2/5/2023",
      },
      {
        id: "3",
        title: "Understanding SQL Injection Attacks",
        category: "Cybersecurity",
        content:
          "SQL injection is a code injection technique that might destroy your database. Let's learn how to prevent it...",
        author: "Alice Johnson",
        createdAt: "3/5/2023",
      },
    ]
    setPosts(mockPosts)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Tech Blog</h1>
          {session && (
            <Link
              href="/blog/create"
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              <FiPlusCircle className="mr-2" />
              Add Post
            </Link>
          )}
        </div>
        <div className="flex justify-between items-center space-x-4 mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
            defaultValue="All"
          >
            <option>All</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Fullstack</option>
            <option>Cybersecurity</option>
            <option>Databases</option>
            <option>Systems</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

