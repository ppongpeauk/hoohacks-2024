import React from "react";
import { Rectangle2d, ShapeUtil, TLOnResizeHandler, resizeBox } from "tldraw";
import { polaroidShapeProps } from "./polaroid-shape-props";
import { IPolaroidShape } from "./polaroid-shape-types";
import { Box, Image } from "@mantine/core";

// Define a functional component for the Polaroid shape's appearance
const PolaroidComponent = ({ shape }: { shape: IPolaroidShape }) => {
  const styles = {
    box: {
      display: "flex",
      flexDirection: "column",
      pointerEvents: "all",
      border: "2px solid #000",
      backgroundColor: "#fff",
      height: "100%",
    },
    image: {
      pointerEvents: "none",
      borderBottom: "2px solid #000",
    },
  } as Record<string, React.CSSProperties>;

  return (
    <Box id={shape.id} style={styles.box}>
      <Image src={shape.props.imageUrl} alt="polaroid" style={styles.image} />
      {/* Add more polaroid-specific elements here if needed */}
    </Box>
  );
};

export class PolaroidShapeUtil extends ShapeUtil<IPolaroidShape> {
  static override type = "polaroid" as const;
  static override props = polaroidShapeProps;

  override isAspectRatioLocked = (_shape: IPolaroidShape) => false;
  override canResize = (_shape: IPolaroidShape) => true;
  override canBind = (_shape: IPolaroidShape) => true;

  getDefaultProps(): IPolaroidShape["props"] {
    return {
      w: 256,
      h: 316,
      imageUrl: "",
      name: "",
      username: "",
    };
  }

  getGeometry(shape: IPolaroidShape): Rectangle2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // Correctly override the component method to match the base class signature
  component(shape: IPolaroidShape) {
    return <PolaroidComponent shape={shape} />;
  }

  indicator(shape: IPolaroidShape): JSX.Element {
    return (
      <rect
        width={shape.props.w}
        height={shape.props.h}
        fill="none"
        stroke="blue"
      />
    );
  }

  override onResize: TLOnResizeHandler<IPolaroidShape> = (shape, info) => {
    return resizeBox(shape, info);
  };
}
