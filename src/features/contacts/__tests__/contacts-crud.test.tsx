import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContactsPage } from '../pages/contacts-page';
import { useContactsStore } from '../store/contacts.store';
import { useAuthStore } from '../../auth/store/auth.store';
import type { Contact } from '../../../types';

// Mock the stores
jest.mock('../store/contacts.store', () => ({
  useContactsStore: jest.fn(),
}));

jest.mock('../../auth/store/auth.store', () => ({
  useAuthStore: jest.fn(),
}));

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => <div>{element}</div>,
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  },
}));

// Mock the AlertDialog component
jest.mock('../../../components/ui/alert-dialog', () => ({
  AlertDialog: ({ children, open }: { children: React.ReactNode; open: boolean }) => (
    <div data-testid="alert-dialog" data-open={open}>
      {children}
    </div>
  ),
  AlertDialogContent: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-content">{children}</div>,
  AlertDialogHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-header">{children}</div>,
  AlertDialogFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-footer">{children}</div>,
  AlertDialogTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-title">{children}</div>,
  AlertDialogDescription: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-dialog-description">{children}</div>,
  AlertDialogCancel: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <button data-testid="alert-dialog-cancel" {...props}>
      {children}
    </button>
  ),
  AlertDialogAction: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <button data-testid="alert-dialog-action" {...props}>
      {children}
    </button>
  ),
}));

describe('Contacts CRUD Flow', () => {
  // Mock contacts and functions
  const mockContacts = [
    { id: '1', _id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', user: 'user1', createdAt: '2023-01-01', updatedAt: '2023-01-01', __v: 0 },
    { id: '2', _id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', user: 'user1', createdAt: '2023-01-01', updatedAt: '2023-01-01', __v: 0 },
  ] as Contact[];
  
  const mockCreateContact = jest.fn();
  const mockDeleteContact = jest.fn();
  const mockUpdateContact = jest.fn();
  const mockFetchContacts = jest.fn();
  const mockLogout = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for contacts store
    (useContactsStore as unknown as jest.Mock).mockReturnValue({
      contacts: mockContacts,
      isLoading: false,
      error: null,
      createContact: mockCreateContact,
      deleteContact: mockDeleteContact,
      updateContact: mockUpdateContact,
      fetchContacts: mockFetchContacts,
    });
    
    // Default mock implementation for auth store
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { id: 'user1', name: 'Test User', email: 'test@example.com' },
      isAuthenticated: true,
      logout: mockLogout,
    });
  });

  test('displays contacts list and allows searching', () => {
    render(
      <BrowserRouter>
        <ContactsPage />
      </BrowserRouter>
    );
    
    // Check if contacts are rendered
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Jane Smith')).toBeTruthy();
    
    // Test search functionality
    const searchInput = screen.getByPlaceholderText(/search contacts/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    // Only John should be visible now
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.queryByText('Jane Smith')).toBeNull();
  });

  test('deletes a contact with confirmation', async () => {
    render(
      <BrowserRouter>
        <ContactsPage />
      </BrowserRouter>
    );
    
    // Find and click the delete button on John's card
    const deleteButtons = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButtons[0]);
    
    // Confirm deletion
    const confirmButton = screen.getByTestId('alert-dialog-action');
    fireEvent.click(confirmButton);
    
    // Check if deleteContact was called with the correct ID
    await waitFor(() => {
      expect(mockDeleteContact).toHaveBeenCalledWith('1');
    });
  });

  test('navigates to create contact page', () => {
    render(
      <BrowserRouter>
        <ContactsPage />
      </BrowserRouter>
    );
    
    // Find and click the add contact button
    const addButton = screen.getByText(/add contact/i);
    fireEvent.click(addButton);
    
    // Check if navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith('/contacts/create');
  });

  test('logs out with confirmation', async () => {
    render(
      <BrowserRouter>
        <ContactsPage />
      </BrowserRouter>
    );
    
    // Find and click the logout button
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    
    // Confirm logout
    const confirmButton = screen.getByTestId('alert-dialog-action');
    fireEvent.click(confirmButton);
    
    // Check if logout was called and navigation occurred
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
