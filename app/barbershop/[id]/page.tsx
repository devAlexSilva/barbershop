import { Button } from "@/app/components/ui/button"
import { db } from "@/app/lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"


type BarbershopProps = {
  params: { id: string }
}

const BarbershopDetailsPage = async ({ params }: BarbershopProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    }
  })

  if (!barbershop) return //todo - show other component when not found barbershop
  return (
    <main>
      <div className="h-[250px] w-full relative">
        <div className="absolute inset-0 z-10 flex justify-between py-3 px-5">
          <Button size='icon' variant='outline'><ChevronLeftIcon /></Button>
          <Button size='icon' variant='outline'><MenuIcon /></Button>
        </div>
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{ objectFit: 'cover', opacity: .75 }}

        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary size-[18px]" />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="text-primary size-[18px]" />
          <p className="text-sm">5,0 (765 Avaliações)</p>
        </div>
      </div>
    </main>
  )
}

export default BarbershopDetailsPage