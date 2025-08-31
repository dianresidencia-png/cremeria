"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useProductsField } from "@/app/hooks/productos/getProductsField"

interface FilterOriginRadioProps {
  selectedMarcas: string[]
  onMarcasChange: (marcas: string[]) => void
  marcasDisponibles?: string[]
}

const FilterOriginRadio = ({ 
  selectedMarcas, 
  onMarcasChange, 
  marcasDisponibles 
}: FilterOriginRadioProps) => {
  const { result, loading, error } = useProductsField("marca")

  // Usar marcas disponibles del filtro si se proporcionan, sino las de la API
  const marcas = marcasDisponibles && marcasDisponibles.length > 0 ? marcasDisponibles : result

  // Etiquetas visuales para mostrar nombres amigables
  const labels: Record<string, string> = {
    "Higienica": "Marca La Higiénica",
    "Regionales": "Productos regionales", 
    "Otras": "Otras marcas"
  }

  // Manejar cambios en la selección individual
  const handleCheckedChange = (value: string, checked: boolean) => {
    if (checked) {
      // Agregar la marca si no está ya seleccionada
      if (!selectedMarcas.includes(value)) {
        onMarcasChange([...selectedMarcas, value])
      }
    } else {
      // Remover la marca si está seleccionada
      onMarcasChange(selectedMarcas.filter(m => m !== value))
    }
  }

  // Manejar selección/deselección de todos
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Seleccionar todas las marcas disponibles
      onMarcasChange(marcas || [])
    } else {
      // Deseleccionar todas
      onMarcasChange([])
    }
  }

  // Verificar si todos están seleccionados
  const allSelected = selectedMarcas.length === (marcas?.length || 0) && (marcas?.length || 0) > 0

  return (
    <div className="my-5">
      <p className="mb-3 font-bold text-sm">
        Origen del producto
        {selectedMarcas.length > 0 && selectedMarcas.length < (marcas?.length || 0) && (
          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {selectedMarcas.length} seleccionadas
          </span>
        )}
      </p>

      {loading && <p className="text-muted-foreground">Cargando opciones...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="todos"
              checked={allSelected}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="todos" className="cursor-pointer">Todos</Label>
          </div>

          {marcas && marcas.length > 0 ? (
            marcas.map((value: string) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={value}
                  checked={selectedMarcas.includes(value)}
                  onCheckedChange={(checked) => handleCheckedChange(value, checked as boolean)}
                />
                <Label htmlFor={value} className="cursor-pointer">
                  {labels[value] ?? value}
                </Label>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              No se encontraron marcas disponibles
            </p>
          )}

          {selectedMarcas.length > 0 && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">Marcas seleccionadas:</p>
              <div className="flex flex-wrap gap-2">
                {selectedMarcas.map(marca => (
                  <span 
                    key={marca}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {labels[marca] ?? marca}
                    <button
                      onClick={() => onMarcasChange(selectedMarcas.filter(m => m !== marca))}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                      type="button"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FilterOriginRadio