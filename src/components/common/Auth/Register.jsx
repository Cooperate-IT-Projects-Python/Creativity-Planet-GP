import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Auth.css";
import axios from './api/axios';
import { Link } from "react-router-dom";
import Logo from "../../UserProfile/img/logo.png"

const USERName_REGEX = /^[a-zA-Z]+$/;

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
      <SignUp/>
    </div>
  );
};

function SignUp() {
  // const [image, setImage] = useState(null);
  // const fileInputRef = useRef(null);

  // const handleClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
  //   if (file && allowedTypes.includes(file.type)) {
  //     setImage(file);
  //   } else {
  //     setImage(null);
  //   }
  // };



  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   // First, validate the inputs
  //   if (!validateInputs()) {
  //     return;
  //   }
  
    // Then, handle the form submission
    // ...
  // };
  
  // const validateInputs = () => {
  //   const firstname = document.getElementsByName('firstname')[0].value.trim();
  //   const lastname = document.getElementsByName('lastname')[0].value.trim();
  //   const email = document.getElementsByName('email')[0].value.trim();
  //   const tel = document.getElementsByName('tel')[0].value.trim();
  //   const password = document.getElementsByName('password')[0].value.trim();
  //   const confirmpass = document.getElementsByName('confirmpass')[0].value.trim();
  
  //   // Check if first name is not empty and only contains letters
  //   if (!/^[a-zA-Z]+$/.test(firstname)) {
  //     alert("First name is invalid");
  //     return false;
  //   }
  
  //   // Check if last name is not empty and only contains letters
  //   if (!/^[a-zA-Z]+$/.test(lastname)) {
  //     alert('Last name is invalid');
  //     return false;
  //   }
  
  //   // Check if email is not empty and is a valid email address
  //   if (!email || !/\S+@\S+\.\S+/.test(email)) {
  //     alert('Email is invalid');
  //     return false;
  //   }
  
  //   // Check if phone number is not empty and is a valid Egyptian phone number
  //   if (!tel || !/^\+201[0-9]{9}$/.test(tel)) {
  //     alert('Phone number is invalid');
  //     return false;
  //   }
  
  //   // Check if password is at least 8 characters long
  //   if (password.length < 8) {
  //     alert('Password must be at least 8 characters long');
  //     return false;
  //   }
  
  //   // Check if password and confirm password match
  //   if (password !== confirmpass) {
  //     alert('Passwords do not match');
  //     return false;
  //   }
  
  //   // All inputs are valid
  //   return true;
  // };
//   const { register, handleSubmit, formState: { errors } } = useForm();
  
//   const onSubmit = (data) => {
//     console.log(data);

  
//   return (
//     <div className="a-right">
//         <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" placeholder="Email" {...register("username", { required: true, minLength: 6 })} />
//       {errors.username && errors.username.type === "required" && <span>This field is required</span>}
//       {errors.username && errors.username.type === "minLength" && <span>Username must be at least 6 characters</span>}
//       <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 8 })} />
//       {errors.password && errors.password.type === "required" && <span>This field is required</span>}
//       {errors.password && errors.password.type === "minLength" && <span>Password must be at least 8 characters</span>}
//       <button type="submit">Sign Up</button>
//       </form>

//       {/* <form  onSubmit={handleSubmit} className="infoForm authForm">
//         <h3>Sign up</h3>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <img
//             src={image ? URL.createObjectURL(image) : 'https://via.placeholder.com/150'}
//             alt="Selected image"
//             style={{ maxWidth: '100%',marginTop:"100px", maxHeight: '200px', cursor: 'pointer', borderRadius:'50%'}}
//             onClick={handleClick}
//           />
         
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//           />
//         </div>
//         <div style={{marginTop:"130px"}}>
//           <input
//             type="text"
//             placeholder="First Name"
//             className="infoInput"
//             name="firstname"
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             className="infoInput"
//             name="lastname"

//           />
//         </div>

//         <div>
//             <input
//               type="email"
//               placeholder="Email"
//               className="infoInput"
//               name="email"
//             /> <input
//             type="tel"
//             placeholder="Phone Numper"
//             className="infoInput"
//             name="tel"
//           />
//           </div>
          
//         <div>
//           <input
//             type="password"
//             className="infoInput"
//             name="password"
//             placeholder="Password"
//           />
//           <input
//             type="password"
//             className="infoInput"
//             name="confirmpass"
//             placeholder="Confirm Password"
//           />
//         </div>

//         <div>
//             <span style={{fontSize: '12px'}}>Already have an account. Login!</span>
//         </div>
//         <button className="button infoButton"  type="submit">Signup</button>
//       </form> */}
//     </div>
//   );
// }
const userRef = useRef();
const errRef = useRef();

const [user, setUser] = useState('');
const [ValidEmail, setValidEmail] = useState(false);
const [userFocus, setUserFocus] = useState(false);


const [userfname, setUserfname] = useState('');
const [ValidFirstName, setValidFirstName] = useState(false);
const [userFocusfname, setUserFocusfname] = useState(false);


const [userlname, setUserlname] = useState('');
const [ValidLastName, setValidLastName] = useState(false);
const [userFocuslname, setUserFocuslname] = useState(false);





const [pwd, setPwd] = useState('');
const [validPwd, setValidPwd] = useState(false);
const [pwdFocus, setPwdFocus] = useState(false);

const [matchPwd, setMatchPwd] = useState('');
const [validMatch, setValidMatch] = useState(false);
const [matchFocus, setMatchFocus] = useState(false);

const [errMsg, setErrMsg] = useState('');
const [success, setSuccess] = useState(false);

useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setValidEmail(USER_REGEX.test(user));
}, [user])

