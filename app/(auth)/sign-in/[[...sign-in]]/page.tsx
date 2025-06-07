'use client'
import { SignIn, useUser } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignInPage() {
  
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-blue-200 via-white to-blue-400  dark:from-gray-700 dark:via-gray-300 dark:to-gray-800'>
            <div>
                <Image src='/images/Sign-In.jpg' width={700} height={1000} alt={'login'} className='w-full' />
            </div>
            <div className='flex items-center justify-center h-screen order-first md:order-last'>
                <SignIn />
            </div>
        </div>
    )
}
