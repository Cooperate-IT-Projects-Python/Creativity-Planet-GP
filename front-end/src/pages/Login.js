import { useState } from 'react';
import { json, Navigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Cookies from 'js-cookie'; // import js-cookie

import styles from '../styles/login.module.css';
// import { useAuth } from '../hooks';
import { Card, CardHeader, CardContent, CardActions, Button, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'; 
import axios from 'axios'; 
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const csrftoken = Cookies.get('csrftoken');
const sessionid = Cookies.get('sessionid');
const userid = Cookies.get('userid');
const usernames = Cookies.get('username');
  // const auth = useAuth();



  // function handleSubmit(event) {
  //   event.preventDefault();

  //   // Create an object representing the form data
  //   const formData = {
  //     username: username,
  //     password: password
  //   };

  //   // Make a POST request to the API using fetch()
  //   fetch('http://127.0.0.1:8000/profile/login/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     body: new URLSearchParams(formData)
  //   })
  //   .then(response => {
  //     if(response.ok) {
  //       // Valid user credentials, do something here
  //     } else {
  //       // Invalid user credentials, do something here
  //     }
  //   });
  // }
  const handleDeleteConfirm = () => { 
    axios.post(`http://127.0.0.1:8000/profile/logout/`) 
      .then(() => { 
       
      }) 
      .catch(error => { 
        console.log(error); 
      }); 
  }; 



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    let error = false;
    if (!username || !password) {
      addToast('Please fill all the fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }
    if (!/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/.test(username)) {
      addToast('Invalid username, Please Enter username like (john33)', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      addToast('Invalid password, Please Enter password at least contains 8 characters like (User1234) ', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }


    if (error) {
      return setLoggingIn(false);
    }
    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    try {
      var userdata = ""
      
      const response = await fetch('http://127.0.0.1:8000/profile/login/', {
        method: 'POST',
        body: formData,
      }).then(response => response.json()).then((json) => {
        console.log(JSON.stringify(json));
        if (json.user_id) {
          userdata = {
            user_id: json.user_id,
            username: json.username
          };
          Cookies.set('csrftoken', json.csrftoken);
          Cookies.set('sessionid', json.sessionid);
          Cookies.set('userid', json.user_id);
          Cookies.set('usernames', json.username);
          Cookies.set('email', json.email);
          Cookies.set('first_name', json.first_name);
          Cookies.set('last_name', json.last_name);
          // Cookies.set('user', json.user);
          console.log(json.user);
          setLoggingIn(false);
          addToast('User login successfully', {
            appearance: 'success',
            autoDismiss: true,
          });    
          window.location.href = '/';
          return;
        }
  
      })

     

    throw new Error('Network response was not ok.');
    } catch (err) {
      console.error(err);
      addToast('Error occurred while registering the user', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    setLoggingIn(false);
  };



  // if(auth.user){
  //   return <Navigate to="/" />
  // }
  const { t, i18n } = useTranslation();


  return (


    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>{t("logins.header")}</span>
    
      <div className={styles.field}>
        <input
          type="username"
          placeholder={t("logins.usernamePlaceholder")}
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </div>
    
      <div className={styles.field}>
        <input
          type="password"
          placeholder={t("logins.passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    
      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? t("logins.loggingIn") : t("logins.logIn")}
        </button>
        <div className="signup-span"><span>{t("logins.noAccount")}</span><Link to="/signup" className='register'><strong> {t("logins.signUp")}</strong> </Link></div>
      </div>
    </form>
    
  );
};

export default Login;
