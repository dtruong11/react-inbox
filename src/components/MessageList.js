import React from 'react'
import Message from './Message'
const MessageList = ({ messages, starMessage, highlight }) => {
    //console.log(messages)
    return (
        messages.map(m => <Message key={m.id} highlight={highlight} starMessage={starMessage} {...m}/>) //throw s error, wrap it in a div 
    )   
}

export default MessageList 