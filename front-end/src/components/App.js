import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "../../src/App.css";

import { Home, Login, Signup, Settings, UserProfile } from "../pages";
import { Loader, Navbar } from "./";
import { useAuth } from "../hooks";

import Header from "./common/header/Header";

import About from "./about/About";
import CourseHome from "./allcourses/CourseHome";
import CampCard from "./camp-details/CampCard";
import Team from "./team/Team";
import Pricing from "./pricing/Pricing";
import Blog from "./blog/Blog";
import Contact from "./contact/Contact";
import Footer from "./common/footer/Footer";
import MyHome from "./home/Home";
import Checkout from "./checkout/Checkout";
import PersonalProfile from "../pages/profile";
import BlogCard from "./newcards/new-cards";
import PostList from "./Post";

import CheckoutMethod from "./checkout/CheckoutMethod";

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  // return <Route
  // {...rest}

  //  render={()=>{
  if (auth.user) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }

  //  }}
  // />
}

// const About =() =>{

//   return <h1>About</h1>;

// };

const UserInfo = () => {
  return <h1>User</h1>;
};
const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className='App'>
        {/* <Navbar /> */}
        <Header />
        <Routes>
          <Route path='/' element={<MyHome />} />
          <Route path='/about' element={<About />} />
          <Route path='/pricing' element={<Pricing />} />
          {/* <Route  path='/courses' element={<CourseHome/>} /> */}
          <Route path='/courses' element={<BlogCard />} />
          <Route path='/CampDetails' element={<CampCard />} />
          <Route path='/team' element={<Team />} />
          <Route path='/journal' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/checkout/:pk/' exact Component={Checkout} />
          <Route path='/checkoutmethod' exact Component={CheckoutMethod} />

          <Route path='/community' element={<Home posts={[]} />}>
            {/* <Route path="/community" element={<PostList />}> */}
          </Route>

          <Route path='/login' element={<Login />}></Route>

          <Route path='/signup' element={<Signup />}></Route>

          <Route
            path='/settings'
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }></Route>

          {/* <Route path="/user/:userId" element={<UserProfile />}> */}
          <Route path='/userprofile' element={<PersonalProfile />}></Route>

          {/* <Route path="/about" element={<About />}>
     
      </Route> */}

          <Route path='/user/asdasd' element={<UserInfo />}></Route>

          <Route path='/page404' element={<Page404 />}></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
