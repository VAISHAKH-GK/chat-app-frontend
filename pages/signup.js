import React, { useState , useEffect } from 'react';
import styles from '../styles/signup.module.css';
import axios from 'axios';  

const Signup = () => {
  
  const [ userName , setUserName ] = useState(null);
  const [ password , setPassword ] = useState(null);
  const [ user , setUser ] = useState(null);

  const doSignUp = async () => {
    const data = {
      userName,
      password
    }
    axios.post('http://localhost:9000/api/signup',data).then((response) => {
      if (!response.data.success) console.log(response.data.reason) ;
      else setUser(response?.data?.user);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    console.log(user);
  },[user]);

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
          <button onClick={doSignUp} >SignUp</button>
        </div>
      </div>
    </div>
  )
}

export default Signup;
