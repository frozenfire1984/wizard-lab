import type { RouteRecordInfo } from 'vue-router'

// prettier-ignore
export interface AppRouteMap {
  'home': RouteRecordInfo<'home', '/', Record<never, never>, Record<never, never>>,
  'wizard': RouteRecordInfo<'wizard', '/wizard', Record<never, never>, Record<never, never>>,
  'wizard-size': RouteRecordInfo<'wizard-size', '/wizard/size', Record<never, never>, Record<never, never>>,
  'wizard-toppings': RouteRecordInfo<'wizard-toppings', '/wizard/toppings', Record<never, never>, Record<never, never>>,
  'wizard-delivery': RouteRecordInfo<'wizard-delivery', '/wizard/delivery', Record<never, never>, Record<never, never>>,
  'wizard-confirm': RouteRecordInfo<'wizard-confirm', '/wizard/confirm', Record<never, never>, Record<never, never>>,
  'archive': RouteRecordInfo<'archive', '/archive', Record<never, never>, Record<never, never>>,
}

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: AppRouteMap
  }

  interface RouteMeta {
    step?: number
    title?: string
  }
}