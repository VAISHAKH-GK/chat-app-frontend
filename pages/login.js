import React , { useState , useEffect } from 'react';
import styles from "../styles/login.module.css";
import axios from 'axios';

const Login = () => {

  const [ userName , setUserName ] = useState(null);
  const [ password , setPassword ] = useState(null);
  const [ user , setUser ] = useState(null);

  const dolLogIn = () => {
    const data = {
      userName,
      password
    }
    axios.post("http://localhost:9000/api/login",data).then((response) => {
      if (!response?.data?.success) console.log(response.data.reason);
      else setUser(response.data.user);
    });
  }

  useEffect(() => {
    console.log(user);
  },[user])

  return (

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
  )
}

export default Login;
