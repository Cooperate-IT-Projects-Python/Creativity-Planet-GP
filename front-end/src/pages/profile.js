import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./UserProfilePage.css";
import Cookies from "js-cookie";
 const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
   useEffect(() => {
    
    axios
      .get(`http://127.0.0.1:8000/profile/myprofile/${Cookies.get('userid')}`,null,{withCredentials: true})
      .then(response => {
          setPosts(response.data.posts);
          console.log(response.data.posts)
        })
      .catch((error) => {
        console.log(error);
      });
  }, []);
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
   return (
    <div className='user-profile-page '>
      <div className='user-info'>
        <img className='profileImg' src='images/team/t5.webp' alt='img' />
        <div className='info'>
          <h1>{Cookies.get("first_name")}{Cookies.get("last_name")}</h1>
          <p>
            <strong>Email:</strong> {Cookies.get("email")}
          </p>
        </div>
      </div>
       <div className='user-posts'>
        <h2>My Posts</h2>
        <Slider {...settings}>
          {posts.map((post) => ( 
            <div className="post" key={post.id}>
              <h3>{post.title}</h3> 
              <p>{post.content}</p> 
              {post.main_Image && (
                <img className="postImg" src={`http://127.0.0.1:8000${post.main_Image}`} alt="img"/>
              )}
              <br/>
              <small>{post.created_at}</small>
            </div> 
          ))} 
        </Slider>
      </div>
    </div>
  );
};
 export default UserProfilePage;