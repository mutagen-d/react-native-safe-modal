import React from 'react'

export declare const SafeModalContext: React.Context<string>

export declare const SafeModalProvider: React.FC<any>

export type KeyOfType<K, O, T> = K extends keyof O ? (O[K] extends T ? K : never) : never

export type ReactComponentType = React.Component | React.FC | React.ComponentType | React.FunctionComponent | (new (...args: any[]) => any)

export type ReactComponentProps<T> = T extends React.Component<infer P>
  ? P
  : T extends React.FC<infer P>
  ? P
  : T extends React.ComponentType<infer P>
  ? P
  : T extends React.FunctionComponent<infer P>
  ? P
  : T extends new (prop: infer P) => any
  ? P
  : {}

export type ReactComponentPropsKey<T> = keyof ReactComponentProps<T>

type BooleanKeys<T> = KeyOfType<ReactComponentPropsKey<T>, ReactComponentProps<T>, boolean>
type CallbackKeys<T> = KeyOfType<ReactComponentPropsKey<T>, ReactComponentProps<T>, (...args: any) => any>

export declare const SafeModalFactory: <M extends ReactComponentType, V extends BooleanKeys<M>, H extends CallbackKeys<M>>(
  Modal: M,
  keys: {
    isVisibleKey: V
    onModalHideKey: H
  }
) => React.FC<Partial<ReactComponentProps<M>> & { name?: string }>

type EventName = 'open-modal' | 'close-modal' | 'close-all'
type EventListener<T extends string> = T extends 'open-modal' | 'close-modal' ? (id: string) => any : (...args: any[]) => any

export declare class SafeModalEvents {
  emit<T extends EventName>(event: T, ...args: Parameters<EventListener<T>>): void
  on<T extends EventName>(event: T, listener: EventListener<T>): { remove: () => void }
  off<T extends EventName>(event: T, listener: EventListener<T>): void
}

export declare const useVisibleModalId: () => string
