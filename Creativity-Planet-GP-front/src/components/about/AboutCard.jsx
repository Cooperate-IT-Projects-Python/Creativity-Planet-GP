import React, { useState } from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../../dummydata";
import Awrapper from "./Awrapper";
import { useTranslation } from "react-i18next";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the styles
const AboutCard = () => {
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const images = [
    { src: 'images/child1.jpg', alt: 'image1' },
    { src: 'images/child2.jpg', alt: 'image2' },
    { src: 'images/child3.jpg', alt: 'image3' },
    { src: 'images/child4.jpg', alt: 'image4' },
    { src: 'images/child5.jpg', alt: 'image3' },
    { src: 'images/child6.jpg', alt: 'image3' },
    { src: 'images/child7.jpg', alt: 'image3' },
    { src: 'images/child8.jpg', alt: 'image3' },
    { src: 'images/child9.jpg', alt: 'image3' },
    { src: 'images/child10.jpg', alt: 'image3' },
  ];
  return (
    
    <>
      <section className="aboutHome">
        <div className="container flexSB">
          <div className="left row">
              <Carousel>
                {images.map((image, index) => (
                  <div key={index}>
                    <img src={image.src} alt={image.alt} />
                  </div>
                ))}
              </Carousel>
              <div className="items advitem">
                <div className="item flexSB ">
                  <div className="img">
                      <img src="https://img.icons8.com/ios/80/000000/diploma.png" alt="" />
                  </div>
                    <div className="text">
                      <h2>{t("Our advantages")}</h2>
                      
                        <p>
                        
                          <br/>&bull;{t("first-bullet-point")}
                          <br/>&bull;{t("second-bullet-point")}
                          <br/>{t("third-bullet-point")}

                          <br/>&bull;{t("fourth-bullet-point")}

                          <br/>&bull;{t("fifth-bullet-point")}

                          <br/>&bull;{t("sixth-bullet-point")}

                          <br/>&bull;{t("seventh-bullet-point")}

                          <br/>&bull;{t("eighth-bullet-point")}

                          <br/>&bull;{t("ninth-bullet-point")}

                          <br/>&bull;{t("tenth-bullet-point")}

                        </p>
                      
                    </div>
                </div>
                </div>
          </div>
          <div className="right row">
            <Heading subtitle= {t("aboutus")} title={t("about_title")} />
            <div className="items">
              {homeAbout.map((val) => {
                return (
                  <div className="item flexSB">
                    <div className="img">
                      <img src={val.cover} alt="" />
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
