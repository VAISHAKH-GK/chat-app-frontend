import React , { useState , useEffect } from 'react';
import styles from "../styles/login.module.css";
import axios from 'axios';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';

const Login = ({userData}) => {
  
  const router = useRouter();

  const [ userName , setUserName ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ user , setUser ] = useState(null);

  const dolLogIn = () => {
    const data = {
      userName,
      password
    }
    axios.post("http://localhost:9000/api/login",data,{withCredentials:true}).then((response) => {
      if (!response?.data?.success) console.log(response.data.reason);
      else {
        setUser(response.data.user);
        console.log("hai")
        router.push('/');
      }
    });
  }

  useEffect(() => {
    console.log("useeffect  " + userData);
    if (userData) router.push("/");
  },[userData]);

  return (
    <div>
      <NavBar userData={userData} />
      <div className={styles.body} >
        <div id={styles.loginform}>
          <h2 id={styles.headerTitle}>Login</h2>
          <div className={styles.row}>
            <label>UserName</label>
            <input type="text" placeholder="UserName" value={ userName } onChange={ e => setUserName(e.target.value) } />
          </div>
          <div className={styles.row}>
            <label>Password</label>
            <input type="password" placeholder="Password" value={ password } onChange={ e => setPassword(e.target.value) } />
          </div>
          <div id={styles.button} className={styles.row}>
            <button onClick={dolLogIn} >Login</button>
          </div>
        </div>  
      </div>
    </div>
  )
}

const getServerSideProps = async ({req}) => {
  const cookie = req.headers.cookie ?? "";
  const response = await axios.get("http://localhost:9000/api/getuserdata",{headers:{Cookie:cookie },withCredentials:true});
  const userData = response.data;
  console.log(response.data);
  console.log("login")

  return {
    props:{
      userData
    }
  }
}

export default Login;
export { getServerSideProps } ;
