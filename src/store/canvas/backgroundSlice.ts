
import { StateCreator } from "zustand";
import { CanvasColor } from "./canvasStore.type";

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

export interface BackgroundColorSlice {
  backgroundColor: CanvasColor;
  setBackgroundColor: (changes: CanvasColor) => void;
}

// 백그라운드 색상을 선택하는 상태
export const createBackgroundSlice: StateCreator<BackgroundColorSlice> = set => ({
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  setBackgroundColor: (changes: CanvasColor) =>
    set(state => ({ backgroundColor: changes })),
});