import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../../../entities/user';
import { authApi } from '../../../infrastructure/api/auth.api';
import type { LoginRequest, RegisterRequest } from '../../../infrastructure/api/types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authApi.login(credentials);
          
          if (response.success) {
            localStorage.setItem('auth_token', response.data.token);
            set({ 
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ 
              error: response.message || 'Login failed',
              isLoading: false,
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
        }
      },
      
      register: async (userData) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authApi.register(userData);
          
          if (response.success) {
            localStorage.setItem('auth_token', response.data.token);
            set({ 
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ 
              error: response.message || 'Registration failed',
              isLoading: false,
            });
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
        }
      },
      
      logout: async () => {
        try {
          await authApi.logout();
          set({ 
            user: null,
            token: null,
            isAuthenticated: false,
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Logout failed',
          });
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
