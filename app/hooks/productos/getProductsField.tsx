import { useEffect, useState } from "react"
import { Producto } from "@/components/types/producto"

export function useProductsField(fieldName: keyof Producto): {
  loading: boolean
  result: string[]
  error: string | null
} {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos?populate=*`
  const [result, setResult] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        
        const productos: Producto[] = json.data

        const valoresUnicos = Array.from(
          new Set(
            productos
              .map((prod) => prod[fieldName])
              .filter((val) => val !== null && val !== undefined)
          )
        ).map((val) => String(val))

        setResult(valoresUnicos)
      } catch (error: any) {
        setError(error.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    })()
  }, [fieldName, url])

  return { loading, result, error }
}