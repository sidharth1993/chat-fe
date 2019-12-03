import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Online from './Online';
import ChatScreen from './ChatScreen';
import ToUser from './ToUser';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
  
let chatStore = [];

const ChatBox = ({user,online,connection,updateOnline})=>{

    const [onlineOpen,setOnlineOpen] = useState(false);

    const [tos,setTos] = useState([]);

    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
          margin: 20
        },
          input: {
            marginLeft: theme.spacing(1),
            flex: 1,
          },
          iconButton: {
            padding: 10,
          },
          divider: {
            height: 28,
            margin: 4,
          }
      }));

    const classes = useStyles();

    const addTo = (add)=>{
      if(tos.indexOf(add)<0){
        let toArr = [];
        Object.assign(toArr,tos);
        toArr.push(add);
        setTos(toArr);
        setTimeout(()=>{
          let userIndex = chatStore.findIndex((e)=>(e.user === add));
          if(userIndex >= 0){
            chatStore[userIndex].unreadMessages.forEach((msg)=>(
              addToChat(msg,chatStore[userIndex].user,'left')
            ));
            let onlineUsers = [];
            Object.assign(onlineUsers,online);
            onlineUsers[userIndex].unread = false;
            onlineUsers[userIndex].unreadMessages = [];
            updateOnline(onlineUsers);
            chatStore.splice(userIndex,1);
          }
        },1000);
      }
    }

    const sendMessage = (message,to)=>{
      addToChat(message,to,'right');
      connection.send(JSON.stringify({from:user,to:to,message:message}));
    }

    const addToChat = (message,from,side)=>{
        let bgColor = (side==='right')?'white':'#b3ecff';  
        let style = `background-color:${bgColor};border-radius:4px;text-align:left;width:auto;max-width:80%;word-wrap:normal;float:${side};`;
        let displayMsg = `<div style=${style}><span style='margin-left:5px;margin-right:5px'>${message}</span></div><br/>`;
        document.getElementById(from).innerHTML += displayMsg;
    }

    connection.onmessage = (message)=>{
      let incoming = JSON.parse(message.data);
      if(incoming.message){
        if(document.getElementById(incoming.from)){
          addToChat(incoming.message,incoming.from,'left');
        }else{
          let userIndex = chatStore.findIndex(e=>(e.user === incoming.from));
          if(userIndex >= 0){
            chatStore[userIndex].unread = true;
            chatStore[userIndex].unreadMessages.push(incoming.message);
          }else{
            chatStore.push({user:incoming.from,unread:true,unreadMessages:[incoming.message]});
          }
          if(onlineOpen){
            onlineBar(onlineOpen);
          }
        }
      }
      if(incoming.error){
        addToChat(`<i>${incoming.error}</i>`,incoming.to,'left');
      }
      if(incoming.existing){
        let current = [];
        incoming.existing.forEach(e=>{
            if(e!==user){
              current.push({user:e})
            }
        });
        updateOnline(current);
      }
    }

    const onlineBar = (isOpen)=>{
      let onlineUsers = [];
      Object.assign(onlineUsers,online);
      online.forEach((e)=>{
        let storeIndex = chatStore.findIndex((f)=>(f.user === e.user));
        if(storeIndex >= 0){
          onlineUsers.splice(storeIndex,1);
        }
      });
      onlineUsers.push(...chatStore);
      updateOnline(onlineUsers);
      setOnlineOpen(isOpen);
    }

    return (
        <div className={classes.root}>
          <Online user={user} isOpen={onlineBar} addTo={(add)=>addTo(add)} online={online} />
          {
            tos.map((to)=>(
              <Box key={to} width={onlineOpen?"80%":"100%"} bgcolor="grey.300" p={1} my={0.5} >
                <div>
                  <ToUser to={to} />
                  <Divider/>
                  <div id={to}></div>
                  <div style={{marginTop:'20px'}} >
                      <ChatScreen to={to} from={user} send={sendMessage} ></ChatScreen>
                  </div>
                </div>
              </Box>
              
            ))
          } 
        </div>
    );  
}

export default ChatBox;

