"use client"

import { useCart } from "@/app/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/formatPrice"
import CartItem from "./components/cart-items"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"

export default function Page() {
  const { items, removeAll } = useCart()

  const totalPrice = items.reduce((total, product) => total + product.precio, 0)
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

  const buyStripe = async () => {
    try {
      const stripe = await stripePromise
      
      // Mapear los items del carrito al formato que espera el backend
      const productos = items.map(item => ({
        id: item.id,
        cantidad: 1 
      }))

      // URL corregida - apunta a tu backend de Strapi
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
        productos: productos
      })

      await stripe?.redirectToCheckout({
        sessionId: res.data.stripeSession.id
      })
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      // Agregar mejor manejo de errores para el usuario
      alert("Error al procesar el pago. Por favor, intenta de nuevo.")
    }
  }

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-5 text-3xl font-bold text-center">🛒 Carrito</h1>

      <div className="grid sm:grid-cols-2 sm:gap-8">
        <div>
          {items.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No hay productos en el carrito
            </p>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
            </ul>
          )}
        </div>

        <div className="max-w-xl mx-auto">
          <div className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800">
            <p className="mb-3 text-lg font-semibold text-center">Resumen del pedido</p>
            <Separator />
            <div className="flex justify-between gap-5 my-4 text-sm">
              <p>Total a pagar:</p>
              <p className="font-bold">{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex items-center justify-center w-full mt-3">
              <Button 
                className="w-full" 
                onClick={buyStripe}
                disabled={items.length === 0}
              >
                Comprar
              </Button>
            </div>
            <div className="flex items-center justify-center w-full mt-2">
              <Button variant="outline" className="w-full" onClick={removeAll}>
                Vaciar carrito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}