import React , { useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import windowDimensions from 'react-window-dimensions';


const useStyles = makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })); 

const Register = ({width,height,setUser})=>{
    const [err,setErr] = useState(true);
    const classes = useStyles();
    const userName = useRef();
    const handleRegister = ()=>{
        if(userName.current.value){
            setUser(userName.current.value);
        }else{
            setErr(true);
        }    
    }
        return (
            <>
                <Container maxWidth='sm'>
                <div style={{position:'relative',top:`${height/3}px`}}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        error={err}                        
                        inputRef={userName}
                        className={classes.input}
                        placeholder="Enter User Name"
                        inputProps={{ 'aria-label': 'enter user name' }}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton color="primary" className={classes.iconButton} aria-label="continue" onClick={handleRegister}>
                    <ArrowForwardIcon />
                    </IconButton>
                </Paper>
                </div>
                </Container>
            </>
        )
}

export default windowDimensions()(Register);