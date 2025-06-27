import { create } from 'zustand';
import { contactsApi } from '../../../infrastructure/api/contacts.api';
import type { Contact, CreateContactRequest, UpdateContactRequest } from '../../../infrastructure/api/types/contacts.types';

interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  fetchContacts: () => Promise<void>;
  createContact: (data: CreateContactRequest) => Promise<Contact>;
  updateContact: (id: string, data: UpdateContactRequest) => Promise<Contact>;
  deleteContact: (id: string) => Promise<void>;
  getContactById: (id: string) => Contact | undefined;
}

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: [],
  isLoading: false,
  error: null,
  fetchContacts: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const data = await contactsApi.getContacts();
      
      if (data.success) {
        set({ contacts: data.data, isLoading: false });
      } else {
        throw new Error(data.message || 'Failed to fetch contacts');
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred', isLoading: false });
    }
  },
  createContact: async (data: CreateContactRequest) => {
    try {
      set({ isLoading: true, error: null });
      
      const contact = await contactsApi.createContact(data);
      
      // Update contacts list with the new contact
      set(state => ({ 
        contacts: [...state.contacts, contact],
        isLoading: false 
      }));
      
      return contact;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred', isLoading: false });
      throw error;
    }
  },
  
  updateContact: async (id: string, data: UpdateContactRequest) => {
    try {
      set({ isLoading: true, error: null });
      
      const updatedContact = await contactsApi.updateContact(id, data);
      
      // Update contacts list with the updated contact
      set(state => ({
        contacts: state.contacts.map(contact => 
          contact._id === id ? updatedContact : contact
        ),
        isLoading: false
      }));
      
      return updatedContact;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred', isLoading: false });
      throw error;
    }
  },
  
  getContactById: (id: string) => {
    return get().contacts.find(contact => contact._id === id);
  },
  
  deleteContact: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await contactsApi.deleteContact(id);
      
      // Remove the deleted contact from the list
      set(state => ({
        contacts: state.contacts.filter(contact => contact._id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred', isLoading: false });
      throw error;
    }
  },
}));
