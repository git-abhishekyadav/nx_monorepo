// src/app/auth/models/user.model.ts

export interface User {
  id: string;
  email: string;
  username?: string;
  password?: string;
  activationToken?: string;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastSignIn?: Date;
  firstName?: string;
  lastName?: string;
  title?: string;
  phone?: string;
  address?: string;
  apt?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  avatarUrl?: string;
  roles?: string[];
  superAdmin?: boolean;
  account?: string;       
  role: number;           
  accounts?: string[];   
}
