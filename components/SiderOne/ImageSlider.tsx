import React from "react";
import Slider from "react-slick";
import '../../src/app/globals.css'
import Image from "next/image";
import sliderOne from '../assests/images/COVER 2.jpg';
import sliderTwo from '../assests/images/COVER 2.jpg';
import sliderThree from '../assests/images/COVER 2.jpg';
import sliderFour from '../assests/images/COVER 2.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: 'linear'
  };
  return (
    <Slider {...settings}>
      <div>
        <Image src={sliderOne} alt="one"></Image>
      </div>
      <div>
        <Image src={sliderTwo} alt="one"></Image>
      </div>
      <div>
        <Image src={sliderThree} alt="one"></Image>

      </div>
      <div>
        <Image src={sliderFour} alt="one"></Image>

      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}