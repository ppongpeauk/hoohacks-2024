import { useEffect } from "react";
import { AvatarShapeUtil } from "./AvatarShape/AvatarShapeUtil";
import {
  AssetRecordType,
  Circle2d,
  Geometry2d,
  HTMLContainer,
  Rectangle2d,
  ShapeProps,
  ShapeUtil,
  T,
  TLBaseShape,
  TLOnResizeHandler,
  Tldraw,
  resizeBox,
} from "tldraw";
import logo from "@/assets/images/user-example.png";

const customShapeUtils = [AvatarShapeUtil];
export default function Canvas() {
  return (
    <>
      <div style={{ position: "fixed", inset: 0 }}>
        <Tldraw
          shapeUtils={customShapeUtils}
          hideUi
          onMount={(editor) => {
            editor.createShape({
              typeName: "shape",
              type: "avatar",
              // Let's center the image in the editor
              x: 0,
              y: 0,
              isLocked: true,
              props: {
                w: 256,
                h: 256,
                name: "Pete Pongpeauk",
                username: "ppongpeauk",
                imageUrl: logo.src,
              },
            });
            // center the image in the editor
            editor.centerOnPoint({ x: 128, y: 128 });
          }}
        />
      </div>
      {/* <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect width={50} height={50} fill="red" />
          <Circle x={200} y={200} stroke="black" radius={50} />
        </Layer>
      </Stage> */}
    </>
  );
}
