import type { SizeId, ToppingId } from '@/types/pizza.types.ts'
import type { DeliveryMethod } from '@/types/delivery.types.ts'

export interface OrderState {
  sizeId: SizeId | null,
  toppingIds: ToppingId[],
  deliveryMethod: DeliveryMethod,
  firstName: string,
  lastName?: string,
  phone: string,
  city?: string,
  address?: string
}