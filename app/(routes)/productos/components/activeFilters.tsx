import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { AllProductsFilters } from "@/app/hooks/productos/useAllProducts"

interface ActiveFiltersProps {
  filtros: AllProductsFilters
  onFiltroChange: (campo: keyof AllProductsFilters, valor: any) => void
  onToggleCategoria: (categoria: string) => void
  onToggleMarca: (marca: string) => void
  onLimpiarFiltros: () => void
  contadorFiltrosActivos: number
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filtros,
  onFiltroChange,
  onToggleCategoria,
  onToggleMarca,
  onLimpiarFiltros,
  contadorFiltrosActivos
}) => {
  if (contadorFiltrosActivos === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-muted/30 rounded-lg">
      <span className="text-sm font-medium text-muted-foreground">
        Filtros activos:
      </span>
      
      {/* Búsqueda */}
      {filtros.busqueda && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span className="text-xs">Búsqueda:</span>
          <span className="font-medium">"{filtros.busqueda}"</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onFiltroChange('busqueda', '')}
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      )}

      {/* Categorías */}
      {filtros.categorias.map(categoria => (
        <Badge key={`cat-${categoria}`} variant="default" className="flex items-center gap-1">
          <span className="text-xs">Categoría:</span>
          <span className="font-medium">{categoria}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent text-primary-foreground/80 hover:text-primary-foreground"
            onClick={() => onToggleCategoria(categoria)}
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      ))}

      {/* Marcas */}
      {filtros.marcas.map(marca => (
        <Badge key={`marca-${marca}`} variant="default" className="flex items-center gap-1">
          <span className="text-xs">Marca:</span>
          <span className="font-medium">{marca}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent text-primary-foreground/80 hover:text-primary-foreground"
            onClick={() => onToggleMarca(marca)}
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      ))}

      {/* Precio personalizado */}
      {(filtros.precioMin > 0 || filtros.precioMax < 10000) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span className="text-xs">Precio:</span>
          <span className="font-medium">${filtros.precioMin} - ${filtros.precioMax}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => {
              onFiltroChange('precioMin', 0)
              onFiltroChange('precioMax', 10000)
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      )}

      {/* Peso personalizado */}
      {(filtros.pesoMin > 0 || filtros.pesoMax < 100) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span className="text-xs">Peso:</span>
          <span className="font-medium">{filtros.pesoMin}kg - {filtros.pesoMax}kg</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => {
              onFiltroChange('pesoMin', 0)
              onFiltroChange('pesoMax', 100)
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      )}

      {/* Solo disponibles */}
      {filtros.soloDisponibles && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Solo disponibles
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onFiltroChange('soloDisponibles', false)}
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      )}

      {/* Solo destacados */}
      {filtros.soloDestacados && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Solo destacados
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onFiltroChange('soloDestacados', false)}
          >
            <X className="w-3 h-3" />
          </Button>
        </Badge>
      )}

      {/* Botón limpiar todos */}
      <Button
        variant="outline"
        size="sm"
        onClick={onLimpiarFiltros}
        className="ml-2"
      >
        <X className="w-3 h-3 mr-1" />
        Limpiar todos
      </Button>
    </div>
  )
}

export default ActiveFilters