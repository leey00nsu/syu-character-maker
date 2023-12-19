import { del, get, set } from 'idb-keyval';
import { RGBColor } from 'react-color';
import { StateCreator, create } from 'zustand';
import { createDebouncedJSONStorage } from 'zustand-debounce';
import { StateStorage, persist } from 'zustand/middleware';

// 커스텀 IndexdDB 스토리지
const IDBstorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

const DEFAULT_BACKGROUND_COLOR = {
  rgb: {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  },
  hex: '#ffffff',
  alpha: 1,
};

interface BackgroundColorSlice {
  backgroundColor: Color;
  setBackgroundColor: (changes: Color) => void;
}

// 백그라운드 색상을 선택하는 상태
const createBackgroundSlice: StateCreator<BackgroundColorSlice> = set => ({
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  setBackgroundColor: (changes: Color) =>
    set(state => ({ backgroundColor: changes })),
});

interface Color {
  rgb: RGBColor;
  hex: string;
  alpha: number;
}

interface PenSlice {
  penSize: number;
  penColor: Color;
  setPenSize: (changes: number) => void;
  setPenColor: (changes: Color) => void;
}

const DEFAULT_PEN_SIZE = 5;
const DEFAULT_PEN_COLOR: Color = {
  rgb: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  hex: '#000000',
  alpha: 1,
};

const createPenSlice: StateCreator<PenSlice> = set => ({
  penSize: DEFAULT_PEN_SIZE,
  penColor: DEFAULT_PEN_COLOR,
  setPenSize: (changes: number) => set(state => ({ penSize: changes })),
  setPenColor: (changes: Color) => set(state => ({ penColor: changes })),
});

interface ModeSlice {
  mode: ModeState;
  setMode: (changes: ModeState) => void;
}

export type ModeState = 'move' | 'draw';

const DEFAULT_MODE = 'move';

// 캔버스의 모드를 선택하는 상태
const createModeSlice: StateCreator<ModeSlice> = set => ({
  mode: DEFAULT_MODE,
  setMode: (changes: ModeState) => set(state => ({ mode: changes })),
});

export interface CanvasObject {
  name: string;
  id: string;
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  skewY?: number;
  rotation?: number;
  points?: number[];
  color?: string;
  size?: number;
  url?: string;
  z: number;
  opacity?: number;
}

const DEFAULT_CANVAS_OBJECT: CanvasObject = {
  name: 'character',
  id: '수호',
  url: '/suho.png',
  z: 1,
};

interface CanvasObjectSlice {
  canvasObjects: CanvasObject[];
  canvasObjectHistory: CanvasObject[][];
  canvasObjectHistoryIndex: number;
  setCanvasObjects: (changes: CanvasObject[]) => void;
  setCanvasObjectHistory: (changes: CanvasObject[][]) => void;
  setCanvasObjectHistoryIndex: (changes: number) => void;
  selectedObjectIds: string[];
  setSelectedObjectIds: (changes: string[]) => void;
}

const createCanvasObjectSlice: StateCreator<CanvasObjectSlice> = set => ({
  canvasObjects: [DEFAULT_CANVAS_OBJECT],
  canvasObjectHistory: [[DEFAULT_CANVAS_OBJECT]],
  canvasObjectHistoryIndex: 0,
  selectedObjectIds: [],
  setCanvasObjects: (changes: CanvasObject[]) =>
    set(state => ({ canvasObjects: changes })),
  setCanvasObjectHistory: (changes: CanvasObject[][]) =>
    set(state => ({ canvasObjectHistory: changes })),
  setCanvasObjectHistoryIndex: (changes: number) =>
    set(state => ({ canvasObjectHistoryIndex: changes })),
  setSelectedObjectIds: (changes: string[]) =>
    set(state => ({ selectedObjectIds: changes })),
});

export const useCanvasStore = create<
  BackgroundColorSlice & PenSlice & ModeSlice & CanvasObjectSlice
>()(
  persist(
    (...a) => ({
      ...createBackgroundSlice(...a),
      ...createPenSlice(...a),
      ...createModeSlice(...a),
      ...createCanvasObjectSlice(...a),
    }),
    {
      name: 'canvas',
      storage: createDebouncedJSONStorage(IDBstorage, {
        debounceTime: 1000,
      }),
      partialize: (state: any) => ({
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
