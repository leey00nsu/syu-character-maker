import { atom } from "recoil";

export const bgState = atom({
  key: "bgState",
  default: "수호",
});

export const bgColorState = atom({
  key: "bgColorState",
  default: "#ffffff",
});

export const menuState = atom({
  key: "menuState",
  default: "꾸미기",
});

export const modeState = atom({
  key: "modeState",
  default: "move",
});

export const saveState = atom({
  key: "saveState",
  default: false,
});
