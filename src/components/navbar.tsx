'use client'

import Brand from './brand'
import SocialIcons from './social-icons'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navigation } from '@/content/navigation'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import Link from 'next/link'

type Props = React.ComponentProps<'header'>

export default function Navbar({ className, ...props }: Props) {
  return (
    <header className={cn('bg-background sticky top-0 z-50 w-full border-b', className)} {...props}>
      <div className="container mx-auto flex items-center gap-8 p-4 max-md:justify-between">
        {/* Sidebar - Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="max-md:order-last md:hidden">
              <Menu />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col items-center justify-between p-6">
            <SheetTitle className="sr-only">Navegación</SheetTitle>
            <SheetDescription className="sr-only">
              Barra lateral de navegación móvil
            </SheetDescription>

            <Brand />

            <NavigationMenu>
              <NavigationMenuList className="flex-col gap-3">
                {navigation.map(({ title, href }) => (
                  <NavigationMenuItem key={title}>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), 'text-center text-xl')}
                      asChild
                    >
                      <Link href={href}>{title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <SocialIcons />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Brand />

        {/* Navigation - Desktop */}
        <NavigationMenu className="mr-auto max-md:hidden">
          <NavigationMenuList>
            {navigation.map(({ title, href }) => (
              <NavigationMenuItem key={title}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Link href={href}>{title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Social Links - Desktop */}
        <SocialIcons className="max-md:hidden" />
      </div>
    </header>
  )
}
