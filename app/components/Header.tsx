'use client'

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

const Header = () => {
  const { data } = useSession()

  return (
    <Card>
      <CardContent className="p-5 flex flex-row justify-between items-center">
        <Image src='/logo.png' alt="logo" width={120} height={22} className="h-auto w-auto" />
        <Button variant="outline" size='icon' className="h-8 w-8">
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Header