"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type React from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const res = await signIn("credentials", {
        email: "polbesalu@gmail.com",
        password: "polbesalu",
        redirect: false,  // Prevent auto-redirect for debugging
    });

    if (res?.error) {
        console.error("Login failed:", res.error);
    } else {
        console.log("Login successful!", res);
        window.location.href = "/blog"; // Redirect after successful login
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Login
        </button>
        <Link
          href="/register"
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-block text-center"
        >
          Register
        </Link>
      </form>
      <div className="mt-8 text-center">
        <button
          onClick={() => signIn("google")}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Login with Google
        </button>
        <button disabled
          //onClick={() => signIn("apple")}
          className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded"
          
        >
          Login with Apple
        </button>
      </div>
    </div>
  )
}

