import { StateCreator } from 'zustand';

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

export interface CanvasObjectSlice {
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

export const createCanvasObjectSlice: StateCreator<
  CanvasObjectSlice
> = set => ({
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
