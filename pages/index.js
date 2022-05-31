import { useEffect , useContext} from 'react';
import NavBar from "../components/NavBar";
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/index.module.css';
import { UserContext } from '../stores/userContext';



export default function Home({isLoggedIn}) {
  
  const { user , setUser } = useContext(UserContext);

  const router = useRouter();
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (!user) {
      axios.get("http://localhost:9000/api/getuserdata",{withCredentials:true}).then((response) => {
        console.log("main page");
        console.log(response.data)
        const userData = response.data;
        setUser(userData);
      });
    }

  },[isLoggedIn]);

  return (
    <div>
      <NavBar />
      <div className={styles.test} >
        <h1>Main Page</h1>
        <button className={`btn btn-success ${styles.button}`} > sample button </button>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({req}) => {
  const cookie = req.headers.cookie ?? "";
  const response = await axios.get("http://localhost:9000/api/isloggedin",{headers:{Cookie:cookie },withCredentials:true});
  const isLoggedIn = response.data;
  return {
    props:{
      isLoggedIn
    }
  }
}

