import React, { useRef, useEffect } from 'react'
import { safeModalEvents } from './safe-modal-events'
import { useVisibleModalId } from './use-visible-modal-id'

/**
 * @template K
 * @template O
 * @template T
 * @typedef {K extends keyof O ? (O[K] extends T ? K : never) : never} KeyOfType
 */

/**
 * @typedef {React.Component
 *  | React.FC
 *  | React.ComponentType
 *  | React.FunctionComponent
 *  | new (...args: any[]) => any
 * } ReactComponentType
 */

/**
 * @template T
 * @typedef {T extends React.Component<infer P>
 *  ? P
 *  : T extends React.FC<infer P>
 *  ? P
 *  : T extends React.ComponentType<infer P>
 *  ? P
 *  : T extends React.FunctionComponent<infer P>
 *  ? P
 *  : T extends new (prop: infer P) => any
 *  ? P
 *  : {}
 * } ReactComponentProps
 */

/**
 * @template T
 * @typedef {keyof ReactComponentProps<T>} ReactComponentPropsKey
 */

const generateId = () => Math.floor(Math.random() * 1e9).toString()

/**
 * @template M
 * @template V
 * @template H
 * @param {Extract<M, ReactComponentType>} Modal
 * @param {{
 *  isVisibleKey: KeyOfType<ReactComponentPropsKey<M>, ReactComponentProps<M>, boolean> | Extract<V, KeyOfType<ReactComponentPropsKey<M>, ReactComponentProps<M>, boolean>>;
 *  onModalHideKey: KeyOfType<ReactComponentPropsKey<M>, ReactComponentProps<M>, (...args: any) => any> | Extract<H, KeyOfType<ReactComponentPropsKey<M>, ReactComponentProps<M>, (...args: any) => any>>;
 * }} keys
 */
export function SafeModalFactory(Modal, keys) {
  const { isVisibleKey, onModalHideKey } = keys
  const name = Modal.name || 'Modal'
  const obj = {
    /** @type {React.FC<ReactComponentProps<M> & { name?: string }>} */
    [name]: (props) => {
      const { [isVisibleKey]: isVisible, [onModalHideKey]: onModalHide, name, ...restProps } = props
      const modalId = useRef(name || generateId()).current
      const visibleModalId = useVisibleModalId()
      useEffect(() => {
        if (isVisible) {
          safeModalEvents.emit('open-modal', modalId)
        }
        console.log({ modalId, isVisible })
      }, [isVisible])
      useEffect(() => {
        return () => safeModalEvents.emit('close-modal', modalId)
      }, [])
      return (
        <Modal
          {...Object.assign(
            {
              [isVisibleKey]: isVisible && modalId === visibleModalId,
              [onModalHideKey]: (...args) => {
                onModalHide && onModalHide(...args)
                safeModalEvents.emit('close-modal', modalId)
              },
            },
            restProps
          )}
        >
          {props.children}
        </Modal>
      )
    },
  }
  return obj[name]
}
