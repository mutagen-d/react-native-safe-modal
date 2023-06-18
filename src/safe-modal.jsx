import Modal from 'react-native-modal'
import { SafeModalFactory } from './safe-modal-factory'

export const SafeModal = SafeModalFactory(Modal, { isVisibleKey: 'isVisible', onModalHideKey: 'onModalHide' })
