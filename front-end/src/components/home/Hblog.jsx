import React, { useState ,useEffect} from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../blog/blog.css"
import { blog } from "../../dummydata"
import Heading from "../common/heading/Heading"

// copy code of blog => blogCard

const Hblog = () => {
  const [click, setClick] = useState(false);
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/community/posthot/");
        const data = await res.json();
        setPosts(data);
        console.log(data)
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section className='blog'>
        <div className='container'>
        <Heading subtitle={t('our posts subtitle')} />
          <div className='grid2'>
            {posts.slice(0, 3).map((post) => (

              <div className='items shadow'>
                <div className='img'>
                {post.main_Image && (
                <img className="postImg" src={post.main_Image} alt="img"/>
              )}
                </div>
                <div className='text'>
                  <div className='admin flexSB'>
                    <span>
                      <i className='fa fa-user'></i>
                      <label htmlFor=''>{post.post_owner["username"]}</label>
                    </span>
                    <span>
                      <i className='fa fa-calendar-alt'></i>
                      <label htmlFor=''>{post.created_at}</label>
                    </span>
                    <span>
                      <i className='fa fa-comments'></i>
                      <label htmlFor=''>{post.num_comments} {t("Comments")}</label>
                    </span>
                  </div>
                  <h1>{post.title}</h1>
                  <p>{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Hblog
