import { Prisma } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isPast } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"


export type BookingItemPropps = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemPropps) => {
  const isFinished = isPast(booking.date)

  return (
    <Card className="min-w-[80%]">
      <CardContent className="flex px-0 py-0">
        <div className="flex flex-[3] flex-col gap-2 py-5 pl-5">
          <Badge className="w-fit" variant={isFinished ? 'secondary' : 'default'}>{isFinished ? 'Finalizado' : 'Confirmado'}</Badge> {/*w-fit to restrict size div */}
          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>A</AvatarFallback>  {/*in case of error on fetch avatar*/}
            </Avatar>
            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary">
          <p className="text-sm">{format(booking.date, "MMM", { locale: ptBR })}</p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="tex-sm">{format(booking.date, "hh:mm")}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem