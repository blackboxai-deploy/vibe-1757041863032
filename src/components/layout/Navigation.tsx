"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Users, 
  Calendar, 
  User, 
  Settings, 
  Menu,
  Gamepad2,
  Crown,
  Zap
} from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const navigationItems = [
    { href: '/', label: 'Home', icon: Gamepad2 },
    { href: '/tournaments', label: 'Tournaments', icon: Trophy },
    { href: '/teams', label: 'Teams', icon: Users },
    { href: '/matches', label: 'Matches', icon: Calendar },
    { href: '/leaderboard', label: 'Leaderboard', icon: Crown },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            FF Tournament
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-8 space-x-6">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-orange-500 transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right Side */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Notification Badge */}
          <Button variant="ghost" size="sm" className="relative">
            <Calendar className="w-4 h-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-1" />
              Login
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-slate-900 border-orange-500/20">
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex items-center space-x-2 px-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    FF Tournament
                  </span>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-300 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  >
                    Login / Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}