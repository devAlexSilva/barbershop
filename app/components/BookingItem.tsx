import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

const BookingItem = () => {
  return (
    <Card>
      <CardContent className="flex justify-between py-0">
        <div className="flex flex-col gap-2 py-5">
          <Badge className="text-primary w-fit bg-[#221C3D] hover:bg-[#221C3D]">Confirmado</Badge> {/*w-fit to restrict size div */}
          <h2 className="font-bold">Corte de cabelo</h2>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />

              <AvatarFallback>A</AvatarFallback>  {/*in case of error on fetch avatar*/}
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pl-6 border-l border-solid border-secondary">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">12</p>
          <p className="tex-sm">17:18</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem