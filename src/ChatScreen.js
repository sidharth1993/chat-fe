import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme)=>({
    margin: {
        margin: theme.spacing(1),
        width: '90%',
        float: 'left'
    },
    divider: {
        height: 28,
        margin: 4,
      },
    card: {
      minWidth: 275,
      margin: 1,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));


const ChatScreen = ({to,from,send})=>{
    let multiline = false;
    const message = useRef();
    const classes = useStyles();

    const sendMessage = ()=>{
        if(message.current.value){
            if(multiline){
                let multiMsg = message.current.value.split('\n');
                multiMsg.forEach((msg)=>{
                    send(msg,to);
                });
            }else{
                send(message.current.value,to);
            }
            multiline = false;
            message.current.value = null;
        }
    }



    const addEnterEvt = (e)=>{
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            sendMessage();
        }
        if(e.key === "Enter" && e.shiftKey){
            multiline = true;
        }
    }

    return ( 
            <Paper component="form" className={classes.card}>
            <InputBase
                        className={classes.margin}
                        defaultValue=""
                        inputRef={message}
                        multiline={true}
                        placeholder="Type your message"
                        inputProps={{ 'aria-label': 'naked' }}
                        onKeyPress={(e)=>addEnterEvt(e)}
                    />   
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton onClick={sendMessage}>
                <SendIcon />
            </IconButton>
        </Paper>  
    )
}

export default ChatScreen;