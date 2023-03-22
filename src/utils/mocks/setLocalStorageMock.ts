import { EnumLocalStorageKeys } from '../../enums/localStorageEnum'

export const setLocalStorageMock = () => {
  class LocalStorageMock {
    store: Record<string, string> = {}

    clear() {
      this.store = {}
    }

    setItem(key: EnumLocalStorageKeys, value: string) {
      this.store[key] = value
    }

    getItem(key: EnumLocalStorageKeys) {
      return this.store[key] || null
    }

    removeItem(key: EnumLocalStorageKeys) {
      delete this.store[key]
    }
  }

  Object.defineProperty(window, 'localStorage', {
    value: new LocalStorageMock(),
  })
}
