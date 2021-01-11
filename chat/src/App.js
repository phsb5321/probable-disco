import './App.css';
import opeSocket from "socket.io-client"
import { useEffect, useState } from "react"

const axios = require('axios').default;

const App = () => {

  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const socket = opeSocket(process.env["REACT_APP_API_URL"])

    socket.on('Message', data => {
      if (data.message === 'Message Reicived') {
        console.log("Message Reicivid")
        const newMessage = data.value
        console.log(data.value);
        addMessage(newMessage)
      }
    })

    socket.on('Status', data => {
      if (data.message === 'Sucsses') {
        console.log("Sucsses")
      }
    })

  }, [])

  const sendMessage = async (event, message) => {
    event.preventDefault()

    try {
      addMessage(message)
      setText("")

      if (message === "delete") {

        await axios.delete(
          `${process.env["REACT_APP_API_URL"]}/messages`
        )

      } else {

        await axios.post(
          `${process.env["REACT_APP_API_URL"]}/messages`,
          { message: message, user: "Pedro" })
      }

    } catch (error) {
      console.log(error)
    }
  }


  const addMessage = message => {
    const messages_list = messages
    messages_list.push(message)
    setMessages(messages_list)
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
            {messages.map(message =>
              <li key={message._id}>
                {message.user || "You"} said: {message.message}
              </li>)
            }
          </ul>

        </section>

        <form id="new-message-wrapper">

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
            onClick={event => sendMessage(event, text)}
          > Send </button>

        </form>

      </section>

    </div>
  );
}

export default App;
