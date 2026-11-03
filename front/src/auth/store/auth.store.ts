import { loginAction } from '@/auth/actions/login.action';
import type { User } from '@/interfaces/user.interace';
import { toast } from 'sonner';
import { create } from 'zustand';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
  // Props
  authStatus: AuthStatus;
  user: User | null;
  token: string | null;

  // Getters
  isAdmin: boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  // Implementar el store
  user: null,
  token: null,
  authStatus: 'checking',
  isAdmin: false,

  // Actions
  login: async (email: string, password: string) => {
    console.log({ email, password });
    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token });
      if (data.user.roles.map((r) => r === 'admin'))
        set({isAdmin: true})

      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAdmin: false });
      toast.error('error', error);

      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAdmin: false });
  }
}))
