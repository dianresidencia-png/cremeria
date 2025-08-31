import { useEffect, useState } from "react"
import { Producto } from "@/components/types/producto"

export function GetCategoriaProductos(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos?populate=*&filters[categoria][slug][$eq]=${slug}`
  const [result, setResult] = useState<Producto[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data)
      } catch (error: any) {
        setError(error.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}
