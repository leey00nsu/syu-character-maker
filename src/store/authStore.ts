import { EncryptStorage } from 'encrypt-storage';
import { StateCreator, create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

import { User } from '@/apis/auth/auth.type';

const encryptStorage = new EncryptStorage(import.meta.env.VITE_ENCRYPT_KEY, {
  stateManagementUse: true, // persist 설정 시 필요
});

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

const createUserSlice: StateCreator<UserSlice> = set => ({
  user: DEFAULT_USER,
  expiredAt: null,
  setUser: (changes: User) => set(state => ({ user: changes })),
  setExpiredAt: (changes: Date | null) =>
    set(state => ({ expiredAt: changes })),
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
