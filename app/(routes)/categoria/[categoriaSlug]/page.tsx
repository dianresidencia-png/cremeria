'use client'

import { useParams } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import FiltersControlCategoria from '@/app/(routes)/categoria/[categoriaSlug]/components/filtersControlCategoria'
import ProductCard from '@/app/(routes)/categoria/[categoriaSlug]/components/product-card'
import { useProductsByCategory } from '@/app/hooks/productos/useFilteredProducts'

export default function Page() {
  const { categoriaSlug } = useParams()
  const slug = typeof categoriaSlug === 'string' ? categoriaSlug : ''

  const {
    productos,
    filtros,
    filtrosInfo,
    actualizarFiltros,
    resetearFiltros,
    loading,
    error
  } = useProductsByCategory(slug)

  const categoriaNombre = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : 'Categoría'

  const recargarProductos = () => window.location.reload()

  const filtrosActivos = [
    ...filtros.marcas,
    ...filtros.disponibilidad,
    ...filtros.peso,
    ...filtros.precio
  ]

  return (
    <section className="max-w-7xl py-6 mx-auto sm:py-16 sm:px-6 lg:px-12">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary uppercase">{categoriaNombre}</h1>
        <p className="mt-2 text-muted-foreground">
          Explora los productos disponibles en esta categoría
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filtros */}
        <aside className="sm:w-1/4">
          <FiltersControlCategoria
            filtros={filtros}
            filtrosInfo={filtrosInfo}
            onFiltrosChange={actualizarFiltros}
            onResetFiltros={resetearFiltros}
          />
        </aside>

        {/* Productos */}
        <main className="sm:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="p-4 rounded-lg bg-white dark:bg-neutral-900 animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 font-semibold">Error al cargar los productos</p>
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 rounded border text-sm text-left max-w-md mx-auto">
                <strong>Detalles técnicos:</strong>
                <ul className="mt-2 list-disc list-inside">
                  <li>Slug enviado: <code>{slug}</code></li>
                  <li>Verifica que la categoría exista en la base de datos</li>
                  <li>Revisa el hook <code>useProductsByCategory</code></li>
                </ul>
              </div>
              <button
                onClick={recargarProductos}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Reintentar
              </button>
            </div>
          ) : productos && productos.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                Mostrando <strong>{productos.length}</strong> producto{productos.length !== 1 ? 's' : ''}
                {filtrosActivos.length > 0 && (
                  <> con <strong>{filtrosActivos.length}</strong> filtro{filtrosActivos.length !== 1 ? 's' : ''} activo{filtrosActivos.length !== 1 ? 's' : ''}</>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productos.map((producto) => (
                  <ProductCard key={producto.id} product={producto} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg font-medium">No se encontraron productos en esta categoría.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {filtrosActivos.length > 0
                  ? 'Intenta ajustar los filtros para ver más opciones.'
                  : 'Esta categoría no tiene productos disponibles en este momento.'}
              </p>
            </div>
          )}
        </main>
      </div>
    </section>
  )
}