import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import SideMenu from "./SideMenu"

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row justify-between items-center">
        <Image src='/logo.png' alt="logo" width={120} height={22} className="h-auto w-auto" />
        <SideMenu />
      </CardContent>
    </Card>
  )
}

export default Header