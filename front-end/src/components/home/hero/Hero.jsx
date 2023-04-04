import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../common/heading/Heading"
import "./Hero.css"
import { Link } from "react-router-dom"

const Hero = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row1'>
            <Heading className="cart-heading" subtitle={t("welcome to our academy")} title={t("our academy title")} />
            <div className='button btnbook'>
              <Link to='/courses' className='bookLink' style={{backgroundColor:"#0071BC",color:"white",cursor: "pointer" }}>
              {t("Book now")}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
