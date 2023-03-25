import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Auth.css";
import Logo from "../../UserProfile/img/logo.png"
import axios from './api/axios';
import { Link } from "react-router-dom";

const USER_REGEX =  /\S+@\S+\.\S+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Auth = () => {
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      <LogIn/>
    </div>
  );
};
function LogIn() {
  const userRef = useRef();
  const errRef = useRef();
  
  const [user, setUser] = useState('');
  const [ValidEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  
  
  
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  

  
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
      userRef.current.focus();
  }, [])
  
  useEffect(() => {
      setValidEmail(USER_REGEX.test(user));
  }, [user])
  

  
  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd])
  
  useEffect(() => {
      setErrMsg('');
  }, [user, pwd])
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      // if button enabled with JS hack
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);

  
  
      if (!v1 || !v2  ) {
          setErrMsg("Invalid Entry");
          return;
      }
      try {
          const response = await axios.post(REGISTER_URL,
              JSON.stringify({ user, pwd }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );
          console.log(response?.data);
          console.log(response?.accessToken);
          console.log(JSON.stringify(response))
          setSuccess(true);
          //clear state and controlled inputs
          //need value attrib on inputs for this

          setUser('');
          setPwd('');
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 409) {
              setErrMsg('Email Taken');
          } else {
              setErrMsg('Login Failed')
          }
          errRef.current.focus();
      }
  }
  
  return (
      <>
          {success ? (
              <section>
                  <h1>Success!</h1>
                  <p>
                      <Link to="#">Home</Link>
                  </p>
              </section>
          ) : (
              <section>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <h1>Login</h1>
                  <form onSubmit={handleSubmit}>
                 
  
  
  
  
  
                      <label htmlFor="Email">
                          Email:
                          <FontAwesomeIcon icon={faCheck} className={ValidEmail ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={ValidEmail || !user ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="text"
                          id="Email"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                          aria-invalid={ValidEmail ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                      />
                      <p id="uidnote" className={userFocus && user && !ValidEmail ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          Email is not valid
                          {/* 4 to 24 characters.<br />
                          Must begin with a letter.<br />
                          Letters, numbers, underscores, hyphens allowed. */}
                      </p>
  {/* ////////////////////////////////////////////////////////////////// */}
  
  
  
                      <label htmlFor="password">
                          Password:
                          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                      </label>
                      <input
                          type="password"
                          id="password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                          aria-invalid={validPwd ? "false" : "true"}
                          aria-describedby="pwdnote"
                          onFocus={() => setPwdFocus(true)}
                          onBlur={() => setPwdFocus(false)}
                      />
                      <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>
  
  
                      
  
                      <button disabled={!ValidEmail || !validPwd ? true : false}>Login</button>
                  </form>
                  <p>
                      Create Account<br />
                      <span className="line">
                          {/*put router link here*/}
                          <Link to="#">sign up</Link>
                      </span>
                  </p>
              </section>
          )}
      </>
  )
  

  }

export default Auth;
