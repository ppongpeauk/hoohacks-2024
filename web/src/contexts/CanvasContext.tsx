import { createContext, useContext, useState } from "react";

interface CanvasContext {
  cid: number | null;
  setCid: (cid: number | null) => void;
}

export const CanvasContext = createContext<CanvasContext>({} as CanvasContext);
export function useCanvasContext() {
  return useContext(CanvasContext) as unknown as CanvasContext;
}

export default function CanvasProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cid, setCid] = useState<number | null>(-1);

  return (
    <CanvasContext.Provider
      value={{
        cid,
        setCid,
      }}>
      {children}
    </CanvasContext.Provider>
  );
}
