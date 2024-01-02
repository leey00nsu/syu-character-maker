import { del, get, set } from 'idb-keyval';
import Konva from 'konva';
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
  name: string; // 캔버스에서 그려지는 오브젝트의 종류 (character, decoration,line, image)
  id: string; // 캔버스에서 그려지는 오브젝트의 고유 이름
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  skewY?: number;
  rotation?: number;
  points?: number[]; // 선의 좌표
  color?: string;
  size?: number;
  url?: string;
  opacity?: number;
  originColor?: string; // 캔버스에 그려지는 꾸미기 아이템의 기본 색상
  parents?: string; // 부모 오브젝트의 id
}

const DEFAULT_CANVAS_OBJECT: CanvasObject = {
  name: 'character',
  id: '수호',
  url: '/suho.png',
};

interface CanvasObjectSlice {
  isCanvasLoading: boolean;
  canvasName: string;
  canvasObjects: CanvasObject[];
  canvasObjectHistory: CanvasObject[][];
  canvasObjectHistoryIndex: number;
  setIsCanvasLoading: (changes: boolean) => void;
  setCanvasName: (changes: string) => void;
  setCanvasObjects: (changes: CanvasObject[]) => void;
  setCanvasObjectHistory: (changes: CanvasObject[][]) => void;
  setCanvasObjectHistoryIndex: (changes: number) => void;
  selectedObjectIds: string[];
  setSelectedObjectIds: (changes: string[]) => void;
}

const createCanvasObjectSlice: StateCreator<CanvasObjectSlice> = set => ({
  isCanvasLoading: true,
  canvasName: '',
  canvasObjects: [DEFAULT_CANVAS_OBJECT],
  canvasObjectHistory: [[DEFAULT_CANVAS_OBJECT]],
  canvasObjectHistoryIndex: 0,
  selectedObjectIds: [],
  setIsCanvasLoading: (changes: boolean) =>
    set(state => ({ isCanvasLoading: changes })),
  setCanvasName: (changes: string) => set(state => ({ canvasName: changes })),
  setCanvasObjects: (changes: CanvasObject[]) =>
    set(state => ({ canvasObjects: changes })),
  setCanvasObjectHistory: (changes: CanvasObject[][]) =>
    set(state => ({ canvasObjectHistory: changes })),
  setCanvasObjectHistoryIndex: (changes: number) =>
    set(state => ({ canvasObjectHistoryIndex: changes })),
  setSelectedObjectIds: (changes: string[]) =>
    set(state => ({ selectedObjectIds: changes })),
});

interface CanvasRefSlice {
  stageRef: null | React.RefObject<Konva.Stage>;
  layerRef: null | React.RefObject<Konva.Layer>;
  selectBoxRef: null | React.RefObject<Konva.Rect>;
  transformerRef: null | React.RefObject<Konva.Transformer>;
  setCanvasRef: (changes: Partial<CanvasRefSlice>) => void;
}

const createCanvasRefSlice: StateCreator<CanvasRefSlice> = set => ({
  stageRef: null,
  layerRef: null,
  selectBoxRef: null,
  transformerRef: null,
  setCanvasRef: (changes: Partial<CanvasRefSlice>) =>
    set(state => ({ ...changes })),
});

export const useCanvasStore = create<
  BackgroundColorSlice &
    PenSlice &
    ModeSlice &
    CanvasObjectSlice &
    CanvasRefSlice
>()(
  persist(
    (...a) => ({
      ...createBackgroundSlice(...a),
      ...createPenSlice(...a),
      ...createModeSlice(...a),
      ...createCanvasObjectSlice(...a),
      ...createCanvasRefSlice(...a),
    }),
    {
      name: 'canvas',
      storage: createDebouncedJSONStorage(IDBstorage, {
        debounceTime: 1000,
      }),
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
