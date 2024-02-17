import { format } from "date-fns";
import Header from "../components/Header";
import { ptBR } from "date-fns/locale";
import Search from "./Search";
import BookingItem from "../components/BookingItem";
import BarbershopItem from "../components/BarbershopItem";
import { db } from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),

    session?.user ?
      db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date()
          }
        },
        include: {
          service: true,
          barbershop: true
        }
      })
      : Promise.resolve([])
  ])

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Delavex</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE ', ' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Recomendados</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Populares</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>
      </div>

    </div>

  );
}
