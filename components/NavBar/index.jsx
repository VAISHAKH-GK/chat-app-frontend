import styles from '../../styles/NavBar.module.css';
import React,{useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavBar = ({userData}) => {
  
  const router = useRouter();

  const logout = () => {
    axios.get("http://localhost:9000/api/logout",{withCredentials:true}).then((responcse) => {
      router.push("/login");
    });
  }

  useEffect(() => {
    console.log("navbar userData")
    console.log(userData);
  },[userData])

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="#">Home</Link>
            </li>
          </ul>
          {
            (userData)  ?  <button onClick={logout} className="btn btn-success" >Logout</button> : ""
          }
          {
            (!userData) ?  <button onClick={e => router.push("/signup")} className=" me-2 btn btn-success " >SignUp</button> : ""
          }
          {
            (!userData) ?  <button onClick={e => router.push("/login")} className="btn btn-success" >Login</button> : ""
          }
        </div>
      </div>
    </nav>
  )
}



export default NavBar;