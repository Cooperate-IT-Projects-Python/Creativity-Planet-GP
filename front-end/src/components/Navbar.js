import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { searchUsers } from '../api';

const Navbar = () => {
  const [results,setResults]=useState([]);
  const [searchText,setSearchText]=useState('');
  const auth = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() =>{
  
    const fetchUsers =async()=>{
      const response = await searchUsers(searchText)
       if(response.success){
        setResults(response.data.users);
       }
    };
    
    if(searchText.length>2)
    {
   fetchUsers();
    }
    else{
      setResults([]);
    }
  },[searchText]);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
   
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>



      <div className={styles.searchContainer}>
        <img 
        className={styles.searchIcon}
         src="https://cdn-icons-png.flaticon.com/512/954/954591.png" 
         alt="" />

        <input 
        placeholder="Search users" 
        value={searchText} 
        onChange={(e)=>setSearchText(e.target.value)}/>

      

       {results.length > 0 && (
       <div className={styles.searchResults}>
       <ul>
        { results.map((user => <li 
        className={styles.searchResultsRow}
         key={`user-${user._id}`}
         >
          <Link to={`/user/${user._id}`}>

            <img src="https://cdn-icons-png.flaticon.com/512/954/954591.png" 
            alt="" 
            />

            <span>{user.name}</span>
           
          </Link>

        </li>
        ))}
       </ul>
      </div>
      )}
      </div>




      <div className={styles.rightNav}>
      {auth.user && (
        <div className={styles.user} onClick={toggleDropdown}>
          <Link to="/userProfile">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
              alt=""
              className={styles.userDp}
            />
          </Link>
          <span onClick={auth.logout} >{auth.user.name}</span>

          
        </div>
      )}

      <div className={styles.navLinks}>
        <ul>
          {auth.user ? (
            <></>
          ) : (
            <>
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  

    </div>
  );
};

export default Navbar;
