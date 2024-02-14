import { db } from "@/app/lib/prisma"
import BarbershopInfo from "./BarbershopInfo"
import ServiceItem from "./ServiceItem"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"


type BarbershopProps = {
  params: { id: string }
}

const BarbershopDetailsPage = async ({ params }: BarbershopProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      Service: true
    }
  })

  if (!barbershop) return //todo - show other component when not found barbershop
  
  const session = await getServerSession(authOptions)
  const isAuthenticaded = !!session

  return (
    <main>
      <BarbershopInfo barbershop={barbershop} />

      <div className="flex flex-col gap-4 px-5 pt-6">
        {barbershop.Service.map(service =>
          <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticaded={isAuthenticaded} />
        )}
      </div>
    </main>
  )
}

export default BarbershopDetailsPage