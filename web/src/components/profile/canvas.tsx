import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tldraw } from "tldraw";
import tempAvatar from "@/assets/images/waleed.jpeg";
import { AvatarShapeUtil } from "./AvatarShape/AvatarShapeUtil";
import { PolaroidShapeUtil } from "./PolaroidShape/PolaroidShapeUtil";
import { User } from "@/types";
import { useAuthContext } from "@/contexts/AuthContext";
import { notifications } from "@mantine/notifications";
import { useCanvasContext } from "@/contexts/CanvasContext";

const customShapeUtils = [AvatarShapeUtil, PolaroidShapeUtil];

interface Response {
  pid: number;
  fileLink: string;
  uid: number;
  cid: number;
  x: string;
  y: string;
  width: string;
  height: string;
}

export default function Canvas({
  data,
  id,
}: {
  data: Response[] | null;
  id: string;
}) {
  const { user: firebaseUser, currentUser } = useAuthContext();
  const [uploadedImages, setUploadedImages] = useState([]);
  const editorRef = useRef(null) as any; // Ref to access the TldrawApp instance
  const { cid, setCid } = useCanvasContext();

  // Handle file upload and convert to data URL
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        // setUploadedImages(
        //   (prevImages: any) => [...prevImages, e.target?.result] as any
        // );
        uploadImage(
          file,
          Math.random() * 512 * (Math.random() < 0.5 ? -1 : 1),
          Math.random() * 512 * (Math.random() < 0.5 ? -1 : 1)
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = useCallback(
    async (file: File, x: number, y: number) => {
      // upload image to the backend and fetch the ID
      const uploadResponse = await fetch(`http://localhost:8080/api/storage`, {
        method: "POST",
        body: file,
      }).then((res) => res.text()); // should return the ID of the uploaded image

      const response = await fetch(`http://localhost:8080/api/pictures/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileLink: uploadResponse,
          uid: 0,
          cid: -1,
          x: x.toString(),
          y: y.toString(),
          width: "0",
          height: "0",
        }),
      });

      if (response.ok) {
        notifications.show({
          message: "Image uploaded successfully.",
          color: "green",
        });
        fetchPolaroids();
      } else {
        notifications.show({
          message: "There was a problem uploading the image.",
          color: "red",
        });
      }
    },
    [firebaseUser]
  );

  const fetchPolaroids = useCallback(async () => {
    if (!firebaseUser) return;
    const token = await firebaseUser.getIdToken();
    const response = await fetch(
      `http://localhost:8080/api/pictures/of/${firebaseUser?.uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setUploadedImages(data);
  }, [firebaseUser, id]);

  useEffect(() => {
    fetchPolaroids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, firebaseUser]);

  // Effect to create a new Polaroid shape for each uploaded image
  useEffect(() => {
    if (uploadedImages.length > 0 && editorRef.current) {
      const editor = editorRef.current as any;
      uploadedImages.forEach((entry: any, index) => {
        console.log(entry);
        editor.createShape({
          id: "shape:" + entry.fileLink,
          type: "polaroid",
          x: parseInt(entry.x),
          y: parseInt(entry.y),
          isLocked: false, // Ensure the shape is draggable
          props: {
            w: 512,
            h: 512,
            cid: entry.cid,
            pid: entry.pid,
            imageUrl: "http://localhost:8080/api/storage/" + entry.fileLink,
            name: `Image ${index + 1}`,
            username: `user${index + 1}`,
          },
        });
      });

      // Clear the uploaded images state if desired
      setUploadedImages([]);
    }
  }, [uploadedImages]);

  useEffect(() => {
    if (!editorRef.current) return;

    // get all shapes positions every 5 seconds
    const interval = setInterval(async () => {
      const shapes = editorRef.current.getCurrentPageShapes();
      console.log(shapes);

      shapes.forEach(async (shape: any) => {
        if (shape.type !== "avatar") {
          const urlencoded = new URLSearchParams();
          urlencoded.append("x", shape.x.toString());
          urlencoded.append("y", shape.y.toString());
          urlencoded.append("width", "0");
          urlencoded.append("height", "0");
          await fetch(
            `http://localhost:8080/api/pictures/${shape.props?.pid?.toString()}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: urlencoded,
            }
          );
        }
      });
    }, 5000);
  }, [editorRef.current]);

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
              imageUrl: tempAvatar.src,
            },
          });

          app.centerOnPoint({ x: 128, y: 128 });
        }}
      />
    </div>
  );
}
