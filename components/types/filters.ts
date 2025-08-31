export type FilterType = {
  result: string;
  loading: boolean;
  error: string | null;
}

export type FilterTypes = {
  data: {
    attributes: {
      name: any;
    };
  };
};

export type FiltrosProducto = {
  disponible?: boolean
  precioMin?: number
  precioMax?: number
  pesoMin?: number
  pesoMax?: number
  orden?: "asc" | "desc"
  nombre?: string
}

// Tipos para los filtros
export interface FiltrosState {
  precioMin: number
  precioMax: number
  marcas: string[]
  pesoMin: number | null
  pesoMax: number | null
  soloDisponibles: boolean
  soloDestacados: boolean
  ordenarPor: 'precio-asc' | 'precio-desc' | 'nombre-asc' | 'nombre-desc' | 'fecha-desc'
  disponibilidad: string[] 
  peso: string[]        
  precio: string[]
}

export interface FiltrosInfo {
  precioMinimo: number
  precioMaximo: number
  marcasDisponibles: string[]
  pesoMinimo: number | null
  pesoMaximo: number | null
}

