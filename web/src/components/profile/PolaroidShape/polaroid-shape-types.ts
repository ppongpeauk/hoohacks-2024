import { TLBaseShape, TLDefaultColorStyle } from "tldraw";

// A type for our custom card shape
export type IPolaroidShape = TLBaseShape<
  "polaroid",
  {
    w: number;
    h: number;
    imageUrl: string;
    name: string;
    username: string;
    pid: number;
    cid: number;
  }
>;
