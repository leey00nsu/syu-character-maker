import { create } from 'zustand';

export type ModalType = 'confirm' | 'alert' | 'delete';

export interface Modal {
  type: ModalType;
  title: string;
  content: string;
  callback: () => void;
}

interface ModalSlice {
  isModalOpen: boolean;
  modals: Modal[];
  setIsModalOpen: (changes: boolean) => void;
  addModal: (changes: Modal) => void;
  removeModal: () => void;
}

export const useModalStore = create<ModalSlice>(set => ({
  isModalOpen: false,
  modals: [],
  setIsModalOpen: (changes: boolean) =>
    set(state => ({ isModalOpen: changes })),
  addModal: (changes: Modal) =>
    set(state => ({ modals: [...state.modals, changes] })),
  removeModal: () => set(state => ({ modals: state.modals.slice(0, -1) })),
}));
