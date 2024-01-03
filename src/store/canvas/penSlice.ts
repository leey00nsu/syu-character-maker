import { StateCreator } from 'zustand';

import { CanvasColor } from './canvasStore.type';

export interface PenSlice {
  penSize: number;
  penColor: CanvasColor;
  setPenSize: (changes: number) => void;
  setPenColor: (changes: CanvasColor) => void;
}

const DEFAULT_PEN_SIZE = 5;
const DEFAULT_PEN_COLOR: CanvasColor = {
  rgb: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  hex: '#000000',
  alpha: 1,
};

export const createPenSlice: StateCreator<PenSlice> = set => ({
  penSize: DEFAULT_PEN_SIZE,
  penColor: DEFAULT_PEN_COLOR,
  setPenSize: (changes: number) => set(state => ({ penSize: changes })),
  setPenColor: (changes: CanvasColor) => set(state => ({ penColor: changes })),
});
