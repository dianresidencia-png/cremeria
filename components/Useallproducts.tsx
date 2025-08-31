"use client"

import { useParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import FiltersControlCategoria from "@/app/(routes)/categoria/[categoriaSlug]/components/filtersControlCategoria"
import ProductCard from "@/app/(routes)/categoria/[categoriaSlug]/components/product-card"
import { useProductsByCategory } from "../app/hooks/productos/useFilteredProducts"

export default function Page() {
  const { categoriaSlug } = useParams()
  const slug = typeof categoriaSlug === "string" ? categoriaSlug : ""

  const {
    productos,
    filtros,
    filtrosInfo,
    actualizarFiltros,
    resetearFiltros,
    loading,
    error
  } = useProductsByCategory(slug)

  const categoriaNombre = typeof categoriaSlug === "string"
    ? categoriaSlug.charAt(0).toUpperCase() + categoriaSlug.slice(1)
    : "Categoría"

  return (
    <section className="max-w-6xl py-6 mx-auto sm:py-16 sm:px-24">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary uppercase">
           {categoriaNombre}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explora los productos disponibles en esta categoría
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-1/4">
          <FiltersControlCategoria
            filtros={filtros}
            filtrosInfo={filtrosInfo}
            onFiltrosChange={actualizarFiltros}
            onResetFiltros={resetearFiltros}
          />
        </div>
        
        <div className="sm:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mostrar skeletons durante la carga */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="relative p-2 transition-all duration-100 rounded-lg bg-white dark:bg-neutral-900">
                  <div className="rounded-xl w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">Error al cargar los productos: {error}</p>
            </div>
          ) : productos && productos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((producto) => (
                <ProductCard key={producto.id} product={producto} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>No se encontraron productos en esta categoría.</p>
              {filtros.marcas && filtros.marcas.length > 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Intenta ajustar los filtros de marca para ver más productos.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}