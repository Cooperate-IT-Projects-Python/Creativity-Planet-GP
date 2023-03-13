import React, { useState } from "react";
import { blog } from "../../../dummydata";
import "./footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Carousel } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




function Footer() {

  const images = [
    { url: 'https://picsum.photos/200/300?random=1' },
    { url: 'https://picsum.photos/200/300?random=2' },
    { url: 'https://picsum.photos/200/300?random=3' },
    { url: 'https://picsum.photos/200/300?random=4' },
    { url: 'https://picsum.photos/200/300?random=5' },
    { url: 'https://picsum.photos/200/300?random=6' },
    { url: 'https://picsum.photos/200/300?random=7' },
    { url: 'https://picsum.photos/200/300?random=8' },
    { url: 'https://picsum.photos/200/300?random=9' },
    { url: 'https://picsum.photos/200/300?random=10' }
  ];


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    pauseOnHover: true
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
          <img src={image.url} alt={`image${index}`} />
        </div>
      ))}
    </Slider>
     

      <section className='newletter'>

        <div className='container flexSB'>
          
          <div className='left row'>

          <h1>{t('newsletter title')}</h1>
          </div>
          <div className='right row'>
            <input type='text' placeholder={t('enter email placeholder')} />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
          <h1>{t('innovative planet')}</h1>
            <span></span>
            {/* <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p> */}

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box'>
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
          <div className='box'>
          <h3>{t('recent post')}</h3>
              {blog.slice(0, 3).map((val) => (
              <div className='items flexSB'>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
          <div className='box last'>
            <h3>{t('questions title')}</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                {t('questions address')}
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                {t('questions phone')}
              </li>
              <li>
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
