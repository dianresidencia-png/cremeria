import { useCart } from "@/app/hooks/use-cart"
import { Producto } from "@/components/types/producto"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface CartItemProps {
  product: Producto
}

const CartItem = ({ product }: CartItemProps) => {
  const router = useRouter()
  const { removeItem } = useCart()

 
  const imageUrl = product.imagenes?.[0]?.formats?.thumbnail?.url || product.imagenes?.[0]?.url
  const fullImageUrl = imageUrl ? `${imageUrl}` : "/placeholder.png"

  return (
    <div>
      <li className="flex py-6 border-b">
        <div onClick={() => router.push(`/producto/${product.slug}`)} className="cursor-pointer">
          <img
            src={fullImageUrl}
            alt={product.imagenes?.[0]?.alternativeText || product.productoNombre}
            className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32 object-cover"
          />
        </div>
        <div className="flex justify-between flex-1 px-6">
            <div>
                <h2 className="text-lg font-bold"> {product.productoNombre} </h2>
                <p className="font-bold">{formatPrice(product.precio)}</p>
                <div className="flex items-center justify-between gap-3" >
                    <p className="px-3 py-1 mt-2 text-xs rounded-full bg-yellow-400 text-black dark:bg-blue-500 dark:text-white font-medium"> {product.marca}</p>
                </div>
            </div>
            <div>
                <button className={cn("rounded-full flex items-center border p-1")}>
                    <X size={20} onClick={()=> removeItem(product.id)} />
                </button>
            </div>

        </div>
      </li>
    </div>
  )
}

export default CartItem

