import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { Producto } from "@/components/types/producto"
import { toast } from "sonner"

interface CartStore {
  items: Producto[]
  addItem: (data: Producto) => void
  removeItem: (id: number) => void
  removeAll: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (data: Producto) => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.id === data.id)

        if (existingItem) {
          toast.error("El producto ya está en el carrito")
          return
        }

        set({ items: [...currentItems, data] })
        toast.success("Producto añadido al carrito")
      },

      removeItem: (id: number) => {
        const filteredItems = get().items.filter(item => item.id !== id)
        set({ items: filteredItems })
        toast("Producto eliminado del carrito")
      },

      removeAll: () => {
        set({ items: [] })
        toast("Carrito vaciado")
      }
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
