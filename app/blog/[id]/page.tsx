"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

type Post = {
  id: string
  title: string
  category: string
  content: string
  author: string
  createdAt: string
}

export default function ReadPost() {
  const [post, setPost] = useState<Post | null>(null)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    // Fetch post from API
    const fetchPost = async () => {
      // This is a mock API call. Replace with your actual API endpoint.
      const mockPost: Post = {
        id: id as string,
        title: "Understanding React Hooks",
        category: "Frontend",
        content: `React Hooks are a powerful feature introduced in React 16.8. They allow you to use state and other React features without writing a class. This means you can use React without classes.

        The most commonly used hooks are:

        1. useState: This hook lets you add React state to function components.
        2. useEffect: This hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.
        3. useContext: This hook lets you subscribe to React context without introducing nesting.

        Hooks solve many problems that developers faced with the class-based approach, such as the complexity of using this keyword, the need to bind event handlers, and the difficulty in reusing stateful logic between components.

        By using hooks, you can extract stateful logic from a component so it can be tested independently and reused. Hooks allow you to reuse stateful logic without changing your component hierarchy. This makes it easy to share Hooks among many components or with the community.`,
        author: "Jane Doe",
        createdAt: "2023-05-01",
      }
      setPost(mockPost)
    }
    fetchPost()
  }, [id])

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
        &larr; Back to all posts
      </Link>
      <article className="bg-gray-800 rounded-lg shadow-lg p-6 mt-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-400 mb-4">
          {post.category} | {new Date(post.createdAt).toLocaleDateString()} | by {post.author}
        </div>
        <div className="prose prose-invert max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  )
}

