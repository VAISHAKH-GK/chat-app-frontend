import { useContext, useState } from 'react';
import styles from '../../styles/MessageSection.module.css';
import { Context } from '../../stores/Context';


export default function ChatSection() {

  const { dmUser } = useContext(Context);

  const Header = () => {
    return (
      <div className={`${styles.header}`} >
        <h1>{dmUser?.userName ?? "Home Page"}</h1>
      </div>
    )
  }

  const MessagesArea = () => {
    return (
      <div className={`${styles.messagesArea}`} >
        {
          dmUser ? <h1>Messages</h1> : <h1>Home</h1>
        }
      </div>
    )
  }

  const TextInput = () => {

    const [message, setMessage] = useState('');

    return (
      <div className={`${styles.textInput}`} >
        <textarea className={`${styles.textarea}`} maxLength="400" value={message} onInput={autoHeight} onChange={e => setMessage(e.target.value)} placeholder="Type Message ..." ></textarea>
        <button className={`btn btn-success ${styles.sendButton}`} onClick={() => setMessage('')} >Send</button>
      </div>
    )
  }

  function autoHeight(e) {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
  }

  return (
    <div className={`${styles.chatSection}`} >
      <div className={`${styles.main}`} >
        <Header />
        <MessagesArea />
        {
          dmUser ? <TextInput /> : ""
        }
      </div>
    </div>
  )
}
