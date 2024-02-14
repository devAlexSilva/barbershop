'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const SideMenu = () => {
  const { data, status } = useSession()

  const handleLogin = () => signIn('google') // select providers to show on click to signIn
  const handleLogout = () => signOut()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size='icon' className="h-8 w-8">
          <MenuIcon size={18} />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader className="text-left border-b border-secondary p-5">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {(status === 'authenticated' && data.user) ? (
          <div className="flex justify-between px-5 py-6">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={data.user.image || ''} alt='user avatar' />
              </Avatar>

              <h2 className="font-bold">{data.user.name}</h2>
            </div>

            <Button onClick={handleLogout} variant='secondary' size='icon'>
              <LogOutIcon />
            </Button>
          </div>
        )
          : (
            <div className="px-5 py-6 gap-4 flex flex-col">
              <div className="flex items-center gap-2">
                <UserIcon size={32} />
                <h2 className="font-bold">Olá, Faça seu Login!</h2>
              </div>

              <Button onClick={handleLogin} variant='secondary' className="w-full justify-start">
                <LogInIcon className="mr-2" size={18} />
                Fazer Login
              </Button>
            </div>
          )}

        <div className="flex flex-col gap-3 px-5">
          <Button variant='outline' className="justify-start" asChild>
            <Link href='/'>
              <HomeIcon size={18} className="mr-2" />
              Início
            </Link>
          </Button>

          {status === 'authenticated' && data.user ? (
            <Button variant='outline' className="justify-start" asChild>
              <Link href='/bookings'>
                <CalendarIcon size={18} className="mr-2" />
                Agendamentos
              </Link>
            </Button>
          )
            : (
              <></>
            )}
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default SideMenu