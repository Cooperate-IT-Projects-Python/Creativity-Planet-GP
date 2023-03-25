import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Back from "../common/back/Back"
import "./contact.css"


const Contact = () => {
  const { t, i18n } = useTranslation();

const changeLanguage = (language) => {
  i18n.changeLanguage(language);
};
  const map = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
  return (
    <>
      <Back title={t("contact")} />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          
          <div className='right row'>
            <h1>{t("contact")}</h1>
            <p>   {t("contact us title")}</p>

            <div className='items grid2'>
              <div className='box'>
                <h4>{t("address")}</h4>
                <p>{t("address title")}</p>
              </div>
              <div className='box'>
                <h4> {t("email")}</h4>
                <p> cpa@gmail.com</p>
              </div>
              <div className='box'>
                <h4>{t("phone")}</h4>
                <p> + 01235 2355 98</p>
              </div>
            </div>

            <form action=''>
              <div className='flexSB'>
                <input type='text' placeholder={t("full name")} />
                <input type='email' placeholder={t("email")} />
              </div>
              <input type='text' placeholder={t("subject")} />
              <textarea cols='30' rows='10' placeholder={t("leave a message")}>
                
              </textarea>
              <button className='primary-btn cbtn'>{t("send")}</button>
            </form>

            <h3>{t("subscribe")} </h3>
            <span>FACEBOOK  INSTAGRAM </span>
          </div>
          <div className='left row'>
            <iframe src={map}></iframe>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
