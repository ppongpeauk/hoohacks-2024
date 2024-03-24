import { DefaultColorStyle, ShapeProps, T } from "tldraw";
import { IAvatarShape } from "./avatar-shape-types";

// Validation for our custom card shape's props, using one of tldraw's default styles
export const avatarShapeProps: ShapeProps<IAvatarShape> = {
  w: T.number,
  h: T.number,
  imageUrl: T.string,
  name: T.string,
  username: T.string,
};

// To generate your own custom styles, check out the custom styles example.
