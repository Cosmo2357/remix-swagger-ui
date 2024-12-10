import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
//import type {} from '@redux-devtools/extension' // required for devtools typing

interface BearState {
  bears: number
  increase: (by: number) => void
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      {
        name: 'bear-storage',
      },
    ),
  ),
)

interface PersistStore {
  googleAccessToken: string
}
export const usePersistStore = create<PersistStore>()(
  devtools(
    persist(
      (set) => ({
        googleAccessToken: 'ya29a0AfH6SMBJ1Q',
      }),
      {
        name: 'local-storage',
      },
    ),
  ),
)
interface mainStore {
  isLoggedIn: boolean

}
export const useMainStore = create<mainStore>()(
  devtools(
      (set) => ({
        isLoggedIn: false,

      })
  ),
)