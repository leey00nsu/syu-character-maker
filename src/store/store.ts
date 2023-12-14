import { RGBColor } from 'react-color';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export type CharacterState = '수호' | '수야';

// 백그라운드 캐릭터를 선택하는 상태
export const characterState = atom<CharacterState>({
  key: 'characterState',
  default: '수호',
  effects_UNSTABLE: [persistAtom],
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
  effects_UNSTABLE: [persistAtom],
});

interface PenState {
  size: number;
  rgb: RGBColor;
  hex: string;
  alpha: number;
  hsl: string;
}

// 펜의 색상과 굵기를 선택하는 상태
export const penState = atom<PenState>({
  key: 'penState',
  default: {
    size: 5,
    rgb: {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    },
    hex: '#000000',
    alpha: 1,
    hsl: '0 0% 0%',
  },
  effects_UNSTABLE: [persistAtom],
});

// 메뉴의 상태를 선택하는 상태
export const menuState = atom<string>({
  key: 'menuState',
  default: '꾸미기',
});

// 그리기의 모드를 선택하는 상태
// state : move, draw

export type ModeState = 'move' | 'draw';

export const modeState = atom<ModeState>({
  key: 'modeState',
  default: 'move',
});

export const itemState = atom<{ item: string; itemUrl: string }[]>({
  key: 'itemState',
  default: [],
  effects_UNSTABLE: [persistAtom],
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
  effects_UNSTABLE: [persistAtom],
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
  effects_UNSTABLE: [persistAtom],
});

export const drawingObjectHistoryIndexState = atom<number>({
  key: 'drawingObjectHistoryIndexState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
