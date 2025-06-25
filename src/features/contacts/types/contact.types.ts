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
