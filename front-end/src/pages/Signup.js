import { useState } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';

const Signup = () => {
    const { t, i18n } = useTranslation();

  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [username, setusername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const { addToast } = useToasts();
  const auth = useAuth();
  const navigate = useNavigate();
  console.log(navigate);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
  
    let error = false;
    if (!first_name || !last_name || !username || !email || !password || !confirmPassword) {
      addToast('Please fill all the fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }
    if (!/(^[A-Za-z]{3,16})(([ ]{0,1})([A-Za-z]{3,16})([ ]{0,1}))*/.test(first_name)) {
      addToast('Invalid first name, Please Enter name like (john or Ali Ahmed)', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }if (!/(^[A-Za-z]{3,16})(([ ]{0,1})([A-Za-z]{3,16})([ ]{0,1}))*/.test(last_name )) {
      addToast('Invalid last name, Please Enter name like (john or Ali Ahmed)', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }if (!/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/.test(username)) {
      addToast('Invalid username, Please Enter username like (john33)', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      addToast('Invalid email, Please Enter email like (john@gmail.com)', {
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
    if (password !== confirmPassword) {
      addToast('Make sure password and confirm password matches', {
        appearance: 'error',
        autoDismiss: true,
      });
  
      error = true;
    }
  
    if (error) {
      return setSigningUp(false);
    }
  
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
  
    try {
      const response = await fetch('http://127.0.0.1:8000/profile/register/', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        setSigningUp(false);
        navigate('/login');
        return addToast('User registered successfully, please login now', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
  
      throw new Error('Network response was not ok.');
    } catch (err) {
      console.error(err);
      addToast('Error occurred while registering the user', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  
    setSigningUp(false);
  };
  
  if(auth.user){
    return <Navigate to="/" />
  }

  return (

    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}>{t("signups.header")}</span>
      <div className={styles.field}>
        <input
          placeholder={t("signups.firstName")}
          type="text"
          required
          value={first_name}
          onChange={(e) => setfirst_name(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder={t("signups.lastName")}
          type="text"
          required
          value={last_name}
          onChange={(e) => setlast_name(e.target.value)}
        />
      </div>
    
      <div className={styles.field}>
        <input
          placeholder={t("signups.username")}
          type="text"
          required
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder={t("signups.email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder={t("signups.password")}
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder={t("signups.confirmPassword")}
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? t("signups.signingUp") : t("signups.signup")}
        </button>
        <div className="signups-span">
          <span>{t("signups.alreadyHaveAccount")}</span>
          <Link to="/login" className='register'><strong> {t("signups.login")} </strong> </Link>
        </div>
      </div>
    </form>
    
  );
};

export default Signup;
