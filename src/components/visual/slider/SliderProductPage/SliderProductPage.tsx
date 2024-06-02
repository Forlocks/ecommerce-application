import React, { useState } from 'react';
import { IImageGallery } from './ISliderProductPage';
import { SliderBasic } from '../SliderBasic/SliderBasic';
import '../Slider.scss';
import { SmallButton } from '../../buttons/SmallButton/SmallButton';

const closeIcon = <img src="../../../assets/icons/cross.svg" alt="close" />;

export const ImageGallery: React.FC<IImageGallery> = ({
  images,
  initialSlide = 0,
  className = 'image-gallery',
}) => {
  const [slideIndex, setSlideIndex] = useState(initialSlide);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className={className}>
      <div
        className="main-image"
        onClick={() =>
          openModal(
            <SliderBasic images={images} initialSlide={slideIndex} className="slider-large" />,
          )
        }
      >
        <img src={images[slideIndex]} alt={`main-slide-${slideIndex}`} />
      </div>

      <SliderBasic
        images={images}
        initialSlide={initialSlide}
        className="slider-thumbnails"
        onClickThumbnail={setSlideIndex}
      />

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <SmallButton onClick={closeModal} icon={closeIcon} className="close-button" />
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};
