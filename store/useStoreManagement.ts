import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {storage, StorageBody} from '.';
interface UserState {
  user: any;
  token: string;
  currEmail: string;
  setUser: (_user: any) => void;
  setToken: (_token: string) => void;
  currMobile: string;
  setCurrMobile: (_currMobile: string) => void;
  setCurrEmail: (_currEmail: string) => void;
}

export const useStoreManagement = create<UserState>()(
  persist(
    (set, get) => ({
      currMobile: '',
      currEmail: '',
      setCurrEmail: (data: string) => set(() => ({currEmail: data})),
      setCurrMobile: (data: string) => set(() => ({currMobile: data})),
      user: null,
      setUser: (data: any) => set(() => ({user: data})),
      token: '',
      setToken: (data: string) => set(() => ({token: data})),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => StorageBody),
    },
  ),
);
