import { useEffect, useState, useMemo } from "react"
import { Producto } from "@/components/types/producto"

export interface AllProductsFilters {
  busqueda: string
  categorias: string[]
  marcas: string[]
  precioMin: number
  precioMax: number
  pesoMin: number
  pesoMax: number
  soloDisponibles: boolean
  soloDestacados: boolean
  ordenarPor: string
}

export function useAllProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos?populate=*`
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Estado de filtros
  const [filtros, setFiltros] = useState<AllProductsFilters>({
    busqueda: "",
    categorias: [],
    marcas: [],
    precioMin: 0,
    precioMax: 10000,
    pesoMin: 0,
    pesoMax: 100,
    soloDisponibles: false,
    soloDestacados: false,
    ordenarPor: 'nombre-asc'
  })

  // Cargar todos los productos de la API
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true)
        console.log("🔍 Cargando todos los productos...")
        
        const res = await fetch(url)
        const json = await res.json()
        
        console.log("📦 Productos totales recibidos:", json.data?.length || 0)
        
        const productosRecibidos = json.data || []
        setProductos(productosRecibidos)
        
        // Establecer rangos dinámicos basados en todos los productos
        if (productosRecibidos.length > 0) {
          const precios = productosRecibidos.map((p: Producto) => p.precio).filter((p: number) => p > 0)
          const pesos = productosRecibidos.map((p: Producto) => p.pesokg).filter(Boolean) as number[]
          
          setFiltros(prev => ({
            ...prev,
            precioMax: Math.max(...precios) || 10000,
            pesoMax: pesos.length > 0 ? Math.max(...pesos) : 100,
          }))
        }
      } catch (error: any) {
        console.error("❌ Error cargando productos:", error)
        setError(error.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    cargarProductos()
  }, [url])

  // Información disponible para filtros
  const infoFiltros = useMemo(() => {
    if (productos.length === 0) {
      return {
        categorias: [],
        marcas: [],
        precioMaximo: 10000,
        pesoMaximo: 100,
        totalProductos: 0
      }
    }

    const categorias = [...new Set(productos.map(p => p.categoria?.categoriaName).filter(Boolean))]
    const marcas = [...new Set(productos.map(p => p.marca).filter(Boolean))]
    const precios = productos.map(p => p.precio).filter(p => p > 0)
    const pesos = productos.map(p => p.pesokg).filter(Boolean) as number[]

    return {
      categorias: categorias.sort(),
      marcas: marcas.sort(),
      precioMaximo: Math.max(...precios) || 10000,
      pesoMaximo: pesos.length > 0 ? Math.max(...pesos) : 100,
      totalProductos: productos.length
    }
  }, [productos])

  // Productos filtrados y ordenados
  const productosFiltrados = useMemo(() => {
    let filtered = productos.filter(producto => {
      // Filtro de búsqueda por texto
      if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase()
        const coincide = 
          producto.productoNombre?.toLowerCase().includes(busqueda) ||
          producto.marca?.toLowerCase().includes(busqueda) ||
          producto.categoria?.categoriaName?.toLowerCase().includes(busqueda)
        if (!coincide) return false
      }

      // Filtro por categorías
      if (filtros.categorias.length > 0 && !filtros.categorias.includes(producto.categoria?.categoriaName || '')) {
        return false
      }

      // Filtro por marcas
      if (filtros.marcas.length > 0 && !filtros.marcas.includes(producto.marca || '')) {
        return false
      }

      // Filtro de precio
      if (producto.precio < filtros.precioMin || producto.precio > filtros.precioMax) {
        return false
      }

      // Filtro de peso
      if (producto.pesokg) {
        if (producto.pesokg < filtros.pesoMin || producto.pesokg > filtros.pesoMax) {
          return false
        }
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
      default:
        // Ordenamiento por defecto
        break
    }

    return filtered
  }, [productos, filtros])

  // Funciones de manejo de filtros
  const actualizarFiltro = (campo: keyof AllProductsFilters, valor: any) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }))
  }

  const toggleCategoria = (categoria: string) => {
    setFiltros(prev => ({
      ...prev,
      categorias: prev.categorias.includes(categoria)
        ? prev.categorias.filter(c => c !== categoria)
        : [...prev.categorias, categoria]
    }))
  }

  const toggleMarca = (marca: string) => {
    setFiltros(prev => ({
      ...prev,
      marcas: prev.marcas.includes(marca)
        ? prev.marcas.filter(m => m !== marca)
        : [...prev.marcas, marca]
    }))
  }

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      categorias: [],
      marcas: [],
      precioMin: 0,
      precioMax: infoFiltros.precioMaximo,
      pesoMin: 0,
      pesoMax: infoFiltros.pesoMaximo,
      soloDisponibles: false,
      soloDestacados: false,
      ordenarPor: 'nombre-asc'
    })
  }

  return {
    productos: productosFiltrados,
    todosLosProductos: productos,
    loading,
    error,
    filtros,
    infoFiltros,
    actualizarFiltro,
    toggleCategoria,
    toggleMarca,
    limpiarFiltros
  }
}