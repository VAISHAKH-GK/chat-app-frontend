import { useContext } from 'react';
import styles from '../../styles/MessageSection.module.css';
import {Context} from '../../stores/Context';


export default function ChatSection () {
 
  const { dmUser } = useContext(Context);

  const Header = () => {
    return (
      <div className={`${styles.header}`} >
        <h1>{dmUser?.userName ?? "Home Page"}</h1> 
      </div>
    )
  }

  return (
    <div className={`${styles.chatSection}`} >
      <div className={`${styles.main}`} >
        <Header/>
      </div>
    </div>
  )
}
