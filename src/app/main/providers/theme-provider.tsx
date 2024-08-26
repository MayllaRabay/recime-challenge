"use client"
import { GlobalStyle } from "@/app/styles"
import { PropsWithChildren } from "react"

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  )
}
