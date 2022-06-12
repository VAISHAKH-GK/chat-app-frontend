import { useContext, useState, useEffect } from 'react';
import styles from '../../../styles/MessageSection.module.css';
import { Context } from '../../../stores/Context';
import { Socket } from '../../../stores/SocketIo';


export default function ChatSection() {

  const { dmUser, messages, addMessage, user } = useContext(Context);
  const { sendMessageToServer } = useContext(Socket);

  const Header = () => {
    return (
      <div className={`${styles.header}`} >
        <h1>{dmUser?.userName ?? "Home Page"}</h1>
      </div>
    )
  }


  const MessagesArea = () => {

    useEffect(() => {
      var cm = document.querySelector('.chat-messages');
      cm.scrollTop = cm.scrollHeight;
    }, [messages]);

    return (
      <div className={`${styles.messagesArea} chat-messages`} onChange={() => console.log("change")} >
        {
          !dmUser ? <h1>Home</h1> : messages.map((message, index) => {
            return (
              <div key={index} className={`${styles.message}`}>
                <p className={`${styles.messageHeading}`} > <span className={`${styles.from}`} > {message.from.userName} </span> <span className={`${styles.date}`} >{`${message.date}`}</span> </p>
                <p className={`${styles.text}`} >{message.msg}</p>
              </div>
            )
          })
        }
      </div>
    )
  }

  const HomePage = () => {
    return (
      <div className={`${styles.home}`} >
        <h1>Home Page</h1>
      </div>
    )
  }

  const TextInput = () => {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
      if (message) {
        const date = new Date();
        const msg = {
          msg: message,
          from: user,
          to: dmUser,
          date: date.toLocaleString('en-IN', { day: "numeric", year: "numeric", month: "numeric", hour12: true, hour: "numeric", minute: "numeric" })
        }
        sendMessageToServer(msg);
        addMessage(msg);
        setMessage('');
      }
    }

    return (
      <div className={`${styles.textInput}`} >
        <textarea className={`${styles.textarea}`} id="textbox" maxLength="400" value={message} onInput={autoHeight} onChange={e => setMessage(e.target.value)} placeholder="Type Message ..." ></textarea>
        <button type="button" className={`btn btn-success ${styles.sendButton}`} onClick={sendMessage} >Send</button>
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
        {
          dmUser ? <MessagesArea /> : <HomePage />
        }
        {
          dmUser ? <TextInput /> : ""
        }
      </div>
    </div>
  )
}
