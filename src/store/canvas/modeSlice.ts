import { StateCreator } from "zustand";

export interface ModeSlice {
  mode: ModeState;
  setMode: (changes: ModeState) => void;
}

export type ModeState = 'move' | 'draw';

const DEFAULT_MODE = 'move';

// 캔버스의 모드를 선택하는 상태
export const createModeSlice: StateCreator<ModeSlice> = set => ({
  mode: DEFAULT_MODE,
  setMode: (changes: ModeState) => set(state => ({ mode: changes })),
});