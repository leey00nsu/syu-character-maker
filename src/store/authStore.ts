import { EncryptStorage } from 'encrypt-storage';
import { StateCreator, create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

import { User } from '@/apis/auth/auth.type';

const encryptStorage = new EncryptStorage(import.meta.env.VITE_ENCRYPT_KEY);

// 커스텀 encrypted 스토리지
const encryptPersistStorage: StateStorage = {
  getItem: (name: string) => {
    return encryptStorage.getItem(name) || null;
  },
  setItem: (name: string, value: string) => {
    encryptStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    encryptStorage.removeItem(name);
  },
};

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

export const useAuthStore = create<UserSlice & AuthSlice>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createUserSlice(...a),
    }),
    {
      name: 'as',
      storage: createJSONStorage(() => encryptPersistStorage),
    },
  ),
);
