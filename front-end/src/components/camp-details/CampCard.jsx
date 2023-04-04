// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const CoursesCard = ({ categoryName }) => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get(
//           "http://127.0.0.1:8000/camps/getactivecamps",
//           {
//             params: {
//               category_name: categoryName,
//             },
//           }
//         );
//         setCourses(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchCourses();
//   }, [categoryName]);

//   return (
//     <>
//       <section className="coursesCard">
//         <div className="container grid2">
//           {courses.map((val, index) => (
//             <div className="items" key={index}>
//               <div className="content flex">
//                 <div className="left">
//                   <div className="img">
//                     <img src={val.main_Image} alt="" />
//                   </div>
//                 </div>
//                 <div className="text">
//                   <h1>{val.title}</h1>
//                   <div className="rate">
//                     <i className="fa fa-star"></i>
//                     <i className="fa fa-star"></i>
//                     <i className="fa fa-star"></i>
//                     <i className="fa fa-star"></i>
//                     <i className="fa fa-star"></i>
//                     <label htmlFor="">(5.0)</label>
//                   </div>
//                   <div className="details">
//                     <div className="box">
//                       <div className="para">
//                         <h4>{val.category_name.name}</h4>
//                       </div>
//                     </div>
//                     <span>{val.duration}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="price">
//                 <h3>{val.price_per_child} / Child</h3>
//               </div>
//               <button className="outline-btn">
//                 <Link
//                   to={{
//                     pathname: "/CampDetails",
//                     state: { categoryname: val.category_name.name },
//                   }}
//                 >
//                   Join now
//                 </Link>
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// export default CoursesCard;

