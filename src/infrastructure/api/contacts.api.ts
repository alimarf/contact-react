import type { Contact, ContactsResponse, ContactResponse, CreateContactRequest, UpdateContactRequest } from './types/contacts.types';
import { api } from './axios';

export const contactsApi = {
  getContacts: async (): Promise<ContactsResponse> => {
    const response = await api.get<ContactsResponse>('/contacts');
    return response.data;
  },
  
  getContact: async (id: string): Promise<Contact> => {
    const response = await api.get<ContactResponse>(`/contacts/${id}`);
    return response.data.data;
  },
  
  createContact: async (data: CreateContactRequest): Promise<Contact> => {
    const response = await api.post<ContactResponse>('/contacts', data);
    return response.data.data;
  },
  
  updateContact: async (id: string, data: UpdateContactRequest): Promise<Contact> => {
    const response = await api.put<ContactResponse>(`/contacts/${id}`, data);
    return response.data.data;
  },
  
  deleteContact: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  }
};
