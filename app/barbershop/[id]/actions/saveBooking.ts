'use server'

import { db } from "@/app/lib/prisma"

type SaveBookingProps = {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}

export const SaveBooking = async ({
  barbershopId,
  serviceId,
  userId,
  date
}: SaveBookingProps) => {
  await db.booking.create({
    data: {
      barbershopId,
      serviceId,
      userId,
      date
    }
  })
}