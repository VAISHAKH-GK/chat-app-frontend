import axios from 'axios';
import { useEffect , useContext , useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../stores/userContext';
import NavBar from "../components/NavBar";
import MessageSection from '../components/MessageSection'
import styles from '../styles/index.module.css';



export default function Home({isLoggedIn}) {
  
  const { user , setUser , users , setUsers } = useContext(UserContext);
  const [ loading , setLoading ] = useState(true);

  const router = useRouter();
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (!user) {
      axios.get("http://localhost:9000/api/user/getuserdata",{withCredentials:true}).then((response) => {
        setLoading(false);
        setUser(response.data);
      });
    } else {
      setLoading(false);
    }

  },[isLoggedIn]);
  
  useEffect(() => {
    axios.get("http://localhost:9000/api/user/getusers",{withCredentials:true}).then((response) => {
      if( !response.data ) {
        setUser(null);
        router.push("/login");
      } else {
        setUsers(response.data);
      }
    });
  },[]);

  const LoadingComponent = () => {
    return  (
      <div >
        <h1 className={`${styles.loading}`} > Loading ....  </h1>
      </div>
    )
  }

  const Chats = () => {
    return (
      <div>
        {
          users.map((value,index) => {
            return (
                <button type="button" className={`${styles.chat}`} key={index} onClick={() => console.log(value._id)} > {value.userName} </button>
            )
          })
        }
      </div>
    )
  }

  const MainComponent = () => {
    return (
      <div>
        <NavBar />
        <main className={`${styles.root}`} >
          <section className={`container`} >
            <div className={`${styles.main}`} >
              <section className={`${styles.chatApp}`} >
                <section className={`${styles.sectionOne}`} >
                  <div className={`${styles.leftMainSection}`} >
                    <div className={`${styles.heading}`} >
                      <h1 className={`${styles.userName}`} >{user?.userName}</h1>
                    </div>
                    <div className={`${styles.chats}`} >
                      <Chats/>
                    </div>
                  </div>
                </section>
                <section className={`${styles.sectionTwo}`} >
                  <MessageSection/>
                </section>
              </section>
            </div>
          </section>
        </main>
      </div>
    )
  }

  let Component = loading ? LoadingComponent : MainComponent;

  return (
    <Component/>
  )
}

export const getServerSideProps = async ({req}) => {
  const cookie = req.headers.cookie ?? "";
  const response = await axios.get("http://localhost:9000/api/user/isloggedin",{headers:{Cookie:cookie },withCredentials:true});
  const isLoggedIn = response.data;
  return {
    props:{
      isLoggedIn
    }
  }
}

