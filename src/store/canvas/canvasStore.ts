import { del, get, set } from 'idb-keyval';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

import debounce from '@/utils/debounce';

import { BackgroundColorSlice, createBackgroundSlice } from './backgroundSlice';
import {
  CanvasObjectSlice,
  createCanvasObjectSlice,
} from './canvasObjectSlice';
import { CanvasRefSlice, createCanvasRefSlice } from './canvasRefSlice';
import { ModeSlice, createModeSlice } from './modeSlice';
import { PenSlice, createPenSlice } from './penSlice';

// 커스텀 IndexdDB 스토리지
const IDBstorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: debounce(async (name: string, value: string): Promise<void> => {
    await set(name, value);
  }, 1000),
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

const useCanvasStore = create<
  BackgroundColorSlice &
    PenSlice &
    ModeSlice &
    CanvasObjectSlice &
    CanvasRefSlice
>()(
  persist(
    (...all) => ({
      ...createBackgroundSlice(...all),
      ...createPenSlice(...all),
      ...createModeSlice(...all),
      ...createCanvasObjectSlice(...all),
      ...createCanvasRefSlice(...all),
    }),
    {
      name: 'canvas',
      storage: createJSONStorage(() => IDBstorage),
      partialize: (state: any) => ({
        canvasName: state.canvasName,
        backgroundColor: state.backgroundColor,
        penSize: state.penSize,
        penColor: state.penColor,
        mode: state.mode,
        canvasObjects: state.canvasObjects,
        canvasObjectHistory: state.canvasObjectHistory,
        canvasObjectHistoryIndex: state.canvasObjectHistoryIndex,
      }),
    },
  ),
);

export default useCanvasStore;
