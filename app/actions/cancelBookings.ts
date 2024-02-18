'use server'

import { Booking } from "@prisma/client"
import { db } from "../lib/prisma"

export const CancelBooking = async (booking: Booking) => {
  return await db.booking.delete({
    where: {
      id: booking.id
    }
  })
}