import { useContext } from 'react'
import { SafeModalContext } from './safe-modal-context'

/**
 * @returns `ID` of visible modal
 */
export const useVisibleModalId = () => {
  const visibleModalId = useContext(SafeModalContext)
  return visibleModalId
}
