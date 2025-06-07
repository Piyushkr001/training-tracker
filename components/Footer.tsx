'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-white bg-gradient-to-br dark:from-zinc-100 dark:via-gray-800 dark:to-gray-900 text-gray-600 dark:text-gray-300">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Logo and Description */}
        <div className="text-center md:text-left">
          <Image src="/images/logo/logo.png" alt="Logo" width={100} height={100} />
          <p className="mt-2 max-w-sm text-sm">
            A smart and efficient training tracker for wardens — streamline, organize, and improve performance.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/features" className="hover:underline">Features</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-4">
          <Button size="icon" variant="ghost" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href="https://x.com" target="_blank" rel="noopener noreferrer">
             <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-5 w-5" />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5" />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="border-t text-xs text-center py-4 text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Drill Desk. All rights reserved.
      </div>
    </footer>
  )
}
