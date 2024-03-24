import { TLBaseShape, TLDefaultColorStyle } from "tldraw";

// A type for our custom card shape
export type IAvatarShape = TLBaseShape<
  "avatar",
  {
    w: number;
    h: number;
    imageUrl: string;
    name: string;
    username: string;
  }
>;
