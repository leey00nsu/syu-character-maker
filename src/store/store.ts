import { atom } from "recoil";

export const bgState = atom<string>({
  key: "bgState",
  default: "수호",
});

export const bgColorState = atom<string>({
  key: "bgColorState",
  default: "#ffffff",
});

export const menuState = atom<string>({
  key: "menuState",
  default: "꾸미기",
});

export const modeState = atom<string>({
  key: "modeState",
  default: "move",
});

export const saveState = atom<boolean>({
  key: "saveState",
  default: false,
});

export const removeState = atom<boolean>({
  key: "removeState",
  default: false,
});

export const uploadState = atom<string | ArrayBuffer>({
  key: "uploadState",
  default: "",
});
