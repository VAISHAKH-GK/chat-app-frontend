import React, { useState , useEffect } from 'react';
import styles from '../styles/signup.module.css';
import axios from 'axios';  
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';

const Signup = ({ isLoggedIn }) => {

  const router = useRouter();
  
  const [ userName , setUserName ] = useState("");
  const [ password , setPassword ] = useState("");

  const doSignUp = async (e) => {
    e.preventDefault();
    const data = {
      userName,
      password
    }
    axios.post('http://localhost:9000/api/user/signup',data).then((response) => {
      if (!response.data.success) return console.log(response.data.reason) ;
      router.push('/login');
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if ( isLoggedIn ) {
      router.push("/");
    }
  });

  return (
    <div>
      <NavBar />
      <div className={styles.body} >
        <div id={styles.loginform}>
          <h2 id={styles.headerTitle}>SignUp</h2>
          <form>
            <div className={styles.row}>
              <label>UserName</label>
              <input type="text" value={userName} onChange={ e =>  setUserName(e.target.value) } placeholder="UserName"/>
            </div>
            <div className={styles.row}>
              <label>Password</label>
              <input type="password" value={password} onChange={ e => setPassword(e.target.value) } placeholder="Password"/>
            </div>
            <div id={styles.button} className={styles.row}>
              <button onClick={doSignUp} >SignUp</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export const getServerSideProps = async ({req}) => {
  const cookie = req.headers.cookie ?? "";
  const response = await axios.get("http://localhost:9000/api/user/isloggedin",{headers:{Cookie:cookie },withCredentials:true});
  const isLoggedIn = response.data;
  return {
    props:{
      isLoggedIn
    }
  }
}
export default Signup;
