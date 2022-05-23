import React , { useState } from 'react';
import styles from "../styles/login.module.css";

const Login = () => {

  const [ userName , setUserName ] = useState();
  const [ password , setPassword ] = useState();

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
          <button>Login</button>
        </div>
      </div>  
    </div>
  )
}

export default Login;
