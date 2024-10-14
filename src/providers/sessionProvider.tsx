'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

type NextAuthSessionProviderProps = {
  children: ReactNode
}

export function NextAuthSessionProvider({ children }: NextAuthSessionProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}