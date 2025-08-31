"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// ======================
// Datos del menú
// ======================
const productos = [
  { href: "/productos", title: "Todos los productos", desc: "Explora todo nuestro catálogo." },

  { href: "/categorias", title: "Mayoreo", desc: "Precios especiales para compras grandes." },
]

const categorias = [
  {
    href: "/categoria/abarrotes",
    title: "Abarrotes",
    desc: "Todo lo esencial para tu despensa: leche, cereales, conservas y más."
  },
  {
    href: "/categoria/carnes-y-pescados",
    title: "Carnes y Pescados",
    desc: "Jamón, salchichas, chorizo, cortes frescos y productos del mar."
  },
  {
    href: "/categoria/congelados",
    title: "Congelados",
    desc: "Alimentos listos para conservar: verduras, carnes y postres congelados."
  },
  {
    href: "/categoria/jamones-y-salchichoneria",
    title: "Jamones y Salchichonería",
    desc: "Selección de embutidos premium para tus recetas y antojos."
  },
  {
    href: "/categoria/lacteos-y-huevo",
    title: "Lácteos y Huevo",
    desc: "Leche, quesos, yogurt, crema y huevos frescos todos los días."
  },
  {
    href: "/categoria/pan-y-tortillas",
    title: "Pan y Tortilla",
    desc: "Pan artesanal, bollería, tortillas recién hechas y más."
  }
]


const enlacesDirectos = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

// ======================
// Componente principal
// ======================
export function MenuList() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {/* Productos */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4 p-4">
              {productos.map((item) => (
                <ListItem key={item.href} href={item.href} title={item.title}>
                  {item.desc}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Categorías */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-4 p-4 md:grid-cols-2">
              {categorias.map((cat) => (
                <ListItem key={cat.href} href={cat.href} title={cat.title}>
                  {cat.desc}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Enlaces directos */}
        {enlacesDirectos.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={link.href}>{link.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// ======================
// Componente ListItem
// ======================
function ListItem({
  title,
  children,
  href,
  ...props
}: { title: string; href: string; children: React.ReactNode }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block space-y-1 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
