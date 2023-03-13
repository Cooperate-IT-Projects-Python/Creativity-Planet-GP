import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";
import GlobeIcon from "../../../GlobeIcon";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <div className='button'>
            <Link to='/register' className='registration regBtn'>
              {t("registration")}
            </Link>
            <Link to='/login' className='registration'>
            {t("login")}
            </Link>
          </div>
          <ul className={click ? 'mobile-nav' : 'desktop-nav'}>
          <li>
              <Link to='/contact'>{t("contact")}</Link>
            </li>
            <li>
              <Link to='/team'>{t("team")}</Link>
            </li>
            <li>
              <Link to='/'>{t("store")}</Link>
            </li>
            <li>
              <Link to='/'>{t("community")}</Link>
            </li>
            <li>
              <Link to='/courses'>{t("camps")}</Link>
            </li>
            <li>
              <Link to='/pricing'>{t("packages")}</Link>
            </li>
            <li>
              <Link to='/about'>{t("about")}</Link>
            </li>
            <li>
              <Link to='/'>{t("home")}</Link>
            </li>
          </ul>

          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
