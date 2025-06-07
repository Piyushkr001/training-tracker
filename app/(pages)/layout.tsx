import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import React from 'react'

function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}

export default PageLayout