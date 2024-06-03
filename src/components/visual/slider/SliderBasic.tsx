import React, { useState } from 'react';
import Slider from 'react-slick';
import { ISliderBasic } from './ISliderBasic';
import './SliderBasic.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ArrowProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const SliderBasic: React.FC<ISliderBasic> = ({
  images,
  initialSlide = 0,
  className = 'slider-basic',
  openModal,
}) => {
  const slideCount = images.length;
  const [slideIndex, setSlideIndex] = useState(initialSlide);

  function SamplePrevArrow(props: ArrowProps) {
    const { onClick, style } = props;

    return (
      <img
        className="arrow-left"
        src="./assets/icons/arrow-left.svg"
        alt="arrow-left"
        onClick={onClick}
        style={{
          ...style,
          display: slideIndex === 0 || slideCount <= 1 ? 'none' : 'block',
        }}
      />
    );
  }

  function SampleNextArrow(props: ArrowProps) {
    const { onClick, style } = props;

    return (
      <img
        className="arrow-right"
        src="./assets/icons/arrow-right.svg"
        alt="arrow-right"
        onClick={onClick}
        style={{
          ...style,
          display: slideIndex === slideCount - 1 || slideCount <= 1 ? 'none' : 'block',
        }}
      />
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    waitForAnimate: false,
    initialSlide,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current: number, next: number) => setSlideIndex(next),
  };

  function handleSlideClick(index: number) {
    if (openModal) {
      openModal(<SliderBasic images={images} initialSlide={index} className="slider-large" />);
    }
  }

  return (
    <Slider {...settings} className={className}>
      {images.map((src, index) => (
        <div key={index} onClick={() => handleSlideClick(index)}>
          <img src={src} alt={`slide-${index}`} />
        </div>
      ))}
    </Slider>
  );
};
