import { atom } from "recoil";

// 백그라운드 캐릭터를 선택하는 상태
export const bgState = atom<string>({
  key: "bgState",
  default: "수호",
});

// 백그라운드 색상을 선택하는 상태
export const bgColorState = atom<string>({
  key: "bgColorState",
  default: "#ffffff",
});

interface PenState {
  size: number;
  color: string;
  hsl: string;
}

// 펜의 색상과 굵기를 선택하는 상태
export const penState = atom<PenState>({
  key: "penState",
  default: { size: 5, color: "black", hsl: "0 0% 0%" },
});

// 메뉴의 상태를 선택하는 상태
export const menuState = atom<string>({
  key: "menuState",
  default: "꾸미기",
});

// 그리기의 모드를 선택하는 상태
// state : move, draw
export const modeState = atom<string>({
  key: "modeState",
  default: "move",
});

export const itemState = atom<{ item: string; itemUrl: string }[]>({
  key: "itemState",
  default: [],
});

interface Object {
  type: string;
  id: string;
  points?: any;
  color?: string;
  size?: number;
  url?: string;
  z: number;
  opacity?: number;
}

export const objectState = atom<Object[]>({
  key: "objectState",
  default: [
    {
      type: "background",
      id: "background",
      z: 1,
      opacity: 1,
    },
  ],
});

export const objectCountState = atom({
  key: "objectCountState",
  default: 2,
});

export const selectedIdState = atom<string[]>({
  key: "selectedIdState",
  default: [],
});
