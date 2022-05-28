import {useEffect} from 'react';
import NavBar from "../components/NavBar";
import { useRouter } from 'next/router';
import axios from 'axios';



export default function Home({userData}) {
  const router = useRouter();
  
  useEffect(() => {
    if (!userData) router.push("/login");
  },[userData]);

  return (
    <div>
      <NavBar user />
      <h1>Main Page</h1>
    </div>
  )
}

export const getServerSideProps = async ({req}) => {
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

