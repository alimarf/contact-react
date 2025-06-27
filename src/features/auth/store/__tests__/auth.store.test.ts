import { act, renderHook } from '@testing-library/react';
import { useAuthStore } from '../auth.store';
import type { User } from '../../../../types';

// Mock the auth API
jest.mock('../../../../infrastructure/api/auth.api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  }
}));

// Import the mocked API for direct access in tests
import { authApi } from '../../../../infrastructure/api/auth.api';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Auth Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
    
    // Reset the store state
    act(() => {
      useAuthStore.setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    });
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useAuthStore());
    
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('login updates state on success', async () => {
    // Mock the API response
    (authApi.login as jest.Mock).mockResolvedValue({
      user: { id: 'user1', name: 'Test User', email: 'test@example.com' },
      token: 'test-token',
    });
    
    const { result } = renderHook(() => useAuthStore());
    
    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });
    
    // Check state after login
    expect(result.current.user).toEqual({ id: 'user1', name: 'Test User', email: 'test@example.com' });
    expect(result.current.token).toBe('test-token');
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    
    // Check localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ id: 'user1', name: 'Test User', email: 'test@example.com' })
    );
  });

  test('login handles errors', async () => {
    // Mock API error
    (authApi.login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));
    
    const { result } = renderHook(() => useAuthStore());
    
    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'wrong-password' });
    });
    
    // Check state after failed login
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Invalid credentials');
  });

  test('logout clears state and localStorage', async () => {
    // Set initial authenticated state
    act(() => {
      useAuthStore.setState({
        user: { id: 'user1', name: 'Test User', email: 'test@example.com' } as User,
        token: 'test-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    });
    
    // Mock API response
    (authApi.logout as jest.Mock).mockResolvedValue({});
    
    const { result } = renderHook(() => useAuthStore());
    
    await act(async () => {
      await result.current.logout();
    });
    
    // Check state after logout
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    
    // Check localStorage
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
  });

  test('clearError resets error state', () => {
    // Set initial state with error
    act(() => {
      useAuthStore.setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Some error',
      });
    });
    
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.clearError();
    });
    
    // Check error is cleared
    expect(result.current.error).toBeNull();
  });
});
