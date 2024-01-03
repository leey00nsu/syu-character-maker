import { EncryptStorage } from 'encrypt-storage';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

import { AuthSlice, createAuthSlice } from './authSlice';
import { UserSlice, createUserSlice } from './userSlice';

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

 const useAuthStore = create<UserSlice & AuthSlice>()(
  persist(
    (...all) => ({
      ...createAuthSlice(...all),
      ...createUserSlice(...all),
    }),
    {
      name: 'as',
      storage: createJSONStorage(() => encryptPersistStorage),
    },
  ),
);

export default useAuthStore;
