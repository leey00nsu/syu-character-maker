import { StateCreator, create } from 'zustand';

import { User } from '@/apis/auth/auth.type';

interface AuthSlice {
  isAuth: boolean;
  setAuth: (changes: boolean) => void;
}

const createAuthSlice: StateCreator<AuthSlice> = set => ({
  isAuth: false,
  setAuth: (changes: boolean) => set(state => ({ isAuth: changes })),
});

interface UserSlice {
  user: Pick<User, 'name' | 'email' | 'photo'>;
  setUser: (changes: Pick<User, 'name' | 'email' | 'photo'>) => void;
}

const DEFAULT_USER: Pick<User, 'name' | 'email' | 'photo'> = {
  name: '',
  email: '',
  photo: '',
};

const createUserSlice: StateCreator<UserSlice> = set => ({
  user: DEFAULT_USER,
  setUser: (changes: Pick<User, 'name' | 'email' | 'photo'>) =>
    set(state => ({ user: changes })),
  removeUser: () => set(state => ({ user: DEFAULT_USER })),
});

export const useAuthStore = create<UserSlice & AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUserSlice(...a),
}));
