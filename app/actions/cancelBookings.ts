'use server'

import { Booking } from "@prisma/client"
import { db } from "../lib/prisma"
import { revalidatePath } from "next/cache"

export const CancelBooking = async (booking: Booking) => {
  await db.booking.delete({
    where: {
      id: booking.id
    }
  })

  revalidatePath('/booking')
}