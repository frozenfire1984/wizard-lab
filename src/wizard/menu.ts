import type { Size, Topping } from '@/types/pizza.types'

export const SIZES: Size[] = [
  {
    id: 'S',
    title: 'Small',
    diameter: 25,
    price: 400,
  },
  {
    id: 'M',
    title: 'Medium',
    diameter: 30,
    price: 550,
  },
  {
    id: 'L',
    title: 'Large',
    diameter: 35,
    price: 700,
  },
]

export const TOPPINGS: Topping[] = [
  {
    id: 'pepperoni',
    title: 'Pepperoni',
    price: 120,
  },
  {
    id: 'mushrooms',
    title: 'Mushrooms',
    price: 80,
  },
  {
    id: 'tomato',
    title: 'Tomato',
    price: 90,
  },
  {
    id: 'sausage',
    title: 'Sausage',
    price: 150,
  },
  {
    id: 'ham',
    title: 'Ham',
    price: 200,
  },
  {
    id: 'cheese',
    title: 'Cheese',
    price: 80,
  },
]
