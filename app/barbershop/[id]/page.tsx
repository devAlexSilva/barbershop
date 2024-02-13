import { db } from "@/app/lib/prisma"
import BarbershopInfo from "./BarbershopInfo"


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
      <BarbershopInfo barbershop={barbershop} />
    </main>
  )
}

export default BarbershopDetailsPage