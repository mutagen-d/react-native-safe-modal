## react-native-safe-modal

Safely open mutiple modals. One modal per time will be shown.

## Installation

with npm

```bash
npm install react-native-safe-modal
```

with yarn

```bash
yarn add react-native-safe-modal
```

## Usage

`react-native-safe-modal` includes `<SafeModalProvider />` component, and `SafeModalFactory()` function.

Place `<SafeModalProvider />` on top of components. Create `<SafeModal />` by `SafeModalFactory()`

```js
import Modal from 'react-native-modal'
import { SafeModalProvider, SafeModalFactory } from 'react-native-safe-modal'

const SafeModal = SafeModalFactory(Modal, { isVisibleKey: 'isVisible', onModalHideKey: 'onModalHide' })

const App = () => {
  return (
    <SafeModalProvider>
      <SomeComponents>
        <SafeModal isVisible />
        <SafeModal isVisible />
      </SomeComponents>
    </SafeModalProvider>
  )
}
```
