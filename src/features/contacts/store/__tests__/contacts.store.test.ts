import { act, renderHook } from '@testing-library/react';
import { useContactsStore } from '../contacts.store';

// Mock the API calls
jest.mock('../../../../infrastructure/api/contacts.api', () => ({
  getContacts: jest.fn(),
  createContact: jest.fn(),
  updateContact: jest.fn(),
  deleteContact: jest.fn(),
}));

describe('Contacts Store', () => {
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
      __v: 0,
      address: '123 Main St'
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
      __v: 0,
      address: '456 Oak Ave'
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset the store state
    act(() => {
      useContactsStore.setState({
        contacts: [],
        isLoading: false,
        error: null,
      });
    });
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useContactsStore());
    
    expect(result.current.contacts).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('fetchContacts updates state on success', async () => {
    // Mock the API response
    const contactsApi = require('../../../../infrastructure/api/contacts.api');
    (contactsApi.getContacts as jest.Mock).mockResolvedValue(mockContacts);
    
    const { result } = renderHook(() => useContactsStore());
    
    // Check loading state during fetch
    await act(async () => {
      const fetchPromise = result.current.fetchContacts();
      // Check loading state
      expect(result.current.isLoading).toBe(true);
      await fetchPromise;
    });
    
    // Check state after fetch
    expect(result.current.contacts).toEqual(mockContacts);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('fetchContacts handles errors', async () => {
    // Mock API error
    const contactsApi = require('../../../../infrastructure/api/contacts.api');
    (contactsApi.getContacts as jest.Mock).mockRejectedValue(new Error('Failed to fetch contacts'));
    
    const { result } = renderHook(() => useContactsStore());
    
    await act(async () => {
      await result.current.fetchContacts();
    });
    
    // Check state after failed fetch
    expect(result.current.contacts).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch contacts');
  });

  test('createContact adds a new contact on success', async () => {
    // Mock the API response
    const contactsApi = require('../../../../infrastructure/api/contacts.api');
    const newContact = { 
      id: '3', 
      _id: '3', 
      name: 'New User', 
      email: 'new@example.com', 
      phone: '555-555-5555',
      user: 'user123',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      __v: 0,
      address: '789 Pine St'
    };
    (contactsApi.createContact as jest.Mock).mockResolvedValue(newContact);
    
    // Set initial state with existing contacts
    act(() => {
      useContactsStore.setState({
        contacts: [...mockContacts],
        isLoading: false,
        error: null,
      });
    });
    
    const { result } = renderHook(() => useContactsStore());
    
    await act(async () => {
      await result.current.createContact({
        name: 'New User',
        email: 'new@example.com',
        phone: '555-555-5555',
        address: '789 Pine St'
      });
    });
    
    // Check if contact was added
    expect(result.current.contacts).toHaveLength(3);
    expect(result.current.contacts[2]).toEqual(newContact);
  });

  test('updateContact modifies an existing contact', async () => {
    // Mock the API response
    const contactsApi = require('../../../../infrastructure/api/contacts.api');
    const updatedContact = { id: '1', name: 'John Updated', email: 'john@example.com', phone: '123-456-7890' };
    (contactsApi.updateContact as jest.Mock).mockResolvedValue(updatedContact);
    
    // Set initial state with existing contacts
    act(() => {
      useContactsStore.setState({
        contacts: [...mockContacts],
        isLoading: false,
        error: null,
      });
    });
    
    const { result } = renderHook(() => useContactsStore());
    
    await act(async () => {
      await result.current.updateContact('1', {
        name: 'John Updated',
        email: 'john@example.com',
        phone: '123-456-7890',
      });
    });
    
    // Check if contact was updated
    expect(result.current.contacts[0].name).toBe('John Updated');
    expect(result.current.contacts).toHaveLength(2); // Same length, just updated
  });

  test('deleteContact removes a contact', async () => {
    // Mock the API response
    const contactsApi = require('../../../../infrastructure/api/contacts.api');
    (contactsApi.deleteContact as jest.Mock).mockResolvedValue({ id: '1' });
    
    // Set initial state with existing contacts
    act(() => {
      useContactsStore.setState({
        contacts: [...mockContacts],
        isLoading: false,
        error: null,
      });
    });
    
    const { result } = renderHook(() => useContactsStore());
    
    await act(async () => {
      await result.current.deleteContact('1');
    });
    
    // Check if contact was removed
    expect(result.current.contacts).toHaveLength(1);
    expect(result.current.contacts[0]._id).toBe('2'); // Only Jane remains
  });
});
