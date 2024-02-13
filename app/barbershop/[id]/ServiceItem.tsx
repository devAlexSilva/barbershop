import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Service } from "@prisma/client"
import Image from "next/image"

type ServiceProps = {
  service: Service
}
const ServiceItem = ({ service }: ServiceProps) => {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg"
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="font-bold text-sm">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-4">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' })
                  .format(Number(service.price))}
              </p>
              <Button variant='secondary'>Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem