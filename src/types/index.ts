export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Contact {
  id: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}
