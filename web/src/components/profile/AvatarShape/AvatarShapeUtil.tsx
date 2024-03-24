import { useState } from "react";
import {
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  TLOnResizeHandler,
  getDefaultColorTheme,
  resizeBox,
} from "tldraw";
import { avatarShapeProps } from "./avatar-shape-props";
import { IAvatarShape } from "./avatar-shape-types";
import { Box, Image, Text, Title, Tooltip } from "@mantine/core";

const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "all",
  },
  icon: {
    pointerEvents: "none",
    borderRadius: "50%",
    marginBottom: 24,
    border: "2px solid #000",
  },
} as Record<string, React.CSSProperties>;

export class AvatarShapeUtil extends ShapeUtil<IAvatarShape> {
  static override type = "avatar" as const;
  // [1]
  static override props = avatarShapeProps;

  // [3]
  override isAspectRatioLocked = (_shape: IAvatarShape) => false;
  override canResize = (_shape: IAvatarShape) => true;
  override canBind = (_shape: IAvatarShape) => true;

  // [4]
  getDefaultProps(): IAvatarShape["props"] {
    return {
      w: 300,
      h: 300,
      imageUrl: "",
      name: "",
      username: "",
    };
  }

  // [5]
  getGeometry(shape: IAvatarShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // [6]
  component(shape: IAvatarShape) {
    const bounds = this.editor.getShapeGeometry(shape).bounds;
    const theme = getDefaultColorTheme({
      isDarkMode: this.editor.user.getIsDarkMode(),
    });

    //[a]
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [count, setCount] = useState(0);

    return (
      <Box id={shape.id} style={styles.box}>
        <Tooltip.Floating label="Click to edit" position="top">
          <Image
            src={shape.props.imageUrl}
            alt="avatar"
            width={256}
            height={256}
            style={styles.icon}
          />
        </Tooltip.Floating>
        {/* <h2>Clicks: {count}</h2>
        <button
          // [b]
          onClick={() => setCount((count) => count + 1)}
          onPointerDown={(e) => e.stopPropagation()}>
          {bounds.w.toFixed()}x{bounds.h.toFixed()}
        </button> */}
      </Box>
    );
  }

  // [7]
  indicator(shape: IAvatarShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }

  // [8]
  override onResize: TLOnResizeHandler<IAvatarShape> = (shape, info) => {
    return resizeBox(shape, info);
  };
}
/* 
A utility class for the card shape. This is where you define the shape's behavior, 
how it renders (its component and indicator), and how it handles different events.

[1]
A validation schema for the shape's props (optional)
Check out card-shape-props.ts for more info.

[2]
Migrations for upgrading shapes (optional)
Check out card-shape-migrations.ts for more info.

[3]
Letting the editor know if the shape's aspect ratio is locked, and whether it 
can be resized or bound to other shapes. 

[4]
The default props the shape will be rendered with when click-creating one.

[5]
We use this to calculate the shape's geometry for hit-testing, bindings and
doing other geometric calculations. 

[6]
Render method — the React component that will be rendered for the shape. It takes the 
shape as an argument. HTMLContainer is just a div that's being used to wrap our text 
and button. We can get the shape's bounds using our own getGeometry method.
	
- [a] Check it out! We can do normal React stuff here like using setState.
   Annoying: eslint sometimes thinks this is a class component, but it's not.

- [b] You need to stop the pointer down event on buttons, otherwise the editor will
	   think you're trying to select drag the shape.

[7]
Indicator — used when hovering over a shape or when it's selected; must return only SVG elements here

[8]
Resize handler — called when the shape is resized. Sometimes you'll want to do some 
custom logic here, but for our purposes, this is fine.
*/
