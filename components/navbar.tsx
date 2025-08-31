"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Heart, User, BaggageClaim } from "lucide-react";
import Link from "next/link";
import { MenuList } from "./menu-list";
import Menumobile from "./iteams-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/app/hooks/use-cart";

const Navbar = () => {
  const router = useRouter();
  const cart = useCart()

  return (
    <nav className="bg-background shadow-md px-6 py-4 flex items-center justify-between border-b border-border transition-colors">
      
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
        >
          <img
            src="./logo.webp"
            alt="Logo"
            className="h-8 w-auto sm:h-10 md:h-16 max-w-[300px] rounded-2xl"
          />
        </Link>
      </div>

      {/* Menú móvil */}
      <div className="flex md:hidden">
        <Menumobile />
      </div>

      {/* Menú desktop */}
      <div className="hidden md:flex">
        <MenuList />
      </div>

      {/* Íconos */}
      <div className="flex items-center gap-4 text-foreground">
        
        <Heart
          strokeWidth={1}
          className="cursor-pointer hover:text-primary transition-colors"
          onClick={() => router.push("/favoritos")}
        />

        {
          cart.items.length == 0 ?
            <ShoppingCart
              strokeWidth={1}
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => router.push("/carrito")}
            />
            :(
              <div className="flex gap-1" onClick={() => router.push("/carrito")}>
                <BaggageClaim strokeWidth={1} className="cursor-pointer" />
                <span> {cart.items.length}</span>

              </div>
            )

        }
        <User
          strokeWidth={1}
          className="cursor-pointer hover:text-primary transition-colors"
        />
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default Navbar;
