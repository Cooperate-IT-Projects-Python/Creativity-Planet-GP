import React, { useState } from "react";
import { blog } from "../../../dummydata";
import "./footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Carousel } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Footer() {
  const images = [
   
    { url: "images/review2.jpg" },
    { url: "images/review3.jpg" },
    { url: "images/review4.jpg" },
    { url: "images/review5.jpg" },
    { url: "images/review6.jpg" },
    { url: "images/review7.jpg" },
    { url: "images/review8.jpg" },
    { url: "images/review9.jpg" },
    { url: "images/review12.jpg" },
    { url: "images/review14.jpg" },
    { url: "images/review15.jpg" },
    { url: "images/review16.jpg" },
    { url: "images/review17.jpg" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
    
      <Slider className='slider-div' {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt={`image${index}`} className='slide-img' />
          </div>
        ))}
      </Slider>

      <footer>
        <div className='container py-4'>
          <div className='box  title-icon '>
            <h2 className="pb-4"> {t("innovative planet")}</h2>
            <a
              href='https://www.facebook.com/creativityplanet8'
              target='_blank'>
              <i className='fab fa-facebook-f icon'></i>
            </a>
            <a 
              href='https://www.youtube.com/channel/UCh2_FImPlbQWQy9oVN9MTlA'
              target='_blank'>
              <i className='fab fa-youtube icon'></i>
            </a>
            <a
              href='https://www.instagram.com/creativity_planet_academy/'
              target='_blank'>
              <i className='fab fa-instagram icon'></i>
            </a>
          </div>
          <div className='box  link px-5'>
            <h3>{t("about us")}</h3>
            <ul className='qlink'>
              <li>
                <Link to='/about' style={{ color: "#994199" }}>
                  {t("about academy")}
                </Link>
              </li>

              <li>
                <Link to='/team' style={{ color: "#994199" }}>
                  {t("teams")}
                </Link>
              </li>
              <li>
                <Link to='/community' style={{ color: "#994199" }}>
                  {t("our community")}
                </Link>
              </li>
            </ul>
          </div>

          <div className='box link  px-5'>
            <h3>{t("categories title")}</h3>
            <ul>
              <li>
                <Link to='/courses' style={{ color: "#994199" }}>
                  {t("Camps")}
                </Link>
              </li>
              <li>
                <Link to='/pricing' style={{ color: "#994199" }}>
                  {t("packages")}
                </Link>
              </li>

              <li>
                <Link to='/userprofile' style={{ color: "#994199" }}>
                  {t("userprofile")}
                </Link>
              </li>
            </ul>
          </div>

          <div className='box  last   px-5'>
            <h3>{t("questions title")}</h3>
            <ul>
              <li className='cont'>
                <i className='fa fa-map'></i>
                {t("questions address")}
              </li>
              <li className='cont'>
                <i className='fa fa-phone-alt'></i>
                {t("questions phone")}
              </li>
              <li className='cont'>
                <i className='fa fa-paper-plane'></i>
                {t("questions email")}
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2023 All rights reserved by{" "}
          <span className='cpa-span'>CPA</span> Team
        </p>
      </div>
    </>
  );
}
export default Footer;
