import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Producto } from "@/components/types/producto"

interface CarouselProductProps {
  producto: Producto
}

const CarouselProduct = ({ producto }: CarouselProductProps) => {
  const { imagenes } = producto

  return (
    <div>
      <Carousel className="sm:px-16">
        <CarouselContent>
          {imagenes.map((imagen) => (
            <CarouselItem key={imagen.id}>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imagen.url}`}
                alt={imagen.alternativeText ?? imagen.name}
                className="rounded-l-lg object-cover w-full h-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CarouselProduct