useEffect(() => {
  setValidFirstName(USERName_REGEX.test(userfname));
}, [userfname])

useEffect(() => {
  setValidLastName(USERName_REGEX.test(userlname));
}, [userlname])

useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
}, [pwd, matchPwd])

useEffect(() => {
    setErrMsg('');
}, [user,userfname,userlname, pwd, matchPwd])

const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = USERName_REGEX.test(userlname);
    const v4 = USERName_REGEX.test(userfname);


    if (!v1 || !v2  || !v3 || !v4) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
        const response = await axios.post(REGISTER_URL,
            JSON.stringify({ user,userfname,userlname, pwd }),
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
        setUserlname('');
        setUserfname('');

        setUser('');
        setPwd('');
        setMatchPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Email Taken');
        } else {
            setErrMsg('Registration Failed')
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
                    <Link to="#">Sign In</Link>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                <label htmlFor="FirstName">
                        FirstName:
                        <FontAwesomeIcon icon={faCheck} className={ValidFirstName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={ValidFirstName || !userfname ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="FirstName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUserfname(e.target.value)}
                        value={userfname}
                        required
                        aria-invalid={ValidFirstName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocusfname(true)}
                        onBlur={() => setUserFocusfname(false)}
                    />
                    <p id="uidnote" className={userFocusfname && userfname && !ValidFirstName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        FirstName is not valid
                        {/* 4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed. */}

                    </p>
                    
                     <label htmlFor="LastName">

                        LastName:
                        <FontAwesomeIcon icon={faCheck} className={ValidLastName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={ValidLastName || !userlname ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="LastName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUserlname(e.target.value)}
                        value={userlname}
                        required
                        aria-invalid={ValidLastName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocuslname(true)}
                        onBlur={() => setUserFocuslname(false)}
                    />
                    <p id="uidnote" className={userFocuslname && userlname && !ValidLastName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        LastName is not valid
                        {/* 4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed. */}
                    </p>







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


                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button disabled={!ValidEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>
                </form>
                <p>
                    Already registered?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <Link to="#">Sign In</Link>
                    </span>
                </p>
            </section>
        )}
    </>
)

}
export default Auth;
