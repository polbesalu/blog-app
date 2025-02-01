"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const categories = [
  "Frontend",
  "Backend",
  "Fullstack",
  "DevOps",
  "Databases",
  "Cybersecurity",
  "Machine Learning",
  "Mobile Development",
]

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("category", category)
    formData.append("content", content)
    files.forEach((file) => formData.append("files", file))

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      router.push("/blog")
    } else {
      // Handle error
      console.error("Failed to create post")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Create New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded"
            rows={10}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="files" className="block mb-2">
            Attachments (Images, PDFs, Links, Project Folders)
          </label>
          <input
            type="file"
            id="files"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="w-full px-3 py-2 bg-gray-800 rounded"
            multiple
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              // Implement preview functionality
              console.log("Preview post")
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Preview
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Create Post
          </button>
        </div>
      </form>
    </div>
  )
}

