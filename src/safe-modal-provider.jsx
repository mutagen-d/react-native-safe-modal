import React, { useEffect, useState } from 'react'
import { SafeModalContext } from './safe-modal-context'
import { safeModalEvents } from './safe-modal-events'
import { SafeModalList } from './safe-modal-list'

safeModalEvents.on('open-modal', (id) => {
  SafeModalList.add(id)
})
safeModalEvents.on('close-modal', (id) => {
  SafeModalList.remove(id)
})
safeModalEvents.on('close-all', () => {
  SafeModalList.removeAll()
})
/** @type {React.FC} */
export const SafeModalProvider = (props) => {
  const [visibleModalId, setVisibleModalId] = useState('')
  useEffect(() => {
    setVisibleModalId(SafeModalList.visible())
    const listeners = [
      safeModalEvents.on('open-modal', () => {
        setVisibleModalId(SafeModalList.visible())
      }),
      safeModalEvents.on('close-modal', () => {
        setVisibleModalId(SafeModalList.visible())
      }),
      safeModalEvents.on('close-all', () => {
        setVisibleModalId(SafeModalList.visible())
      }),
    ]
    return () => listeners.forEach((listener) => listener.remove())
  }, [])
  return <SafeModalContext.Provider value={visibleModalId}>{props.children}</SafeModalContext.Provider>
}
