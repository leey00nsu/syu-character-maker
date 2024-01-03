import { StateCreator } from 'zustand';

import { User } from '@/apis/auth/auth.type';

export interface UserSlice {
  user: User;
  expiredAt: Date | null;
  setUser: (changes: User) => void;
  setExpiredAt: (changes: Date | null) => void;
}

const DEFAULT_USER: User = {
  name: '',
  email: '',
  photo: '',
};

export const createUserSlice: StateCreator<UserSlice> = set => ({
  user: DEFAULT_USER,
  expiredAt: null,
  setUser: (changes: User) => set(state => ({ user: changes })),
  setExpiredAt: (changes: Date | null) =>
    set(state => ({ expiredAt: changes })),
});
