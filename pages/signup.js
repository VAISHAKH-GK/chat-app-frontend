import React, { useState } from 'react';
import styles from '../styles/signup.module.css';

const Signup = () => {
  
  const [userName,setUserName] = useState();
  const [password,setPassword] = useState();

  return (
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
          <button>SignUp</button>
        </div>
      </div>
    </div>
  )
}

export default Signup;
