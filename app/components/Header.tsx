import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import SideMenu from "./SideMenu"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row justify-between items-center">
        <Link href='/'>
          <Image src='/logo.png' alt="logo" width={120} height={22} className="h-auto w-auto" />
        </Link>
        <SideMenu />
      </CardContent>
    </Card>
  )
}

export default Header