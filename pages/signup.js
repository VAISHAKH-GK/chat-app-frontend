import React, { useState , useEffect } from 'react';
import styles from '../styles/signup.module.css';
import axios from 'axios';  
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';

const Signup = ({ userData }) => {

  const router = useRouter();
  
  const [ userName , setUserName ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ user , setUser ] = useState(null);

  const doSignUp = async () => {
    const data = {
      userName,
      password
    }
    axios.post('http://localhost:9000/api/signup',data).then((response) => {
      if (!response.data.success) console.log(response.data.reason) ;
      else {
        setUser(response?.data?.user);
        router.push('/login');
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (userData) router.push("/");
  },[userData]);

  return (
    <div>
      <NavBar userData={userData} />
      <div className={styles.body} >
        <div id={styles.loginform}>
          <h2 id={styles.headerTitle}>SignUp</h2>
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

  return {
    props:{
      userData
    }
  }
}

export { getServerSideProps };
export default Signup;
