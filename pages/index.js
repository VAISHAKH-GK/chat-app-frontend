import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../stores/Context';
import NavBar from "../components/NavBar";
import MessageSection from '../components/ChatSection/MessageSection'
import styles from '../styles/index.module.css';
import ChatSection from '../components/ChatSection';
import { Socket } from '../stores/SocketIo';
import io from 'socket.io-client';



export default function Home({ isLoggedIn }) {

  const { user, setUser, setUsers } = useContext(Context);
  const { socket, setSocket } = useContext(Socket);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (!user) {
      Promise.all([axios.get("http://localhost:9000/api/user/getuserdata", { withCredentials: true }), axios.get("http://localhost:9000/api/user/getusers", { withCredentials: true })]).then((response) => {
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
    setSocket(io("http://localhost:9000"));
    return (() => {
      if (socket) {
        socket.disconnect();
      }
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected to server using socket io");
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log("use effect in component");
  }, []);

  const LoadingComponent = () => {
    return (
      <div >
        <h1 className={`${styles.loading}`} > Loading ....  </h1>
      </div>
    )
  }


  const MainComponent = () => {
    return (
      <div>
        <ChatSection />
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

