import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';




const useStyles = makeStyles((theme) =>({
    root: {
        minWidth: 400,
        display: 'flex',
        flexWrap: 'wrap',        
    },
    textField: {
        margin: theme.spacing(3),
        width: 300,
    },
    
  }));

export default function Register() {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    return (
        <Container>
            <Card className={classes.root}>
                
                <CardContent>
                    <form className={classes.root} noValidate autoComplete="off">
                    <Typography align='center' className={classes.textField} variant="h5" component="h2">Sign In</Typography>

                        <Typography align='center' className={classes.textField} variant="body2" component="p">Email</Typography>
                        <TextField className={classes.textField} required id="outlined-basic" label="Email" variant="outlined" ref={emailRef}/>
                        <Typography align='center' className={classes.textField} variant="body2" component="p">Password</Typography>
                        <TextField className={classes.textField} required id="outlined-basic" label="Password" variant="outlined" ref={passwordRef} />
                        <Typography align='center' className={classes.textField} variant="body2" component="p">Confirm Password</Typography>
                        <TextField className={classes.textField} required id="outlined-basic" label="PasswordConfirm" variant="outlined" ref={passwordConfirmRef} />
                    </form>
                    <Button variant="contained" color="primary">Submit</Button>

                </CardContent>
            </Card>
            <Typography component='h3'>Already have an account? LogIn</Typography>
        </Container>
    )
}
