import React, { useState } from "react";
import { useTranslation } from "react-i18next";import Heading from "../common/heading/Heading"
import PriceCard from "../pricing/PriceCard"

const Hprice = () => {
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <section className='hprice padding'>
      {/* <Heading subtitle={t('pricing subtitle')} title={t('pricing title')} /> */}
        <div className='price container grid'>
          <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Hprice
