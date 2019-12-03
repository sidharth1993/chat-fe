import React, { useState } from 'react';
import Register from './Register';
import ChatBox from './ChatBox';

let connected = false;
let connection = null;
let currentUser = null;
function Chat(){
    const [onlineUsers, setOnlineUsers] = useState([]);
    const changeLayout = (reg)=>{
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        connection = new WebSocket('ws://127.0.0.1:1447/?from='+reg);
        connection.onopen = (open)=>{
            connected = true;
            currentUser = reg;
        }     
        connection.onmessage = wsOnmsg;
    }
    const wsOnmsg = (message)=>{
        var incoming = JSON.parse(message.data);
        if(!incoming.error){
            if(incoming.existing){
                let current = [];
                incoming.existing.forEach(e=>{
                    if(e!==currentUser){
                      current.push({user:e})
                    }
                });
                existingUsers(current);
            }
        }
    }

    const existingUsers = (online)=>{
        setOnlineUsers(online);
    }

    return (
        <>
        {connected && <ChatBox user={currentUser} online={onlineUsers} connection={connection} updateOnline={existingUsers} />}
        {!connected && <Register setUser={changeLayout} />}
        </>
    )
}

export default Chat;