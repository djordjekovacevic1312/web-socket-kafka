import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
import Messages from './components/Messages/Messages';


const SOCKET_URL = 'http://localhost:8085/ws-chat/';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [infoMessage, setInfoMessage] = useState('')
  let onConnected = () => {
    // console.log("Connected!!")
    setInfoMessage('Connected!');
  }

  let onDisconnect = () => {
    setInfoMessage('Disconnected!');
  }

  let onMessageReceived = (msg) => {
    // console.log('New Message Received!!', msg);

    let message = {};

    for(const key in msg) {
      if(key === 'desc') {
        const array = msg[key].split('_');
        message.caseID = array[0];
        message.callID = array[1];
      } else {
        message[key] = msg[key]
      }
    }

    let newMessages = [...messages];

    newMessages.unshift(message);
    if(messages.length > 100) {
      newMessages.pop();
    }
    
    setMessages(newMessages);
  }


  return (
    <div className="App">
      <p>KAFKA PREVIEW</p>
        <span>{infoMessage}</span>
        <SockJsClient
          url={SOCKET_URL}
          topics={['/topic/group']}
          onConnect={onConnected}
          onDisconnect={onDisconnect}
          onMessage={msg => onMessageReceived(msg)}
          debug={false}
        />
        <Messages
          messages={messages}
        />
          
    </div>
  )
}

export default App;
