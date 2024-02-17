'use server'

import { db } from "@/app/lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const GetBookingDays = async (barbershopId: string, serviceId: string, date: Date) => {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      serviceId,
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date)
      }
    }
  })

  return bookings
}