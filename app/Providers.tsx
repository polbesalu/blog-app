"use client"

import { SessionProvider } from "next-auth/react"
import React, { type ErrorInfo } from "react"

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("NextAuth error", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong with authentication.</h1>
    }

    return this.props.children
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <SessionProvider>{children}</SessionProvider>
    </ErrorBoundary>
  )
}

