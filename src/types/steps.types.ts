import type { Component } from 'vue'

export type NonEmptyArray<T> = [T, ...T[]]

export type WizardStepName =
  | 'wizard-size'
  | 'wizard-toppings'
  | 'wizard-delivery'
  | 'wizard-confirm'

export interface WizardStep {
  name: WizardStepName,
  path: string,
  title: string,
  component: Component,
}