import Image from "next/image"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Barbershop } from "@prisma/client"
import { Button } from "./ui/button"
import { StarIcon } from "lucide-react"

type BarbershopItemProps = {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="p-1">
        <div className="relative w-full h-[159px] px-1">
          <div className="absolute top-1 left-2 z-10">
          <Badge variant='secondary' className="flex items-center gap-1 opacity-90">
            <StarIcon size={12} className="text-primary fill-primary"/>
            <span>5,0</span>
          </Badge>
          </div>
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            sizes="100vw"
            fill
            className="rounded-2xl"
            objectFit="cover"
          />
        </div>
        <div className="px-2 pb-2">
          <h2 className="font-bold mt-2 line-clamp-1">{barbershop.name}</h2>
          <p className="text-sm text-gray-400 line-clamp-1">{barbershop.address}</p>
          <Button variant='secondary' className="w-full mt-3">Reservar</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem