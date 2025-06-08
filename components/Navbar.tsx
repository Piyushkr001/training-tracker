'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { useUser, useClerk } from '@clerk/nextjs'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Redirect ONLY after login (not on every page load)
  useEffect(() => {
    const fromLogin = searchParams.get('fromLogin')
    if (isLoaded && isSignedIn && fromLogin === 'true') {
      router.replace('/dashboard')
    }
  }, [isLoaded, isSignedIn, searchParams, router])

  const handleLogout = async () => {
    await signOut()
    router.replace('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-sm bg-gradient-to-r from-blue-100 via-white to-blue-100 dark:from-zinc-100 dark:via-gray-800 dark:to-gray-900">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-white">
          <Image src="/images/logo/logo.png" alt="Logo" width={100} height={100} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
            <Link href="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Dashboard</Link>
            <Link href="/programs" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Programs</Link>
            <Link href="/training-map" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Training Map</Link>
            <Link href="/resources" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Resources</Link>
            <Link href="/faq" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">FAQs</Link>
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <ThemeSwitcher />
            {!isSignedIn ? (
              <>
                <Link href="/sign-in?redirect_url=/dashboard?fromLogin=true">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            ) : (
              <Button
                size="sm"
                className="cursor-pointer bg-red-600 hover:bg-red-800"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 text-gray-700 dark:text-white" />
            </SheetTrigger>
            <SheetContent side="left" className="pt-4">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 ml-6 mr-6">
                <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
                <Link href="/programs" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Programs</Link>
                <Link href="/training-map" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Training Map</Link>
                <Link href="/faq" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">FAQs</Link>

                <ThemeSwitcher />

                {!isSignedIn ? (
                  <>
                    <Link href="/sign-in?redirect_url=/dashboard?fromLogin=true">
                      <Button variant="outline" size="sm" className="w-full">Login</Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button size="sm" className="w-full">Sign Up</Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
