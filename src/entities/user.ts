export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthToken {
  token: string;
  expiresAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}
