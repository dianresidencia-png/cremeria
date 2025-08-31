"use client"

import { FiltrosState, FiltrosInfo } from "@/components/types/filters"
import FilterOriginRadio from "./filtersorigin"

interface FiltersControlCategoriaProps {
  filtros: FiltrosState
  filtrosInfo: FiltrosInfo
  onFiltrosChange: (nuevosFiltros: Partial<FiltrosState>) => void
  onResetFiltros: () => void
}

const FiltersControlCategoria = ({
  filtros,
  filtrosInfo,
  onFiltrosChange,
  onResetFiltros
}: FiltersControlCategoriaProps) => {
  const tienesFiltrosAplicados = filtros.marcas.length > 0

  if (!filtros || !filtrosInfo) {
    return <div className="text-sm text-red-500">No se pudieron cargar los filtros.</div>
  }

  return (
    <div className="sm:w-[250px] sm:mt-5 space-y-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Filtrar por marca</h2>
       
      </div>

      <FilterOriginRadio 
        selectedMarcas={filtros.marcas}
        onMarcasChange={(marcas) => onFiltrosChange({ marcas })}
        marcasDisponibles={filtrosInfo.marcasDisponibles}
      />

      
    </div>
  )
}

export default FiltersControlCategoria