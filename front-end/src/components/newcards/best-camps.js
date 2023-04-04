import "./cards.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BestCard() {
  const [flipped, setFlipped] = useState(false);
  const [courses, setCourses] = useState([]);

  const flip = () => {
    setFlipped(!flipped);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/camps/getbestactivecamps/");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='page-container'>
      {courses.map((val) => (
        <div
          key={val.id}
          onDoubleClick={() => flip()}
          onClick={() => flip()}
          className={"card-container" + (flipped ? " flipped" : "")}>
          <Front val={val} />
          <Back val={val} />
        </div>
      ))}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

function Front({ val }) {
  return (
    <div className='front'>
      <ImageArea val={val} />
      <MainArea val={val} />
    </div>
  );
}

function Back({ val }) {
  const { t, i18n } = useTranslation();

  return (

    <div className='back'>
      <p>
       : {t("camp.details")}
        <br/>
        <span className='back-data1'>
          {val.description}
        </span>
      </p>
      <p>{t("camp.duration")}<span className='back-data1'>{val.duration}</span></p>
      <p>{t("camp.start_time")}<span className='back-data1'>{val.camp_time}</span></p>
      <p>{t("camp.max_enrolment")}<span className='back-data1'>{val.max_num_of_enrolment}</span></p>
      <p>{t("camp.current_enrolment")}<span className='back-data1'>{val.current_num_of_enrolment}</span></p>
      <p>{t("camp.offer")}<span className='back-data1'>{val.offer}</span></p>
      <p>{t("camp.location")} <span className='back-data1'>{val.location_name.name}</span></p>
    </div>
    
  );
}

function ImageArea({ val }) {
  console.log(val.main_Image)
  return (
    
    <div className='image-container'>
      <img className="card-image" src={val.main_Image} alt="img" />
      
      {/* <img className='card-image' src='images/kid1.jpg' alt='' /> */}
      <h1 className='title'>{val.title}</h1>
    </div>
  );
}

function MainArea({ val }) {
  const { t, i18n } = useTranslation();

  return (

<div className='main-area'>
  <div className='blog-post'>
    <p className='date'>
    </p>
    <p className='blog-content'>
      <p>
        {t("camp.category")}:{" "}
        <span className="back-data">
          {val.category_name.name}
        </span>
      </p>

      <p>
        {t("camp.start_date")}:{" "}
        <span className="back-data">
          {val.start_date}
        </span>
      </p>
      <p>
        {t("camp.end_date")}:{" "}
        <span className="back-data">
          {val.end_date}
        </span>
      </p>
    </p>

    <Link
      className=' read-more'
      to={{
        pathname: `/checkout/${val.pk}-${val.price_per_child}`,
        state: { pk: val.pk },
      }}>
      {t("camp.checkout")}
    </Link>
  </div>
</div>

  );
}

export default BestCard;
