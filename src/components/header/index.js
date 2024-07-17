"use client"

import { AlignJustify } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

export default function Header({ user , profileInfo}) {
    const menuItems = [
        {
            label: 'Home',
            path: '/',
            show: true
        },
        {
            label: 'Login',
            path: '/sign-in',
            show: !user
        },
        {
            label: 'Register',
            path: '/sign-up',
            show: !user
        },
        {
            label: 'Jobs',
            path: '/jobs',
            show: user
        },
        {
            label: 'Activity',
            path: '/activity',
            show: profileInfo?.role === 'candidate'
        },
        {
            label: 'Membership',
            path: '/membership',
            show: user
        },
        {
            label: 'Account',
            path: '/account',
            show: user
        }
    ]
    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden">
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle Navigation Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link className="mr-6 hidden lg:flex" href={'#'}>
                            <h3>JOBSCO</h3>
                        </Link>
                        <div className="grid gap-2 py-6">
                            {menuItems.map((menuItem, index) =>
                                menuItem.show ?
                                    <Link key={index} href={menuItem.path} className="flex w-full items-center py-2 text-lg font-semibold ">{menuItem.label}</Link>
                                    : null
                            )}
                             <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>

                </Sheet>
                <Link className="hidden font-bold text-4xl lg-flex mr-6" href={'/'}>
                    JOBSCO
                </Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {menuItems.map((menuItem, index) => menuItem.show ?
                        <Link key={index} href={menuItem.path} 
                            onClick={()=> sessionStorage.removeItem('filterParams')}
                            className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">
                            {menuItem.label}
                        </Link>
                        : null)}
                        <UserButton afterSignOutUrl="/" />
                </nav>
            </header>
        </div>
    )
}