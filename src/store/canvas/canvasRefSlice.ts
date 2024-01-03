import Konva from 'konva';
import { StateCreator } from 'zustand';

export interface CanvasRefSlice {
  stageRef: null | React.RefObject<Konva.Stage>;
  layerRef: null | React.RefObject<Konva.Layer>;
  selectBoxRef: null | React.RefObject<Konva.Rect>;
  transformerRef: null | React.RefObject<Konva.Transformer>;
  setCanvasRef: (changes: Partial<CanvasRefSlice>) => void;
}

export const createCanvasRefSlice: StateCreator<CanvasRefSlice> = set => ({
  stageRef: null,
  layerRef: null,
  selectBoxRef: null,
  transformerRef: null,
  setCanvasRef: (changes: Partial<CanvasRefSlice>) =>
    set(state => ({ ...changes })),
});
