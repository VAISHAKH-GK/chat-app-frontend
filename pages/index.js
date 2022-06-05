import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../stores/Context';
import NavBar from "../components/NavBar";
import MessageSection from '../components/MessageSection'
import styles from '../styles/index.module.css';
import SocketProvider from '../stores/SocketIo';



export default function Home({ isLoggedIn }) {

  const { user, setUser, users, setUsers, setDmUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (!user) {
      Promise.all([axios.get("http://localhost:9000/api/user/getuserdata", { withCredentials: true }),axios.get("http://localhost:9000/api/user/getusers", { withCredentials: true })]).then((response) => {
        if (!response[0].data) {
          router.push("/login");
        }
        setUser(response[0].data);
        setUsers(response[1].data);
        setLoading(false);
      })
    } else {
      axios.get("http://localhost:9000/api/user/getusers", { withCredentials: true }).then((response) => {
        setUsers(response.data);
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
  }, []);

  const LoadingComponent = () => {
    return (
      <div >
        <h1 className={`${styles.loading}`} > Loading ....  </h1>
      </div>
    )
  }

  const Chats = () => {
    return (
      <div>
        {
          users.map((value, index) => {
            return (
              <button type="button" className={`${styles.chat}`} key={index} onClick={() => setDmUser(value)} > {value.userName} </button>
            )
          })
        }
      </div>
    )
  }

  const MainComponent = () => {
    return (
      <div>
        <SocketProvider>
          <NavBar />
          <main className={`${styles.root}`} >
            <section className={`container`} >
              <div className={`${styles.main}`} >
                <section className={`${styles.chatApp}`} >
                  <section className={`${styles.sectionOne}`} >
                    <div className={`${styles.leftMainSection}`} >
                      <button className={`${styles.heading}`} onClick={() => setDmUser(null)} >
                        <h1 >{user?.userName}</h1>
                      </button>
                      <div className={`${styles.chats}`} >
                        <Chats />
                      </div>
                    </div>
                  </section>
                  <section className={`${styles.sectionTwo}`} >
                    <MessageSection />
                  </section>
                </section>
              </div>
            </section>
          </main>
        </SocketProvider>
      </div>
    )
  }

  let Component = loading ? LoadingComponent : MainComponent;

  return (
    <Component />
  )
}

export const getServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie ?? "";
  const response = await axios.get("http://localhost:9000/api/user/isloggedin", { headers: { Cookie: cookie }, withCredentials: true });
  const isLoggedIn = response.data;
  return {
    props: {
      isLoggedIn
    }
  }
}

