export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  mural: Mural;
}

export interface Mural {
  shapes: Shape[] | unknown;
}

export interface Shape {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
