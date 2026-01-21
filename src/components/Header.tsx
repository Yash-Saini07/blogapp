'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

// A modern, animated header that works with next-themes (class strategy) and shadcn Button
// - Uses styled-jsx for lightweight custom keyframes so you don't need to touch tailwind.config
// - Assumes Tailwind is available and next-themes is configured with `attribute: 'class'`

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // avoid hydration mismatch when reading theme on server
  }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <header className="relative isolate overflow-hidden rounded-2xl p-8 md:p-12 lg:p-20 text-center transition-shadow duration-300 ease-out">

      <div className="mx-auto max-w-3xl">
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl mt-20 sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
        >
          Welcome to the Blog
        </motion.h1>

        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground"
        >
          Read the latest blogs from our community — thoughtful pieces, tutorials, and behind-the-scenes stories.
        </motion.p>
      </div>
    </header>
  )
}

export default Header
