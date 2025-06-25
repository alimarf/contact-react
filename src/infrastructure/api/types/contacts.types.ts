export interface Contact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ContactsResponse {
  success: boolean;
  message: string;
  data: Contact[];
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: Contact;
}

export interface CreateContactRequest {
  name: string;
  phone: string;
  email: string;
}

export interface UpdateContactRequest {
  name?: string;
  phone?: string;
  email?: string;
}
