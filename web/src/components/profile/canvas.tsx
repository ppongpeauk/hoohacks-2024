import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tldraw } from "tldraw";
import logo from "@/assets/images/user-example.png"; // Ensure this path is correct
import { AvatarShapeUtil } from "./AvatarShape/AvatarShapeUtil";
import { PolaroidShapeUtil } from "./PolaroidShape/PolaroidShapeUtil";
import { User } from "@/types";
import { useAuthContext } from "@/contexts/AuthContext";
import { notifications } from "@mantine/notifications";

const customShapeUtils = [AvatarShapeUtil, PolaroidShapeUtil];

export default function Canvas({ user }: { user: User | null }) {
  const { user: firebaseUser, currentUser } = useAuthContext();
  const [uploadedImages, setUploadedImages] = useState([]);
  const editorRef = useRef(null) as any; // Ref to access the TldrawApp instance

  // Handle file upload and convert to data URL
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        // setUploadedImages(
        //   (prevImages: any) => [...prevImages, e.target?.result] as any
        // );
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = useCallback(
    async (file: File, x: string, y: string) => {
      if (!user) return;

      // upload image to the backend and fetch the ID
      const token = await firebaseUser.getIdToken();
      const uploadResponse = await fetch(`/api/pictures`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": file.type,
        },
        body: file,
      }).then((res) => res.text()); // should return the ID of the uploaded image

      console.log(uploadResponse);

      // create the form data
      const formData = new FormData();
      formData.append("imageLink", uploadResponse);
      formData.append("username", user.id); // uploader id
      formData.append("album_id", "1");
      formData.append("x", x);
      formData.append("y", y);

      const response = await fetch(`/api/pictures`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
    const response = await fetch(`/api/pictures/of/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUploadedImages(data.polaroids);
  }, [firebaseUser, user]);

  useEffect(() => {
    if (user) {
      fetchPolaroids();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
