'use server'

import { db } from "@/app/lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const GetBookingDays = async (date: Date) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date)
      }
    }
  })

  return bookings
}