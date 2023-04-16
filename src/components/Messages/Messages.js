import React from 'react';

const Messages = (props) => {

    //console.log(props.messages);

    const messages = props.messages.map(message => {
        const messageArray = []
        for(const key in message) {
            messageArray.push({
                key: key,
                object: message[key]
            });
        }
        return (
            <li key={message.ts}>
                {messageArray.map(obj => (
                    <div key={obj.key}>
                        <span>{obj.key.toUpperCase()}: </span>
                        <span>{obj.key === 'ts' ? (
                            (new Date(obj.object)).getFullYear()+
                            "-"+(((new Date(obj.object)).getMonth()+1) < 10 ? '0' + ((new Date(obj.object)).getMonth()+1) : ((new Date(obj.object)).getMonth()+1))+
                            "-"+((new Date(obj.object)).getDate() < 10 ? '0' + (new Date(obj.object)).getDate() : (new Date(obj.object)).getDate())+
                            " "+((new Date(obj.object)).getHours() < 10 ? '0' + (new Date(obj.object)).getHours() : (new Date(obj.object)).getHours())+
                            ":"+((new Date(obj.object)).getMinutes() < 10 ? '0' + (new Date(obj.object)).getMinutes() : (new Date(obj.object)).getMinutes())+
                            ":"+((new Date(obj.object)).getSeconds() < 10 ? '0' + (new Date(obj.object)).getSeconds() : (new Date(obj.object)).getSeconds())
                    ) :  obj.object}</span>
                    </div>
                ))}
            </li>
        )
    })


    return (
        <ul className="messages-list">
            {messages}
        </ul>
    )
}


export default Messages