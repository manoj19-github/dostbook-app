import {create} from 'zustand';

interface AppStateInterface {
  isLoading: boolean;
  setIsLoading: (_loading: boolean) => void;
}

export const useAppState = create<AppStateInterface>(set => ({
  isLoading: false,
  setIsLoading: (_loading: boolean) => set({isLoading: _loading}),
}));
