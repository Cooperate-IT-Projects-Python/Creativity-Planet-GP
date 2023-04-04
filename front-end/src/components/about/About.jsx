import React, { useState } from "react";
import "./about.css"
import Back from "../common/back/Back"
import AboutCard from "./AboutCard"
import Contact from "./Contact"
import { useTranslation } from "react-i18next";



const About = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Back title= {t("about")} />
      <AboutCard />
      <Contact />
    </>
  )
}

export default About
