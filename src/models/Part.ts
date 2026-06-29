import type { SwitchMount } from './SwitchMount'

export type ShapeType =
  | 'rectangle'
  | 'circle'
  | 'heart'
  | 'svg'
  | 'text'

export interface Connector {
  side: 'left' | 'right' | 'top' | 'bottom'
  type: 'tab' | 'slot' | 'none'
}

export interface Part {
  id: string
  name: string
  shape: ShapeType
  width: number
  height: number
  thickness: number
  switchMount: SwitchMount
  connectors: Connector[]
}