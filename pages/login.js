import React , { useState , useEffect } from 'react';
import styles from "../styles/login.module.css";
import axios from 'axios';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';

const Login = ({isLoggedIn}) => {
  
  const router = useRouter();

  const [ userName , setUserName ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ user , setUser ] = useState(null);

  const doLogIn = (e) => {
    e.preventDefault();
    const data = {
      userName,
      password
    }
    axios.post("http://localhost:9000/api/user/login",data,{withCredentials:true}).then((response) => {
      if (!response?.data?.success) window.alert(response.data.reason);
      else {
        setUser(response.data.user);
        router.push('/');
      }
    });
  }

  useEffect(() => {
    if (isLoggedIn) router.push("/");
  },[]);

  return (
    <div>
      <NavBar />
      <div className={styles.body} >
        <div id={styles.loginform}>
          <h2 id={styles.headerTitle}>Login</h2>
          <form>
            <div className={styles.row}>
              <label>UserName</label>
              <input type="text" placeholder="UserName" value={ userName } onChange={ e => setUserName(e.target.value) } />
            </div>
            <div className={styles.row}>
              <label>Password</label>
              <input type="password" placeholder="Password" value={ password } onChange={ e => setPassword(e.target.value) } />
            </div>
            <div id={styles.button} className={styles.row}>
              <button onClick={doLogIn} >Login</button>
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

export default Login;
