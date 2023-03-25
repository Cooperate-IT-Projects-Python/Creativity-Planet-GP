import React from "react";
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import i18n from '../../../i18n';
import GlobeIcon from '../../../GlobeIcon';
import i18next from 'i18next';
import cookies from 'js-cookie';
const languages = [

  {
    code: 'en',
    name: 'العربية',
    country_code: 'gb'
  },
  {
    code: 'ar',
    name: 'ُEnglish',
    country_code: 'jo'
  }
]
const Head = () => {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find(l => l.code === currentLanguageCode)
  const { t } = useTranslation()

 
  // Add an event listener that updates the body direction on language change
  i18n.on('languageChanged', (lng) => {
    if (lng === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  });

  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='social'>
          <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <GlobeIcon />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <span className='dropdown-item-text'>{t('language')}</span>
            </li>
            {languages.map(({code, name, country_code}) => (
              <li key={country_code}>
                <button
                  className="dropdown-item langitem"
                  onClick={() => i18next.changeLanguage(code)}
                  disabled={code === currentLanguageCode}  
                >
                  <span 
                    className={`fi fi-${country_code} mx-2`}
                    style={{
                      opacity: currentLanguageCode === code ? 0.5 : 1,
                    }}
                  ></span>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
          
          <div className='d-flex justify-content-end'>
          <div className='logo'>
            <img className="logo" src="./images/blog/logo.png" alt="logo"/>
          </div>
      </div>
        </div>
      </section>
    </>
  )
}

export default Head;
