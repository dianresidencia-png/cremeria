'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Expand, ShoppingCart, Package } from 'lucide-react'
import { Producto } from '@/components/types/producto'
import IconButton from '@/components/icon-button'
import SkeletonSchema from '@/components/skeletonSchema'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

interface ProductCardProps {
  product: Producto
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter()

  if (!product) return <SkeletonSchema grid={2} />

  return (
    <div className="relative p-4 rounded-xl bg-[#FFF8E7] dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-200">
      {/* Etiquetas superiores */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full font-medium ${
          product.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          <Package size={12} />
          {product.disponible ? 'Disponible' : 'Agotado'}
        </span>
        {product.pesokg && (
          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium">
            {product.pesokg} kg
          </span>
        )}
      </div>

      {/* Enlace envolvente */}
      <Link href={`/producto/${product.slug}`} className="block">
        <Carousel className="w-full mt-10">
          <CarouselContent>
            {product.imagenes?.length ? (
              product.imagenes.map((img) => (
                <CarouselItem key={img.id} className="group relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${img.url}`}
                    alt={img.alternativeText || img.name}
                    className="rounded-xl w-full h-48 object-cover border"
                  />
                  <div className="absolute bottom-4 left-0 right-0 px-6 opacity-0 group-hover:opacity-100 transition duration-200">
                    <div className="flex justify-center gap-4">
                      <IconButton
                        onClick={() => router.push(`/producto/${product.slug}`)}
                        icon={<Expand size={20} className="text-gray-600 dark:text-gray-300" />}
                      />
                      <IconButton
                        onClick={() => console.log('Añadir al carrito')}
                        icon={<ShoppingCart size={20} className="text-gray-600 dark:text-gray-300" />}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="flex items-center justify-center h-48 bg-gray-200 dark:bg-gray-700 rounded-xl">
                <span className="text-gray-500">Sin imagen</span>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </Link>

      {/* Información del producto */}
      <div className="mt-4 space-y-1 text-center">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
          {product.productoNombre}
        </h3>
        <p className="text-xl font-bold text-amber-700 dark:text-amber-500">
          ${product.precio.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
