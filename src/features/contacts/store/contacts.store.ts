import { create } from 'zustand';
import { contactsApi } from '../../../infrastructure/api/contacts.api';
import type { Contact } from '../../../infrastructure/api/types/contacts.types';

interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  fetchContacts: () => Promise<void>;
}

export const useContactsStore = create<ContactsState>((set) => ({
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
}));
