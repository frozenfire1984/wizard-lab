import type { SizeId, ToppingId } from '@/types/pizza.types.ts'
import type { DeliveryMethod } from '@/types/delivery.types.ts'

export type Price = number;

export interface OrderDraft {
  sizeId: SizeId | null,
  toppingIds: ToppingId[],
  deliveryMethod: DeliveryMethod,
  firstName: string,
  lastName: string,
  phone: string,
  city: string,
  address: string
}

interface OrderBase {
  sizeId: SizeId,
  toppingIds: ToppingId[],
  firstName: string,
  lastName: string,
  phone: string,
  price: Price,
}

export type OrderFinal =
  | (OrderBase & { deliveryMethod: 'pickup' })
  | (OrderBase & { deliveryMethod: 'courier'; city: string; address: string })




