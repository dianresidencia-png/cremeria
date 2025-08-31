"use client"

import Link from "next/link"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Menu } from "lucide-react"

const Menumobile = () => {
  return (
    <div className="">
      <Popover>
        <PopoverTrigger className="">
          <Menu />
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/categorias/lacteos-huevo"
              className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Lácteos y Huevo
            </Link>
            <Link
              href="/categorias/carnes-pescados"
              className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Carnes y Pescados
            </Link>
            <Link
              href="/categorias/pan-tortillas"
              className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Pan y Tortillas
            </Link>
            <Link
              href="/categorias/congelados"
              className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Congelados
            </Link>
            <Link
              href="/categorias/jamones-salchichoneria"
              className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Jamones y Salchichonería
            </Link>
            <Link
              href="/categorias/abarrotes"
              className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Abarrotes
            </Link>
            <Link
              href="/categorias/aderezos"
              className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Aderezos
            </Link>
            <Link
              href="/categorias/productos-higienica"
              className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Productos Higiénica
            </Link>
            <Link
              href="/categorias/paquetes-higienica"
              className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Paquetes Higiénica
            </Link>
          </nav>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Menumobile;