import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearToken: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      setAccessToken: (accessToken: string) => {
        if (accessToken) set({accessToken, isAuthenticated: true});
      },
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({isAuthenticated}),

      clearToken: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
        });
      },
    }),

    {
      name: 'auth-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? sessionStorage
          : {
            getItem: () => null,
            setItem: () => {
            },
            removeItem: () => {
            },
          }
      ),
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;

// ✅ Correct way to type the store context
export type AuthContext = ReturnType<typeof useAuthStore.getState>;
