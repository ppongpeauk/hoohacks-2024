import React, { useState, useEffect, useRef } from "react";
import { Tldraw } from "tldraw";
import logo from "@/assets/images/user-example.png"; // Ensure this path is correct
import { AvatarShapeUtil } from "./AvatarShape/AvatarShapeUtil";
import { PolaroidShapeUtil } from "./PolaroidShape/PolaroidShapeUtil";
import { User } from "@/types";

const customShapeUtils = [AvatarShapeUtil, PolaroidShapeUtil];

export default function Canvas({ user }: { user: User | null }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const editorRef = useRef(null) as any; // Ref to access the TldrawApp instance

  // Handle file upload and convert to data URL
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(
          (prevImages: any) => [...prevImages, e.target?.result] as any
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Effect to create a new Polaroid shape for each uploaded image
  useEffect(() => {
    if (uploadedImages.length > 0 && editorRef.current) {
      const editor = editorRef.current as any;
      uploadedImages.forEach((imageUrl, index) => {
        editor.createShape({
          type: "polaroid",
          x: Math.random() * 512 * (Math.random() < 0.5 ? -1 : 1),
          y: Math.random() * 512 * (Math.random() < 0.5 ? -1 : 1),
          isLocked: true, // Ensure the shape is draggable
          props: {
            w: 128,
            h: 158,
            imageUrl: imageUrl,
            name: `Image ${index + 1}`,
            username: `user${index + 1}`,
          },
        });
      });

      // Clear the uploaded images state if desired
      setUploadedImages([]);
    }
  }, [uploadedImages]);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileChange}
      />

      {/* <label
        htmlFor="file-upload"
        style={{
          cursor: "pointer",
          padding: "20px 10px",
          border: "1px solid #ccc",
        }}>
        Upload Image
      </label> */}

      <Tldraw
        // ref={editorRef} // Attach the ref to the Tldraw component
        shapeUtils={customShapeUtils}
        hideUi
        onMount={(app) => {
          editorRef.current = app; // Assign the TldrawApp instance to the ref

          // Initial Avatar shape creation
          app.createShape({
            typeName: "shape",
            type: "avatar",
            x: 0,
            y: 0,
            isLocked: true,
            props: {
              w: 256,
              h: 256,
              imageUrl: user?.avatarUrl || "",
            },
          });

          app.centerOnPoint({ x: 128, y: 128 });
        }}
      />
    </div>
  );
}
