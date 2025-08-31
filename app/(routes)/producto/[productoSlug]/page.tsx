"use client"

import { useGetProductBySlug } from "@/app/hooks/productos/getProductBySlug"
import { useParams } from "next/navigation"
import SkeletonProduct from "./components/skeleton-product"
import CarouselProduct from "./components/carousel-product"
import InfoProduct from "./components/info-product"
import { Producto } from "@/components/types/producto"

export default function Page() {
  const params = useParams()
  const { productoSlug } = params as { productoSlug: string }

  const { result, loading, error } = useGetProductBySlug(productoSlug)

  if (loading || !result || result.length === 0) {
    return <SkeletonProduct />
  }

  const producto: Producto = result[0]

  return (
    <div className="max-w-6xl py-4 mx-auto">
      <div className="grid sm:grid-cols-2">
        <div>
          <CarouselProduct producto={producto} />
        </div>
        <div className="sm:px-12">
          <InfoProduct product={producto} />
        </div>
      </div>
    </div>
  )
}
