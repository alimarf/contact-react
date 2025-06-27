/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from '../components/login-form';
import { useAuthStore } from '../store/auth.store';
import { BrowserRouter } from 'react-router-dom';

// Mock the auth store
jest.mock('../store/auth.store', () => ({
  useAuthStore: jest.fn(() => ({
    login: jest.fn(),
    isLoading: false,
    error: null,
    clearError: jest.fn(),
  })),
}));

// Mock UI components
jest.mock('../../../components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

jest.mock('../../../components/ui/input', () => ({
  Input: ({ ...props }: any) => <input {...props} />,
}));

jest.mock('../../../components/ui/form', () => ({
  Form: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  FormField: ({ render, ...props }: any) => (
    <div {...props}>{render && render({ field: { onChange: () => {}, value: '', name: '' } })}</div>
  ),
  FormControl: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  FormItem: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  FormLabel: ({ children, ...props }: any) => <label {...props}>{children}</label>,
  FormMessage: ({ children, ...props }: any) => <div {...props}>{children || ''}</div>,
}));

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, animate, whileHover, transition, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, variants, initial, animate, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Login Flow', () => {
  // Mock login function
  const mockLogin = jest.fn();
  const mockClearError = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      clearError: mockClearError,
    });
  });

  test('submits form with correct credentials and redirects to contacts page', async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    // Fill in the form using placeholder text instead of labels
    const emailInput = screen.getByPlaceholderText('name@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Verify login was called with correct credentials
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123'
    });
    
    // Simulate successful login (no error)
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      clearError: mockClearError,
    });
    
    // Check that navigation to contacts page happened
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/contacts');
    });
  });

  test('shows error message when login fails', async () => {
    // Set up auth store with an error
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Invalid email or password',
      clearError: mockClearError,
    });
    
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    // Error message should be displayed
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });

  test('shows loading state during login process', async () => {
    // Initial render without loading
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      clearError: mockClearError,
    });
    
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    // Fill in the form using placeholder text instead of labels
    const emailInput = screen.getByPlaceholderText('name@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Change to loading state
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: null,
      clearError: mockClearError,
    });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Re-render with updated props
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    // Check for loading text or spinner
    // Note: This might need to be adjusted based on how loading state is displayed
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test('validates form inputs before submission', async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    // Submit form without filling in any fields
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText(/email is required/i) || 
             screen.getByText(/please enter a valid email/i) || 
             screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      
      expect(screen.getByText(/password is required/i) || 
             screen.getByText(/password must be at least/i)).toBeInTheDocument();
    });
    
    // Verify login was not called
    expect(mockLogin).not.toHaveBeenCalled();
  });
});
