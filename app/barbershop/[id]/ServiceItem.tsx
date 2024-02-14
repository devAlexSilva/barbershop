'use client'

import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import { Card, CardContent } from "@/app/components/ui/card"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/sheet"
import { Barbershop, Service } from "@prisma/client"
import { ptBR } from "date-fns/locale/pt-BR"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useMemo, useState } from "react"
import { generateDayTimeList } from "../helpers/hours"
import { format } from "date-fns"

type ServiceProps = {
  service: Service
  isAuthenticaded: boolean
  barbershop: Barbershop
}
const ServiceItem = ({ service, isAuthenticaded, barbershop }: ServiceProps) => {
  const [date, setDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleClickBooking = () => {
    if (!isAuthenticaded) return signIn('google')

    // TODO - abrir modal de agendamento
  }

  const handleClickTime = (time: string) => setSelectedTime(time)

  const timeList = useMemo(() => {
    date && setSelectedTime(null)
    return date ? generateDayTimeList(date) : []

  }, [date])

  const formatCurrency = (price: number) => Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' })
    .format(price)

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
                {formatCurrency(Number(service.price))}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant='secondary' onClick={handleClickBooking}>
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-4 border-b border-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    mode="single"
                    locale={ptBR}
                    fromDate={new Date()}
                    selected={date}
                    onSelect={setDate}
                    className="mt-5"
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize'
                      },
                      cell: {
                        width: '100%'
                      },
                      button: {
                        width: '100%'
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px',
                        marginRight: '8px'
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px',
                        marginLeft: '8px'
                      },
                      caption: {
                        textTransform: 'capitalize'
                      }
                    }}
                  />

                  <div className="flex gap-3 px-5 py-6 border-y border-secondary overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {
                      timeList.map((time, index) => (
                        <Button
                          key={index}
                          onClick={() => handleClickTime(time)}
                          variant={time === selectedTime ? 'default' : 'outline'}
                          className="rounded-full">
                          {time}
                        </Button>
                      ))
                    }
                  </div>

                  <div className="p-5 border-secondary">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-2">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold">{formatCurrency(Number(service.price))}</h3>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Data</h3>
                            <h4 className="text-sm">{format(date, "dd 'de' MMMM", { locale: ptBR })}</h4>
                          </div>
                        )}

                        {selectedTime && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Horário</h3>
                            <h4 className="text-sm">{selectedTime}</h4>
                          </div>
                        )}

                        {
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Barbearia</h3>
                            <h4 className="text-sm">{barbershop.name}</h4>
                          </div>
                        }
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button disabled={selectedTime === null ? true : false}>
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem