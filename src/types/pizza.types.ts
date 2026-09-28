export type SizeId = 'S' | 'M' | 'L'

export interface Size {
  id: SizeId
  title: string
  diameter: number
  price: number
}

export type ToppingId = string

export interface Topping {
  id: ToppingId
  title: string
  price: number
}
