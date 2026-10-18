import type { OrderFinal, Price } from '@/types/order.types.ts'
import type { Timestamp, UUIDString } from '@/api/order.api.types.ts'

export type ArchiveOrder = OrderFinal & {
  orderId: UUIDString
  date: Timestamp | null
  priceFromServer: Price
}