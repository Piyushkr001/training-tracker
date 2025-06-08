import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import React from 'react'
import { Toaster } from 'sonner';

function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning>
        <Navbar/>
        {children}
         <Toaster richColors position="top-right" />
        <Footer/>
    </div>
  )
}

export default PageLayout