"use client";

import React from "react";
import { EmblaOptionsType } from 'embla-carousel';
import Image from "next/image";
import sliderOne from '../assests/images/test.webp';
import sliderTwo from '../assests/images/COVER 2.jpg';
import EmblaCarousel from './Carousel/EmblaCarousal';
import './Styles/hero.css';
import '../components/SliderTwo/imageslider.css';
//  import './Carousel/embla.css';
import ImageSliderTwo from "./SliderTwo/ImageSliderTwo";

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };
const SLIDES = [sliderOne, sliderTwo]; // Add more images here if needed

function Hero() {
  return (
    <>
    {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
    <ImageSliderTwo/>
    </>
  );
}

export default Hero;
