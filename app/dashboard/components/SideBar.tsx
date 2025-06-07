'use client'

import { useUser } from '@clerk/nextjs'
import { GraduationCapIcon, LayoutDashboard, ViewIcon } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {User, UsersThree } from 'phosphor-react'
import React, { useEffect } from 'react'


const SideNav = () => {
    const MenuList = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard',
        },
        {
            name: ' Overview',
            icon: ViewIcon,
            path: '/dashboard/overview',
        },
        {
            name: ' Wardens',
            icon: User,
            path: '/dashboard/wardens',
        },
        {
            name: ' Trainings',
            icon: GraduationCapIcon,
            path: '/dashboard/trainings',
        },
        {
            name: 'Attendance',
            icon: UsersThree,
            path: '/dashboard/attendance',
        },
    ]

    const path = usePathname();



    useEffect(() => {
        console.log(path);
    }, [])

    return (
        <div className="h-screen p-5 shadow-sm border-r bg-white dark:bg-slate-900 dark:border-slate-700 flex flex-col justify-between">
            <div>
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Link href="/">
                        <Image src="/images/logo/logo.png" alt="logo" width={120} height={100} />
                    </Link>
                </div>

                <hr className="border-slate-300 dark:border-slate-700 mb-6" />

                {/* Navigation */}
                <nav className="space-y-2">
                    {MenuList.map((menu, index) => {
                        const isActive = path === menu.path
                        return (
                            <Link href={menu.path} key={index}>
                                <div
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                                    ${isActive
                                            ? 'bg-primary text-white dark:text-black'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <menu.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{menu.name}</span>
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

export default SideNav