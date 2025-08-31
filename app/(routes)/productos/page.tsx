"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/app/(routes)/categoria/[categoriaSlug]/components/product-card"
import FiltersPanel from "./components/FiltersPanel"
import ActiveFilters from "./components/activeFilters"
import { useAllProducts } from "@/app/hooks/productos/useAllProducts"
import { Filter, Grid3X3, List } from "lucide-react"

export default function ProductosPage() {
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [vistaGrid, setVistaGrid] = useState(true)

  const {
    productos,
    loading,
    error,
    filtros,
    infoFiltros,
    actualizarFiltro,
    toggleCategoria,
    toggleMarca,
    limpiarFiltros
  } = useAllProducts()

  // Contador de filtros activos
  const contadorFiltrosActivos =
    filtros.categorias.length +
    filtros.marcas.length +
    (filtros.soloDisponibles ? 1 : 0) +
    (filtros.soloDestacados ? 1 : 0) +
    (filtros.busqueda ? 1 : 0) +
    (filtros.precioMin > 0 || filtros.precioMax < infoFiltros.precioMaximo ? 1 : 0) +
    (filtros.pesoMin > 0 || filtros.pesoMax < infoFiltros.pesoMaximo ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Todos los Productos</h1>
              <p className="text-muted-foreground mt-1">
                Descubre nuestra selección completa de {infoFiltros.totalProductos} productos
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={mostrarFiltros ? "default" : "outline"}
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtros
                {contadorFiltrosActivos > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {contadorFiltrosActivos}
                  </Badge>
                )}
              </Button>

              <div className="flex items-center border rounded-lg">
                <Button
                  variant={vistaGrid ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setVistaGrid(true)}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={!vistaGrid ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setVistaGrid(false)}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Panel de Filtros */}
          <div className={`lg:w-80 ${mostrarFiltros ? "block" : "hidden lg:block"}`}>
            <FiltersPanel
              filtros={filtros}
              infoFiltros={{
                ...infoFiltros,
                categorias: infoFiltros.categorias.filter((c): c is string => typeof c === "string")
              }}
              onFiltroChange={actualizarFiltro}
              onToggleCategoria={toggleCategoria}
              onToggleMarca={toggleMarca}
              onLimpiarFiltros={limpiarFiltros}
              contadorFiltrosActivos={contadorFiltrosActivos}
            />
          </div>

          {/* Contenido Principal */}
          <div className="flex-1">
            <ActiveFilters
              filtros={filtros}
              onFiltroChange={actualizarFiltro}
              onToggleCategoria={toggleCategoria}
              onToggleMarca={toggleMarca}
              onLimpiarFiltros={limpiarFiltros}
              contadorFiltrosActivos={contadorFiltrosActivos}
            />

            <div
              className={`grid ${
                vistaGrid
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              } gap-6`}
            >
              {loading && <p className="text-muted-foreground">Cargando productos...</p>}
              {error && <p className="text-destructive">Error al cargar productos.</p>}
              {!loading && productos.length === 0 && (
                <p className="text-muted-foreground">
                  No se encontraron productos con los filtros seleccionados.
                </p>
              )}
              {!loading &&
                productos.map((producto, index) => (
                  <ProductCard key={index} product={producto} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
