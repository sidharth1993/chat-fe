import React from 'react';
import Typography from '@material-ui/core/Typography';


/*  */

const ToUser = ({to})=>{
    
    return (
            <Typography align='left' color='primary' component={'div'}>
                    {to}
            </Typography>
    );
}

export default ToUser;