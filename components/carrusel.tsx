"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const mensajes = [
  { id: 1, text: "❗ Envío gratis en compras mayores a $299 🤩❗        ZMG 🛒 Haz tu súper sin salir de casa 🛒", link: "/promociones" },
  { id: 2, text: "💳 Paga en línea de forma segura", link: "/pagos" },
  { id: 3, text: "📦 Entregas rápidas en toda la ZMG", link: "/entregas" },
];

export default function CardCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false })
  );

  return (
    <div className="w-full bg-blue-500 text-white text-2xl dark:bg-amber-200 dark:text-back font-bold">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="h-10">
          {mensajes.map((item) => (
            <CarouselItem
              key={item.id}
              className="flex items-center justify-center px-4 cursor-pointer"
              onClick={() => item.link && window.location.assign(item.link)}
            >
              <span className="whitespace-nowrap">{item.text}</span>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
