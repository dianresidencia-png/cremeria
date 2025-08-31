export interface CategoryType {
  id: number
  categoriaName: string
  slug: string
  descripcion: string
  destacada: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  imagen?: {
    id: number
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    url: string
    formats?: {
      thumbnail?: {
        url: string
        width: number
        height: number
        size: number
      }
      small?: {
        url: string
        width: number
        height: number
        size: number
      }
      medium?: {
        url: string
        width: number
        height: number
        size: number
      }
      large?: {
        url: string
        width: number
        height: number
        size: number
      }
    }
  }
}
