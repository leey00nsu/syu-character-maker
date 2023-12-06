import { atom } from 'recoil';

interface UserState {
  name: string;
  email: string;
  photo: string;
}

export const authState = atom<boolean>({
  key: 'authState',
  default: false,
});

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    name: '',
    email: '',
    photo: '',
  },
});
