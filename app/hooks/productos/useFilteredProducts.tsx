import { useEffect, useState, useMemo } from "react"
import { Producto } from "@/components/types/producto"
import { FiltrosState, FiltrosInfo } from "@/components/types/filters"

export function useProductsByCategory(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos?populate=*&filter[categoria][slug][$eq]=${slug}`
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [filtros, setFiltros] = useState<FiltrosState>({
  precioMin: 0,
  precioMax: 10000,
  marcas: [],
  pesoMin: null,
  pesoMax: null,
  soloDisponibles: false,
  soloDestacados: false,
  ordenarPor: 'nombre-asc',
  disponibilidad: [],
  peso: [],
  precio: []
})


  // Cargar productos de la API
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        console.log("🔍 Consultando URL:", url)
        
        const res = await fetch(url)
        const json = await res.json()
        
        console.log("📦 Respuesta completa de API:", json)
        console.log("📊 Productos recibidos:", json.data?.length || 0)
        
        // FILTRO DE SEGURIDAD: Solo productos de la categoría correcta
        const productosOriginales = json.data || []
        const productosFiltradosPorCategoria = productosOriginales.filter((producto: Producto) => {
          const categoriaSlug = producto.categoria?.slug || producto.categoria?.slug
          const coincide = categoriaSlug === slug
          
          if (!coincide) {
            console.warn(`⚠️ Producto filtrado - Esperado: "${slug}", Recibido: "${categoriaSlug}"`, {
              id: producto.id,
              nombre: producto.productoNombre || producto.productoNombre,
              categoria: categoriaSlug
            })
          }
          
          return coincide
        })
        
        console.log("✅ Productos después del filtro:", productosFiltradosPorCategoria.length)
        
        setProductos(productosFiltradosPorCategoria)
        
        // Actualizar rangos de filtros basados en los productos cargados
        if (productosFiltradosPorCategoria.length > 0) {
          const precios = productosFiltradosPorCategoria.map((p: Producto) => p.precio)
          const pesos = productosFiltradosPorCategoria.map((p: Producto) => p.pesokg).filter(Boolean)
          
          setFiltros(prev => ({
            ...prev,
            precioMin: Math.min(...precios),
            precioMax: Math.max(...precios),
            pesoMin: pesos.length > 0 ? Math.min(...pesos) : null,
            pesoMax: pesos.length > 0 ? Math.max(...pesos) : null,
          }))
        }
      } catch (error: any) {
        console.error("❌ Error en useProductsByCategory:", error)
        setError(error.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    })()
  }, [url, slug]) // Agregué slug como dependencia

  // Información de filtros disponibles
  const filtrosInfo: FiltrosInfo = useMemo(() => {
    if (productos.length === 0) {
      return {
        precioMinimo: 0,
        precioMaximo: 10000,
        marcasDisponibles: [],
        pesoMinimo: null,
        pesoMaximo: null
      }
    }

    const precios = productos.map(p => p.precio)
    const pesos = productos.map(p => p.pesokg).filter(Boolean) as number[]
    const marcas = [...new Set(productos.map(p => p.marca).filter(Boolean))]

    return {
      precioMinimo: Math.min(...precios),
      precioMaximo: Math.max(...precios),
      marcasDisponibles: marcas,
      pesoMinimo: pesos.length > 0 ? Math.min(...pesos) : null,
      pesoMaximo: pesos.length > 0 ? Math.max(...pesos) : null
    }
  }, [productos])

  // Productos filtrados y ordenados
  const productosFiltrados = useMemo(() => {
    let filtered = productos.filter(producto => {
      // Filtro de precio
      if (producto.precio < filtros.precioMin || producto.precio > filtros.precioMax) {
        return false
      }

      // Filtro de marcas
      if (filtros.marcas.length > 0 && !filtros.marcas.includes(producto.marca)) {
        return false
      }

      // Filtro de peso
      if (filtros.pesoMin && producto.pesokg && producto.pesokg < filtros.pesoMin) {
        return false
      }
      if (filtros.pesoMax && producto.pesokg && producto.pesokg > filtros.pesoMax) {
        return false
      }

      // Filtros booleanos
      if (filtros.soloDisponibles && !producto.disponible) {
        return false
      }
      if (filtros.soloDestacados && !producto.destacado) {
        return false
      }

      return true
    })

    // Ordenamiento
    switch (filtros.ordenarPor) {
      case 'precio-asc':
        filtered.sort((a, b) => a.precio - b.precio)
        break
      case 'precio-desc':
        filtered.sort((a, b) => b.precio - a.precio)
        break
      case 'nombre-asc':
        filtered.sort((a, b) => a.productoNombre.localeCompare(b.productoNombre))
        break
      case 'nombre-desc':
        filtered.sort((a, b) => b.productoNombre.localeCompare(a.productoNombre))
        break
      case 'fecha-desc':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return filtered
  }, [productos, filtros])

  // Función para actualizar filtros
  const actualizarFiltros = (nuevosFiltros: Partial<FiltrosState>) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }))
  }

  // Función para resetear filtros
  const resetearFiltros = () => {
    setFiltros({
  precioMin: filtrosInfo.precioMinimo,
  precioMax: filtrosInfo.precioMaximo,
  marcas: [],
  pesoMin: filtrosInfo.pesoMinimo,
  pesoMax: filtrosInfo.pesoMaximo,
  soloDisponibles: false,
  soloDestacados: false,
  ordenarPor: 'nombre-asc',
  disponibilidad: [],
  peso: [],
  precio: []
    })
  }

  return {
    productos: productosFiltrados,
    todosLosProductos: productos, 
    loading,
    error,
    filtros,
    filtrosInfo,
    actualizarFiltros,
    resetearFiltros
  }
}

// Hook simplificado para mantener compatibilidad con código existente
export function GetCategoriaProductos(slug: string) {
  const { todosLosProductos, loading, error } = useProductsByCategory(slug)
  
  return { 
    result: todosLosProductos, 
    loading, 
    error 
  }
}