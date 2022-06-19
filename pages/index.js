import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../stores/Context';
import styles from '../styles/index.module.css';
import ChatSection from '../components/ChatSection';
import { Socket } from '../stores/SocketIo';
import io from 'socket.io-client';
import { AxiosContext } from '../stores/Axios';

export default function Home({ isLoggedIn }) {

  const { user, setUser, setUsers, setMessages, dmUser } = useContext(Context);
  const { socket, setSocket } = useContext(Socket);
  const { getUserData, getUsers, getMessages } = useContext(AxiosContext);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (!user) {
      Promise.all([getUserData(), getUsers()]).then((response) => {
        if (!response[0]) {
          router.push("/login");
        }
        setUser(response[0]);
        setUsers(response[1]);
        setLoading(false);
      });
      setSocket(io("http://localhost:9000"));
    } else {
      getUsers().then((response) => {
        setUsers(response);
      });
      setSocket(io("http://localhost:9000"));
    }
    return (() => {
      if (socket) {
        socket.disconnect();
      }
    });
  }, []);

  useEffect(() => {
    if (dmUser) {
      getMessages(dmUser).then(response => {
        setMessages(response);
      });
    }
  }, [dmUser]);

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

  const Component = loading ? LoadingComponent : MainComponent;

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

