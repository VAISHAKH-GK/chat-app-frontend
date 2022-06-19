import { useContext } from 'react';
import { Context } from '../../stores/Context';
import NavBar from '../NavBar';
import MessageSection from '../ChatSection/MessageSection';
import styles from '../../styles/ChatSection.module.css';


const ChatSection = () => {

  const { user, changeDmUser } = useContext(Context);

  const Chats = () => {

    const { users, changeDmUser } = useContext(Context);

    return (
      <div>
        {
          users.map((value, index) => {
            return (
              <button type="button" className={`${styles.chat}`} key={index} onClick={() => changeDmUser(value)} > {value.userName} </button>
            )
          })
        }
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <main className={`${styles.root}`} >
        <section className={`container`} >
          <div className={`${styles.main}`} >
            <section className={`${styles.chatApp}`} >
              <section className={`${styles.sectionOne}`} >
                <div className={`${styles.leftMainSection}`} >
                  <button className={`${styles.heading}`} onClick={() => changeDmUser(null)} >
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
    </div>
  )
}

export default ChatSection;
