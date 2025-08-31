import { Producto } from "@/components/types/producto"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/formatPrice"
import { Heart } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/app/hooks/use-cart"
import { useLovedProducts } from "@/app/hooks/use-loved-products"

export type InfoProductProps = {
  product: Producto
}


const InfoProduct = ({ product }: InfoProductProps) => {
  const { addItem } = useCart()
  const {addLoveItem} = useLovedProducts()
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 space-y-6">
      {/* Nombre y estado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {product.productoNombre}
        </h1>

        <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              product.disponible
                ? "bg-green-600 text-white dark:bg-green-400 dark:text-black"
                : "bg-red-500 text-white dark:bg-red-400 dark:text-black"
            }`}
          >
            {product.disponible ? "Disponible" : "No disponible"}
          </span>

          {product.destacado && (
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-400 text-black dark:bg-yellow-300 dark:text-black font-medium">
              Producto destacado
            </span>
          )}
        </div>
      </div>

      <Separator />

      {/* Descripción */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {product.descripcion}
      </p>

      {/* Detalles adicionales */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <span className="font-medium text-gray-800 dark:text-white">Marca:</span> {product.marca}
        </div>
        <div>
          <span className="font-medium text-gray-800 dark:text-white">Peso:</span>{" "}
          {product.pesokg ? `${product.pesokg} kg` : "No especificado"}
        </div>
        <div>
          <span className="font-medium text-gray-800 dark:text-white">Creado:</span>{" "}
          {new Date(product.fechacreacion).toLocaleDateString("es-MX")}
        </div>
      </div>

      <Separator />

      {/* Precio */}
      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {formatPrice(product.precio)}
      </p>

      {/* Acciones */}
      <div className="flex items-center gap-3 pt-2">
        <Button className="flex-1" onClick={() => addItem(product)}>
          Comprar
        </Button>
        <button
          onClick={() => addLoveItem(product)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Heart
            width={24}
            strokeWidth={1.5}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition"
            onClick={() => addLoveItem(product)}
          />

          
        </button>
      </div>
    </div>
  )
}

export default InfoProduct