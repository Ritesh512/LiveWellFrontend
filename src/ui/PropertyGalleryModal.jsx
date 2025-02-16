import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
`;

const ModalContainer = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Ensure content does not overflow */
`;

const CloseButton = styled.button`
  position: absolute;
  right: 5px; /* Move the button outside the modal */
  top: 5px; /* Move the button outside the modal */
  z-index: 60; /* Ensure it is above other elements */
  padding: 8px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MediaDisplay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const MediaImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const MediaVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &.left {
    left: 16px;
  }

  &.right {
    right: 16px;
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 14px;
`;

const PropertyGalleryModal = ({ isOpen, onClose, images = [], videoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaType, setMediaType] = useState('image');
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const allMedia = [
    ...images.map(src => ({ type: 'image', src })),
    ...(videoUrl ? [{ type: 'video', src: videoUrl }] : [])
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? allMedia.length - 1 : prev - 1
    );
    setMediaType(allMedia[currentIndex === 0 ? allMedia.length - 1 : currentIndex - 1].type);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === allMedia.length - 1 ? 0 : prev + 1
    );
    setMediaType(allMedia[currentIndex === allMedia.length - 1 ? 0 : currentIndex + 1].type);
  };

  const currentMedia = allMedia[currentIndex];

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <X className="w-6 h-6" />
        </CloseButton>

        <MediaDisplay>
          {currentMedia.type === 'image' ? (
            <MediaImage
              src={`http://localhost:3000${currentMedia.src}`}
              alt={`Gallery item ${currentIndex + 1}`}
            />
          ) : (
            <MediaVideo
              src={`http://localhost:3000${currentMedia.src}`}
              controls
            />
          )}

          <NavButton className="left" onClick={handlePrevious}>
            <ChevronLeft className="w-6 h-6" />
          </NavButton>
          
          <NavButton className="right" onClick={handleNext}>
            <ChevronRight className="w-6 h-6" />
          </NavButton>

          <Counter>
            {currentIndex + 1} / {allMedia.length}
          </Counter>
        </MediaDisplay>
      </ModalContainer>
    </Overlay>
  );
};

export default PropertyGalleryModal;