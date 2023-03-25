import React, { useState } from "react";
// import Heading from "../common/heading/Heading";
import "./about.css";
// import { projectList } from "../../dummydata";
import Awrapper from "./Awrapper";
import { useTranslation } from "react-i18next";
// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the styles

import Slider from "react-draggable-slider";
const AboutCard = () => {
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const projectList = [
    {
      title: "About Us",
      image: "./images/team/t7.webp",
      description:
        "Praesent quis congue nisi. Vivamus dapibus suscipit magna at imperdiet. Mauris consectetur pharetra metus eu suscipit. Maecenas augue tortor, consequat vitae lacus id, pharetra tempor mauris. Suspendisse sodales commodo erat, non imperdiet nisl scelerisque at. Nulla porttitor gravida diam, in ornare ipsum accumsan bibendum. Morbi ut ante metus. "
    },
    {
      title: "Into The Waters",
      image: "./images/team/t3.webp",
      description:
        "Duis at tellus vitae velit aliquet varius. Fusce luctus libero et ligula tristique lobortis. Vestibulum eu placerat risus, eu semper augue. Integer at purus sit amet elit pretium viverra. Suspendisse id fringilla nibh, nec dictum urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. "
    },
    {
      title: "Higher Than The Stars",
      image: "./images/team/t4.webp",
      description:
        "Praesent quis congue nisi. Vivamus dapibus suscipit magna at imperdiet. Maecenas augue tortor, consequat vitae lacus id, pharetra tempor mauris. Suspendisse sodales commodo erat, non imperdiet nisl scelerisque at. Nulla porttitor gravida diam, in ornare ipsum accumsan bibendum. Morbi ut ante metus. Proin rhoncus magna lectus, nec consequat augue ultricies eu."
    },
    {
      title: "Miniature Wonders",
      image: "./images/team/t5.webp",
      description:
        "Praesent quis congue nisi. Vivamus dapibus suscipit magna at imperdiet. Mauris consectetur pharetra metus eu suscipit. Maecenas augue tortor, consequat vitae lacus id, pharetra tempor mauris. Suspendisse sodales commodo erat, non imperdiet nisl scelerisque at. Nulla porttitor gravida diam, in ornare ipsum accumsan bibendum. Morbi ut ante metus. "
    },
    {
      title: "Giants Of History",
      image: "./images/team/t1.webp",
      description:
        "Duis at tellus vitae velit aliquet varius. Fusce luctus libero et ligula tristique lobortis. Vestibulum eu placerat risus, eu semper augue. Integer at purus sit amet elit pretium viverra. Suspendisse id fringilla nibh, nec dictum urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. "
    }
  ];
  
  const sliderSettings = {
    data: projectList,
    speed: 1000,
    
    
  };

  return (
    
    <>
      <section className="aboutHome">

              {/* <Slider sliderSettings={sliderSettings} /> */}

      </section>
      <Awrapper />
    </>
  );
};



export default AboutCard;
