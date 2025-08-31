"use client"

import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = () => {
  return (
    <div className="relative p-2 transition-all duration-100 rounded-lg bg-gray-100 dark:bg-neutral-800">
      {/* Etiquetas superiores simuladas */}
      <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4 left-0 right-0">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      {/* Imagen simulada */}
      <Skeleton className="w-full h-48 rounded-xl mt-6" />

      {/* Botones flotantes simulados */}
      <div className="absolute w-full px-6 bottom-5">
        <div className="flex justify-center gap-x-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Información del producto */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton