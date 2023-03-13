import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./about.css"
import Back from "../common/back/Back"
import AboutCard from "./AboutCard"

const About = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <Back title={t("aboutus")}
 />
      <AboutCard />
    </>
  )
}

export default About
