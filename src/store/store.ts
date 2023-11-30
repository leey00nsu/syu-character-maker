import { RGBColor } from 'react-color';
import { atom } from 'recoil';

// 백그라운드 캐릭터를 선택하는 상태
export const bgState = atom<string>({
  key: 'bgState',
  default: '수호',
});

interface BgColorState {
  rgb: RGBColor;
  hex: string;
  alpha: number;
}

// 백그라운드 색상을 선택하는 상태
export const bgColorState = atom<BgColorState>({
  key: 'bgColorState',
  default: {
    rgb: {
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    },
    hex: '#ffffff',
    alpha: 1,
  },
});

interface PenState {
  size: number;
  color: string;
  hsl: string;
}

// 펜의 색상과 굵기를 선택하는 상태
export const penState = atom<PenState>({
  key: 'penState',
  default: { size: 5, color: 'black', hsl: '0 0% 0%' },
});

// 메뉴의 상태를 선택하는 상태
export const menuState = atom<string>({
  key: 'menuState',
  default: '꾸미기',
});

// 그리기의 모드를 선택하는 상태
// state : move, draw
export const modeState = atom<string>({
  key: 'modeState',
  default: 'move',
});

export const itemState = atom<{ item: string; itemUrl: string }[]>({
  key: 'itemState',
  default: [],
});

export interface DrawingObject {
  type: string;
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

export const drawingObjectState = atom<DrawingObject[]>({
  key: 'drawingObjectState',
  default: [
    {
      x: 50,
      y: 50,
      type: 'background',
      id: 'background',
      z: 1,
    },
  ],
});

export const drawingObjectCountState = atom({
  key: 'drawingObjectCountState',
  default: 1,
});

export const selectedIdState = atom<string[]>({
  key: 'selectedIdState',
  default: [],
});

export const drawingObjectHistoryState = atom<DrawingObject[][]>({
  key: 'drawingObjectHistoryState',
  default: [
    [
      {
        x: 50,
        y: 50,
        type: 'background',
        id: 'background',
        z: 1,
      },
    ],
  ],
});

export const drawingObjectHistoryIndexState = atom<number>({
  key: 'drawingObjectHistoryIndexState',
  default: 0,
});
