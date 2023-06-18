export const SafeModalList = {
  /** @type {string[]} */
  list: [],
  visible: () => {
    return SafeModalList.list[0]
  },
  add: (id) => {
    if (!SafeModalList.list.includes(id)) {
      SafeModalList.list.push(id)
    }
  },
  remove: (id) => {
    const index = SafeModalList.list.indexOf(id)
    if (index !== -1) {
      SafeModalList.list.splice(index, 1)
    }
  },
  removeAll: () => {
    SafeModalList.list.length = 0
  },
}
