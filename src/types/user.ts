import { Access } from "./access"

export type CreateUserParams = {
  avatarUrl: File | null
  name: string
  email: string
  password: string
}

export type User = {
  id: string;
  avatarUrl?: string | null;
  name: string;
  email: string;
  accessToken: string;
  role: 'USER' | 'ADMIN'
}

export type UserDetail = User & {
  accesses: Access[];
};