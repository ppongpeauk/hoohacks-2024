import React, { useCallback, useState, useRef } from 'react';
import { Tldraw, TldrawApp } from 'tldraw';
import { AvatarShapeUtil } from './AvatarShape/AvatarShapeUtil';
import { PolaroidShapeUtil } from './PolaroidShape/PolaroidShapeUtil';
import logo from '@/assets/images/user-example.png';

// Define an interface for PlusButton props
interface PlusButtonProps {
  position: { x: number; y: number };
  onClick: () => void;
}

const PlusButton = ({ position, onClick }: PlusButtonProps) => {
  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    cursor: 'pointer',
    zIndex: 1000,
    transform: 'translate(-50%, -50%)',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '0.5rem',
    fontSize: '1.5rem',
    lineHeight: '1',
    userSelect: 'none',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      +
    </button>
  );
};

const CustomCanvas = () => {
  const [app, setApp] = useState<TldrawApp | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const canvasRect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top,
    });
    setShowButton(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowButton(false);
  }, []);

  const handlePlusButtonClick = useCallback(() => {
    // This will trigger the file input
    fileInputRef.current?.click();
  }, []);

  // Handle file input change and create shape
  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && app) {
      const reader = new FileReader();
      reader.onloadend = () => {
        app.createShape({
          type: 'polaroid',
          x: mousePosition.x,
          y: mousePosition.y,
          isLocked: false,
          props: {
            w: 256,
            h: 256,
            imageUrl: reader.result as string,
            name: 'Uploaded Image',
            username: 'uploader',
          },
        });
      };
      reader.readAsDataURL(file);
      // Reset the input after the file is read
      event.target.value = '';
    }
  }, [app, mousePosition.x, mousePosition.y]);

  const customShapeUtils = [AvatarShapeUtil, PolaroidShapeUtil];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', width: '100%', height: '500px' }} // Set a fixed height or make it dynamic as needed
    >
      <Tldraw
        shapeUtils={customShapeUtils}
        hideUi
        onMount={setApp}
        // Additional Tldraw props and event handlers as needed
      />

      {showButton && (
        <PlusButton
          position={mousePosition}
          onClick={handlePlusButtonClick}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        accept="image/*"
      />
    </div>
  );
};

export default CustomCanvas;
