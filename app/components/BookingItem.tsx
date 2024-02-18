'use client'

import { Prisma } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isPast } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import Image from "next/image"
import { formatCurrency } from "../lib/utils"
import { Button } from "./ui/button"
import { CancelBooking } from "../actions/cancelBookings"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"


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
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelBooking = async () => {
    setIsLoading(true)

    try {
      await CancelBooking(booking)
      toast.success('Reserva cancelada com sucesso!')

    } catch (error) {
      toast.error('Falha ao cancelar!')
    }
    finally {
      setIsLoading(false)
    }
  }


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[80%]">
          <CardContent className="flex px-0 py-0">
            <div className="flex flex-[3] flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit" variant={isFinished ? 'secondary' : 'default'}>
                {isFinished ? 'Finalizado' : 'Confirmado'}
              </Badge> {/*w-fit to restrict size div */}
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
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="text-left pb-6 px-5 border-b border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative w-full h-[180px] mt-6">
            <Image
              src='/barbershop-map.png'
              fill
              alt='background map image'
            />
            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="flex p-3 gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs line-clamp-1">{booking.barbershop.address}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge className="w-fit mt-6 mb-3" variant={isFinished ? 'secondary' : 'default'}>
            {isFinished ? 'Finalizado' : 'Confirmado'}
          </Badge>

          <Card>
            <CardContent className="p-3 flex flex-col gap-2">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold">{formatCurrency(Number(booking.service.price))}</h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Data</h3>
                <h4 className="text-sm">{format(booking.date, "dd 'de' MMMM", { locale: ptBR })}</h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Horário</h3>
                <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Barbearia</h3>
                <h4 className="text-sm">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="flex-row w-full px-5 gap-3 mt-6">
          <SheetClose asChild>
            <Button className="w-full" variant='secondary'>Voltar</Button>
          </SheetClose>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={isFinished || isLoading}
                className="w-full" variant='destructive'
              >
                {
                  isLoading
                    ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" /> && '...')
                    : 'Cancelar Reserva'
                }
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="w-[90%]">
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar Reserva?</AlertDialogTitle>
                <AlertDialogDescription>
                  Uma vez confirmada<br />
                  essa ação não poderá ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex flex-row gap-4">
                <AlertDialogCancel className="w-full mt-0">
                  Voltar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-full"
                  onClick={handleCancelBooking}
                  disabled={isFinished || isLoading}
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>

            </AlertDialogContent>
          </AlertDialog>

        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem