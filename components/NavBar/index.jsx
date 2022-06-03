import styles from '../../styles/NavBar.module.css';
import React , { useEffect , useContext} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Context } from '../../stores/Context';

const NavBar = () => {
  
  const router = useRouter();

  const { user , setUser } = useContext(Context);

  const logout = () => {
    axios.get("http://localhost:9000/api/user/logout",{withCredentials:true}).then((responcse) => {
      setUser(null);
      router.push("/login");
    });
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <h1 className={`${styles.navbarBrand}`} href="/" >Chat App</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          {
            (user)  ?  <button onClick={logout} className="btn btn-success" >Logout</button> : ""
          }
          {
            (!user) ?  <button onClick={e => router.push("/signup")} className=" me-2 btn btn-success " >SignUp</button> : ""
          }
          {
            (!user) ?  <button onClick={e => router.push("/login")} className="btn btn-success" >Login</button> : ""
          }
        </div>
      </div>
    </nav>
  )
}



export default NavBar;
