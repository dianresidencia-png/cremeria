import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react"
import { AllProductsFilters } from "@/app/hooks/productos/useAllProducts"
import { useState } from "react"

interface FiltersPanelProps {
  filtros: AllProductsFilters
  infoFiltros: {
    categorias: string[]
    marcas: string[]
    precioMaximo: number
    pesoMaximo: number
    totalProductos: number
  }
  onFiltroChange: (campo: keyof AllProductsFilters, valor: any) => void
  onToggleCategoria: (categoria: string) => void
  onToggleMarca: (marca: string) => void
  onLimpiarFiltros: () => void
  contadorFiltrosActivos: number
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filtros,
  infoFiltros,
  onFiltroChange,
  onToggleCategoria,
  onToggleMarca,
  onLimpiarFiltros,
  contadorFiltrosActivos
}) => {
  const [categoriasExpanded, setCategoriasExpanded] = useState(true)
  const [marcasExpanded, setMarcasExpanded] = useState(true)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
            {contadorFiltrosActivos > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {contadorFiltrosActivos}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Búsqueda */}
          <div>
            <label className="text-sm font-medium mb-2 block">Buscar productos</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nombre, marca..."
                value={filtros.busqueda}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFiltroChange('busqueda', e.target.value)}
                className="pl-10"
              />
              {filtros.busqueda && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => onFiltroChange('busqueda', '')}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Ordenamiento */}
          <div>
            <label className="text-sm font-medium mb-2 block">Ordenar por</label>
            <Select value={filtros.ordenarPor} onValueChange={(value) => onFiltroChange('ordenarPor', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nombre-asc">Nombre A-Z</SelectItem>
                <SelectItem value="nombre-desc">Nombre Z-A</SelectItem>
                <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="fecha-desc">Más Recientes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtros rápidos */}
          <div>
            <label className="text-sm font-medium mb-3 block">Filtros rápidos</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="disponibles"
                  checked={filtros.soloDisponibles}
                  onCheckedChange={(checked) => onFiltroChange('soloDisponibles', checked)}
                />
                <label htmlFor="disponibles" className="text-sm cursor-pointer">
                  Solo disponibles
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="destacados"
                  checked={filtros.soloDestacados}
                  onCheckedChange={(checked) => onFiltroChange('soloDestacados', checked)}
                />
                <label htmlFor="destacados" className="text-sm cursor-pointer">
                  Solo destacados
                </label>
              </div>
            </div>
          </div>

          {/* Rango de precios */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              Precio: ${filtros.precioMin} - ${filtros.precioMax}
            </label>
            <Slider
              value={[filtros.precioMin, filtros.precioMax]}
              onValueChange={([min, max]) => {
                onFiltroChange('precioMin', min)
                onFiltroChange('precioMax', max)
              }}
              max={infoFiltros.precioMaximo}
              min={0}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>${infoFiltros.precioMaximo}</span>
            </div>
          </div>

          {/* Rango de peso */}
          {infoFiltros.pesoMaximo > 0 && (
            <div>
              <label className="text-sm font-medium mb-3 block">
                Peso: {filtros.pesoMin}kg - {filtros.pesoMax}kg
              </label>
              <Slider
                value={[filtros.pesoMin, filtros.pesoMax]}
                onValueChange={([min, max]) => {
                  onFiltroChange('pesoMin', min)
                  onFiltroChange('pesoMax', max)
                }}
                max={infoFiltros.pesoMaximo}
                min={0}
                step={0.1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0kg</span>
                <span>{infoFiltros.pesoMaximo}kg</span>
              </div>
            </div>
          )}

          {/* Categorías */}
          {infoFiltros.categorias.length > 0 && (
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto font-medium text-sm mb-3"
                onClick={() => setCategoriasExpanded(!categoriasExpanded)}
              >
                Categorías ({filtros.categorias.length} seleccionadas)
                {categoriasExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
              
              {categoriasExpanded && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {infoFiltros.categorias.map(categoria => (
                    <div key={categoria} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`cat-${categoria}`}
                        checked={filtros.categorias.includes(categoria)}
                        onCheckedChange={() => onToggleCategoria(categoria)}
                      />
                      <label htmlFor={`cat-${categoria}`} className="text-sm cursor-pointer flex-1">
                        {categoria}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Marcas */}
          {infoFiltros.marcas.length > 0 && (
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto font-medium text-sm mb-3"
                onClick={() => setMarcasExpanded(!marcasExpanded)}
              >
                Marcas ({filtros.marcas.length} seleccionadas)
                {marcasExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
              
              {marcasExpanded && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {infoFiltros.marcas.map(marca => (
                    <div key={marca} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`marca-${marca}`}
                        checked={filtros.marcas.includes(marca)}
                        onCheckedChange={() => onToggleMarca(marca)}
                      />
                      <label htmlFor={`marca-${marca}`} className="text-sm cursor-pointer flex-1">
                        {marca}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Botón limpiar filtros */}
          {contadorFiltrosActivos > 0 && (
            <Button variant="outline" onClick={onLimpiarFiltros} className="w-full">
              <X className="w-4 h-4 mr-2" />
              Limpiar filtros ({contadorFiltrosActivos})
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default FiltersPanel