import { DefaultColorStyle, ShapeProps, T } from "tldraw";
import { IPolaroidShape } from "./polaroid-shape-types";

// Validation for our custom polaroid shape's props, using one of tldraw's default styles
export const polaroidShapeProps: ShapeProps<IPolaroidShape> = {
  w: T.number,
  h: T.number,
  imageUrl: T.string,
  name: T.string,
  username: T.string,
  pid: T.number,
};
