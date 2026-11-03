import { checkoutAuthAction } from '@/auth/actions/check-auth.actions';
import { loginAction } from '@/auth/actions/login.action';
import { registerAction } from '@/auth/actions/register.action';
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
  isAdmin: () => boolean;

  // Actions
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  // Implementar el store
  user: null,
  token: null,
  authStatus: 'checking' as AuthStatus,

  // Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes('admin');
    // return !!get().user?.roles.includes('admin');
  },

  // Actions
  register: async (fullName: string, email: string, password: string) => {
    console.log({ fullName, email, password });
    try {
      await registerAction(fullName, email, password);
      return await get().login(email, password );
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus:'not-authenticated'});
      toast.error('error', error);

      return false;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, authStatus: 'authenticated' });

      return true;
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus:'not-authenticated'});
      toast.error('error', error);

      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus:'not-authenticated'});
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkoutAuthAction();
      set({user: user, token: token, authStatus:'authenticated'});
      return true;
    } catch (error) {
      console.log(error)
      set({ user: null, token: null, authStatus:'not-authenticated'});
    }
    return false;
  }
}))
