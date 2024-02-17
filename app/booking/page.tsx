import { getServerSession } from "next-auth"
import Header from "../components/Header"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { db } from "../lib/prisma"
import BookingItem, { BookingItemPropps } from "../components/BookingItem"
import { Booking } from "@prisma/client"
import { isFuture, isPast } from "date-fns"

const booking = async () => {
  const session = await getServerSession(authOptions)

  if (!session) return redirect('/')

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id
    },
    include: {
      service: true,
      barbershop: true
    }
  })


  // let confirmed = []
  // let finished = []

  // bookings.filter(booking => {
  //   return booking.date < new Date() ? finished.push(booking) : confirmed.push(booking)
  // })
  const confirmed = bookings.filter(booking => isFuture(booking.date))
  const finished = bookings.filter(booking => isPast(booking.date))

  return (
    <div>
      <Header />

      <div className="px-5 py-6">
        <h1 className="font-bold text-xl">Agendamentos</h1>

        <h2 className="text-gray-400 font-bold text-sm uppercase mt-6 mb-3">Confirmados</h2>
        <div className="flex flex-col gap-3">
          {confirmed.map(booking => <BookingItem key={booking.id} booking={booking} status='Confirmados' />)}
        </div>

        <h2 className="text-gray-400 font-bold text-sm uppercase mt-6 mb-3">Finalizados</h2>
        <div className="flex flex-col gap-3">
          {finished.map(booking => <BookingItem key={booking.id} booking={booking} status='Finalizados' />)}
        </div>
      </div>
    </div>
  )
}

export default booking