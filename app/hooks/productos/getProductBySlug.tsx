import { useEffect, useState } from "react"
import { Producto } from "@/components/types/producto"

export function useGetProductBySlug(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos?filters[slug][$eq]=${slug}&populate=*`

  const [result, setResult] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        const productos: Producto[] = json.data
        setResult(productos)
      } catch (error: any) {
        setError(error.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    })()
  }, [slug])

  return { result, loading, error }
}
