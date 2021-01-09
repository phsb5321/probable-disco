import './App.css';
import opeSocket from "socket.io-client"
import { useEffect, useState } from "react"

const App = () => {

  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    opeSocket("http://localhost:8080")
  }, [])

  const addMessage = async (event) => {
    event.preventDefault()
    let messages_list = messages;
    messages_list.push(text)
    setMessages(messages_list)
    setText("")
  }

  return (
    <div id="container">

      <aside id="sidebar">
        Users:
      </aside>

      <section id="main">


        <section id="messages-section">
          <h3> Messages List: </h3>
          <ul id="messages-list">
            {messages.map(message => <li >{message}</li>)}
          </ul>
        </section>

        <div id="new-message-wrapper">

          <input
            // rows="3"
            type="text"
            id="new-message"
            placeholder="New Messages"
            value={text}
            onChange={event => setText(event.target.value)}
          />

          <button
            id="send-button"
            onClick={event => addMessage(event)}
          > Send </button>

        </div>

      </section>

    </div>
  );
}

export default App;
