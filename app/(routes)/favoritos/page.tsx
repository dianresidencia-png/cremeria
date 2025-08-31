"use client"

import { useLovedProducts } from "@/app/hooks/use-loved-products"
import { useCart } from "@/app/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const LovedPage = () => {
  const router = useRouter()
  const { lovedItems, removeLoveItem } = useLovedProducts()
  const { addItem } = useCart()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">❤️ Tus Favoritos</h1>

      {lovedItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No tienes productos guardados aún.
          </p>
          <Button onClick={() => router.push("/productos")}>
            Explorar productos
          </Button>
        </div>
      ) : (
        <ul className="space-y-6">
          {lovedItems.map((product) => {
            const imageUrl =
              product.imagenes?.[0]?.formats?.thumbnail?.url || product.imagenes?.[0]?.url
            const fullImageUrl = imageUrl
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`
              : "/placeholder.png"

            return (
              <li key={product.id} className="flex items-center gap-6 border-b pb-6">
                <img
                  src={fullImageUrl}
                  alt={product.imagenes?.[0]?.alternativeText || product.productoNombre}
                  className="w-24 h-24 rounded-md object-cover cursor-pointer"
                  onClick={() => router.push(`/producto/${product.slug}`)}
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.productoNombre}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {formatPrice(product.precio)}
                  </p>
                  <p className="mt-1 inline-block px-3 py-1 text-xs rounded-full bg-yellow-400 text-black dark:bg-blue-500 dark:text-white font-medium">
                    {product.marca}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => addItem(product)}
                    className="text-sm"
                  >
                    Agregar al carrito
                  </Button>
                  <button
                    onClick={() => removeLoveItem(product.id)}
                    className={cn("rounded-full border p-1 hover:bg-red-100 dark:hover:bg-red-900")}
                  >
                    <X size={18} className="text-red-500" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default LovedPage
