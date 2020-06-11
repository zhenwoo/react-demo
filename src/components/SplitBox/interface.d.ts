import { ReactNodeArray, ReactNode } from "react"

export interface IState {
  x: number
  y: number
}
export interface IProps {
  model: 'h' | 'v'
  width?: number,
  children: Array<ReactNode>
}