import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";
import axios from 'axios'; 

import GlobeIcon from "../../../GlobeIcon";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';

const Header = () => {
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation();
  const csrftoken = Cookies.get('csrftoken');
  const sessionid = Cookies.get('sessionid');
  const userid = Cookies.get('userid');
  const username = Cookies.get('username');

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const logout = () => { 
    axios.post(`http://127.0.0.1:8000/profile/logout/`) 
      .then(() => { 
        Cookies.remove('csrftoken');
        Cookies.remove('sessionid');
        Cookies.remove('userid');
        Cookies.remove('username');
      }) 
      .catch(error => { 
        console.log(error); 
      }); 
  }; 

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <div>
           
            {userid || sessionid ? (
              <div >
                <ul>
                  <li className='registration' onClick={logout}>Log out</li>
                  <Link to="/settings">
                <img style={{width:'50px'}}
                  src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                  alt=""
                />
              </Link>
              {username && <span className='registration'>{username}</span>}
                </ul>
              
              </div>
              
            ) : (
              <div className='button'>
                <ul>
                  <li>
                    <Link to="/login" className='registration'>Log in</Link>
                  </li>
                  <li>
                    <Link to="/signup" className='registration regBtn'>Sign up</Link>
                  </li>
                </ul>
              </div>
            )}
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
              <Link to='/Community'>{t("community")}</Link>
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
