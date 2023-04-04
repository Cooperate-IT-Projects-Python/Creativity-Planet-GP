
 import React, { useState } from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../../dummydata";
import Awrapper from "./Awrapper";
import Slider from 'react-slick';
import Back from "../common/back/Back"
import Carousel from 'react-bootstrap/Carousel';
import { useTranslation } from "react-i18next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
 const AboutCard = () => {
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const [activeNote, setActiveNote] = useState(0);
  const handleClick = (id) => {
    setActiveNote(id);
  };
  const images = [
    { src: 'images/child1.jpg', alt: 'image1' },
    { src: 'images/child2.jpg', alt: 'image2' },
    { src: 'images/child3.jpg', alt: 'image3' },
    { src: 'images/child4.png', alt: 'image4' },
    { src: 'images/child5.jpg', alt: 'image5' },
    { src: 'images/child6.jpg', alt: 'image6' },
    { src: 'images/child7.jpg', alt: 'image7' },
    { src: 'images/child8.jpg', alt: 'image8' },
    { src: 'images/child9.jpg', alt: 'image9' },
  ];
   const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
   return (
    <>
      <section className="aboutHome">
        <Heading className="about-title" subtitle={t("aboutus")} title={t("about_title")} />
        <div className="container flexSB">
          <div className="row">
            <Carousel>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={image.src} alt={image.alt} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="right row">
            <div className="items">
              {homeAbout.map((val) => {
                return (
                  <div className="item flexSB">
                    <div className="img">
                      <img className="aboutlogo" src={val.cover} alt="" />
                    </div>
                    <div className="text">
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  );
};

  export default AboutCard;