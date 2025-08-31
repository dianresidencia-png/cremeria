"use client"

import { useGetCategories } from "@/app/hooks/productos/getCategorias"
import Link from "next/link"
import { CategoryType } from "./types/categoria" 

const ChooseCategory = () => {
  const { result, loading } = useGetCategories()

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">Elige tu categoría favorita</h3>

      <div className="grid gap-5 md:grid-cols-3">
        {!loading &&
          result?.map((categoria: CategoryType) => {
            const imagenUrl =
              categoria.imagen?.formats?.medium?.url || categoria.imagen?.url

            return (
              <Link
                key={categoria.id}
                href={`/categoria/${categoria.slug}`}
                className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat rounded-lg shadow-md hover:scale-105 transition"
              >
                {imagenUrl && (
                  <img
                    src={`${imagenUrl}`}
                    alt={categoria.categoriaName}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="absolute bottom-2 left-0 right-0 backdrop-blur-lg text-white p-2 text-center">
                  {categoria.categoriaName}
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default ChooseCategory
