"use client";

import { UseGetFeaturedProduct } from "@/app/hooks/productos/useGetFeaturedProduct";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { Card, CardContent } from "./ui/card";
import { Producto } from "./types/producto";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation"; 
import { useCart } from "@/app/hooks/use-cart";

const FeaturedProducts = () => {
  const router = useRouter(); 
  const { loading, result, error } = UseGetFeaturedProduct();
  const { addItem} = useCart()

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <section className="max-w-6xl mx-auto py-6 px-4">
      <h3 className="text-xl font-semibold mb-4">Productos destacados:</h3>

      <Carousel>
        <CarouselContent className="-ml-2">
          {loading ? (
            <SkeletonSchema grid={3} />
          ) : result?.data && result.data.length > 0 ? (
            result.data
              .map((producto: Producto) => {
                if (!producto) return null;

                const { id, productoNombre, precio, imagenes, slug } = producto;

                const primeraImagen =
                  imagenes && Array.isArray(imagenes) && imagenes.length > 0
                    ? imagenes[0]
                    : null;

                const imageUrl = primeraImagen?.url;
                let fullImageUrl = "/placeholder.jpg";

                if (imageUrl) {
                  fullImageUrl = imageUrl.startsWith("http")
                    ? imageUrl
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
                }

                return (
                  <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
                    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-muted">
                      <CardContent className="relative flex flex-col items-center justify-center px-6 py-4 space-y-2">
                        <div className="w-full h-52 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <img
                            src={fullImageUrl}
                            alt={primeraImagen?.alternativeText || productoNombre || "Producto"}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.jpg";
                            }}
                          />
                        </div>

                        <div className="absolute w-full bottom-2 px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex justify-center gap-x-6">
                            <IconButton
                              onClick={() => router.push(`/producto/${slug}`)}
                              icon={<Expand size={20} />} 
                              className="text-gray-600 dark:text-gray-300"
                            />
                            <IconButton
                              onClick={() => addItem(producto)}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600 dark:text-gray-300"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <div className="flex flex-col items-center gap-3 h-20 w-full bg-white dark:bg-muted">
                        <p className="text-base font-bold text-center text-gray-900 dark:text-gray-100">
                          {productoNombre}
                        </p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          ${precio}
                        </p>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })
              .filter(Boolean)
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No hay productos destacados disponibles</p>
            </div>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
};

export default FeaturedProducts;