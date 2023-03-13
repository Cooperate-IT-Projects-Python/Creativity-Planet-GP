import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import Back from "../common/back/Back"
import CoursesCard from "./CoursesCard"
import OnlineCourses from "./OnlineCourses"

const CourseHome = () => {
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <Back title= {t('Camps')}/>
      <CoursesCard />
      <OnlineCourses />
    </>
  )
}

export default CourseHome
