import {create} from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { Producto } from "@/components/types/producto"
import { toast } from "sonner"

interface UseLovedProductsType {
  lovedItems: Producto[]
  addLoveItem: (data: Producto) => void
  removeLoveItem: (id: number) => void
}


export const useLovedProducts = create<UseLovedProductsType>()(
  persist(
    (set, get) => ({
      lovedItems: [],

      addLoveItem: (data: Producto) => {
        const currentLovedItems = get().lovedItems
        const existingItem = currentLovedItems.find(item => item.id === data.id)


        if (existingItem) {
          toast.error("El producto ya está en la lista")
          return
        }

        set({ lovedItems: [...currentLovedItems, data] })
        toast.success("Producto añadido a la lista")
      },

      removeLoveItem: (id: number) => {
        const updatedItems = get().lovedItems.filter((item: Producto) => item.id !== id)
        set({ lovedItems: updatedItems })
        toast("Producto eliminado de la lista")
      }
    }),
    {
      name: "love-products-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

