import React, { useState } from "react";
import { blog } from "../../../dummydata";
import "./footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Carousel } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';




function Footer() {

  const images = [
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },
    { url: 'images/child3.jpg' },

  ];


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: 'linear',
    pauseOnHover: true,
  };



const [click, setClick] = useState(false);
const { t, i18n } = useTranslation();

const changeLanguage = (language) => {
  i18n.changeLanguage(language);
};


  return (
    <>
              
              <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={`image${index}`} className="slide-img"/>
        </div>
      ))}
    </Slider>
     

      <section className='newletter'>

        <div className='container flexSB'>
          
          <div className='left row'>

          <h1>{t('newsletter title')}</h1>
          </div>
          <div className='right row'>
          <InputGroup className="mb-3" >
        <Form.Control
          placeholder="ادخل البريد الإلكترني"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          إرسال
        {/* <i className='fa fa-paper-plane'></i> */}
        </Button>
      </InputGroup>

            {/*  */}
          </div>
        </div>
      </section>
      
      <footer>
        <div className='container padding'>
          <div className='box  '>
          <h1 >{t('innovative planet')}</h1>
            <span></span>
            {/* <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p> */}

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box '>
    <h3>{t('about us')}</h3>
    <ul className='qlink'>
      <li>
        <Link to='/terms' style={{ color: "#994199" }}>
          {t('terms and conditions')}
        </Link>
      </li>
      <li>
        <Link to='/privacy-policy' style={{ color: "#994199" }}>
          {t('privacy policy')}
        </Link>
      </li>
      <li>
        <Link to='/reviews' style={{ color: "#994199" }}>
          {t('reviews')}
        </Link>
      </li>
      <li>
        <Link to='/contact-us' style={{ color: "#994199" }}>
          {t('contact us')}
        </Link>
      </li>
      <li>
        <Link to='/happy-kids' style={{ color: "#994199" }}>
          {t('happy kids')}
        </Link>
      </li>
    </ul>
  </div>

  <div className='box link'>
            <h3>{t('categories title')}</h3>
            <ul>
              <li>
                <Link to='/about' style={{ color: "#994199" }}>
                  {t('about academy')}
                </Link>
              </li>
              <li>
                <Link to='/about' style={{ color: "#994199" }}>
                  {t('camps')}
                </Link>
              </li>
              <li>
                <Link to='/courses' style={{ color: "#994199" }}>
                  {t('packages')}
                </Link>
              </li>
              <li>
                <Link to='/journal' style={{ color: "#994199" }}>
                  {t('our community')}
                </Link>
              </li>
              <li>
                <Link to='/pricing' style={{ color: "#994199" }}>
                  {t('store')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className='box last '>
            <h3>{t('questions title')}</h3>
            <ul >
              <li className="cont">
                <i className='fa fa-map'></i>
                {t('questions address')}
              </li>
              <li className="cont">
                <i className='fa fa-phone-alt'></i>
                {t('questions phone')}
              </li>
              <li className="cont">
                <i className='fa fa-paper-plane'></i>
                {t('questions email')}
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
};
export default Footer;
