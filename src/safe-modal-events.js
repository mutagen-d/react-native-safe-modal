/**
 * @typedef {'open-modal' | 'close-modal' | 'close-all'} EventName
 */
/**
 * @template T
 * @typedef {T extends 'open-modal' | 'close-modal' ? (id: string) => any : (...args: any[]) => any} EventListener
 */

export class SafeModalEvents {
  constructor() {
    /** @type {Record<string, Array<(...args: any[]) => any>} */
    this.listeners = {}
  }
  /**
   * @template T
   * @param {EventName | Extract<T, EventName>} event
   * @param {Parameters<EventListener<T>>} args
   */
  emit(event, ...args) {
    const listeners = this.listeners[event]
    if (!Array.isArray(listeners) || !listeners.length) {
      return
    }
    listeners.forEach((callback) => {
      callback(...args)
    })
  }
  /**
   * @template T
   * @param {EventName | Extract<T, EventName>} event
   * @param {EventListener<T>} callback
   */
  on(event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)
    return { remove: () => this.off(event, callback) }
  }
  /**
   * @template T
   * @param {EventName | Extract<T, EventName>} event
   * @param {EventListener<T>} callback
   */
  off(event, callback) {
    const listeners = this.listeners[event]
    if (!Array.isArray(listeners)) {
      return
    }
    const index = listeners.indexOf(callback)
    if (index < 0) {
      return
    }
    listeners.splice(index, 1)
    if (!listeners.length) {
      delete this.listeners[event]
    }
  }
}

export const safeModalEvents = new SafeModalEvents()
