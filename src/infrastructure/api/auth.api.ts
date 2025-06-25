import type { AuthResponse } from '../../entities/user';
import type { LoginRequest, RegisterRequest } from './types/auth.types';
import { api } from './axios';



export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
  
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_token');
    // You can also make a call to the backend to invalidate the token if needed
    // await api.post('/auth/logout');
  }
};
