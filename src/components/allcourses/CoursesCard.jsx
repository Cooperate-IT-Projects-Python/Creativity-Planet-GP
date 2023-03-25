// import React from "react"
// import "./courses.css"
// import { coursesCard } from "../../dummydata"

// const CoursesCard = () => {
//   return (
//     <>
//       <section className='coursesCard'>
//         <div className='container grid2'>
//           {coursesCard.map((val) => (
//             <div className='items'>
//               <div className='content flex'>
//                 <div className='left'>
//                   <div className='img'>
//                     <img src={val.cover} alt='' />
//                   </div>
//                 </div>
//                 <div className='text'>
//                   <h1>{val.coursesName}</h1>
//                   <div className='rate'>
//                     <i className='fa fa-star'></i>
//                     <i className='fa fa-star'></i>
//                     <i className='fa fa-star'></i>
//                     <i className='fa fa-star'></i>
//                     <i className='fa fa-star'></i>
//                     <label htmlFor=''>(5.0)</label>
//                   </div>
//                   <div className='details'>
//                     {val.courTeacher.map((details) => (
//                       <>
//                         <div className='box'>
//                           <div className='dimg'>
//                             <img src={details.dcover} alt='' />
//                           </div>
//                           <div className='para'>
//                             <h4>{details.name}</h4>
//                           </div>
//                         </div>
//                         <span>{details.totalTime}</span>
//                       </>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className='price'>
//                 <h3>
//                   {val.priceAll} / {val.pricePer}
//                 </h3>
//               </div>
//               <button className='outline-btn'>ألتحق الآن</button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   )
// }

// export default CoursesCard
import React, { useState, useEffect } from "react";
import "./courses.css";
import { Link } from 'react-router-dom';

const CoursesCard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("http://127.0.0.1:8000/camps/getactivecamps/");
      const data = await res.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <>
      <section className="coursesCard">
        <div className="container grid2">
          {courses.map((val) => (
            <div className="items" key={val.id}>
              <div className="content flex">
                <div className="left">
                  <div className="img">
                    <img src={val.main_Image} alt="" />
                  </div>
                </div>
                <div className="text">
                  <h1>{val.title}</h1>
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <label htmlFor="">(5.0)</label>
                  </div>
                  <div className="details">
                    <div className="box">
                      <div className="para">
                        <h4>{val.category_name.name}</h4>
                      </div>
                    </div>
                    <span>{val.duration}</span>
                  </div>
                </div>
              </div>
              <div className="price">
                <h3>
                  {val.price_per_child} / Child
                </h3>
              </div>
              <button className="outline-btn">
              <Link to={{ pathname: "/checkout", state: { categoryname: val.category_name.name }}}>Checkout</Link>              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CoursesCard;
