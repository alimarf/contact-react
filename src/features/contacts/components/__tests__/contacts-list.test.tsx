import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContactsList } from '../contacts-list';
import { useContactsStore } from '../../store/contacts.store';

// Mock the contacts store
jest.mock('../../store/contacts.store', () => ({
  useContactsStore: jest.fn(),
}));

// Mock the router
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('ContactsList', () => {
  const mockContacts = [
    { 
      id: '1', 
      _id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '123-456-7890',
      user: 'user123',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      __v: 0
    },
    { 
      id: '2', 
      _id: '2', 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '098-765-4321',
      user: 'user123',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      __v: 0
    },
  ];

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Default mock implementation
    (useContactsStore as unknown as jest.Mock).mockReturnValue({
      contacts: mockContacts,
      isLoading: false,
      error: null,
    });
  });

  test('renders contacts list when data is loaded', () => {
    render(<ContactsList />);
    
    // Check if contacts are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('shows loading state when data is loading', () => {
    (useContactsStore as unknown as jest.Mock).mockReturnValue({
      contacts: [],
      isLoading: true,
      error: null,
    });
    
    render(<ContactsList />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows error message when there is an error', () => {
    (useContactsStore as unknown as jest.Mock).mockReturnValue({
      contacts: [],
      isLoading: false,
      error: 'Failed to load contacts',
    });
    
    render(<ContactsList />);
    
    expect(screen.getByText(/failed to load contacts/i)).toBeInTheDocument();
  });

  test('filters contacts based on search query', () => {
    render(<ContactsList />);
    
    // Get the search input
    const searchInput = screen.getByPlaceholderText(/search contacts/i);
    
    // Type in the search input
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    // John should be visible, Jane should not
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('shows empty state when no contacts match search', () => {
    render(<ContactsList />);
    
    // Get the search input
    const searchInput = screen.getByPlaceholderText(/search contacts/i);
    
    // Type in the search input with a query that won't match any contacts
    fireEvent.change(searchInput, { target: { value: 'XYZ' } });
    
    // Empty state message should be shown
    expect(screen.getByText(/no contacts found/i)).toBeInTheDocument();
    
    // Clear search button should be available
    const clearButton = screen.getByText(/clear search/i);
    expect(clearButton).toBeInTheDocument();
    
    // Clicking clear button should reset search
    fireEvent.click(clearButton);
    
    // Both contacts should be visible again
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
