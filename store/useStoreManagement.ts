import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {storage, StorageBody} from '.';
interface UserState {
  user: any;
  token: string;
  setUser: (_user: any) => void;
  setToken: (_token: string) => void;
}

export const useStoreManagement = create<UserState>()(
  persist(
    (set, get) => ({
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
