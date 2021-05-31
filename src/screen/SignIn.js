import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../redux/actions/actions';
import { Redirect } from 'react-router-dom';




const useStyles = (theme) =>({
    root: {
        minWidth: 400,
        display: 'flex',
        flexWrap: 'wrap',        
    },
    textField: {
        margin: theme.spacing(3),
        width: 300,
    },
    
  });

class SignIn extends Component {
    state = {
        email:'',
        password:'',
    }
    handleChange = e => {
        this.setState({
            [e.target.id] : e.target.value,
        })
        console.log(e.target.value)
        console.log(e.target.id)
    }
    handleSubmit = e =>{
        e.preventDefault();
        console.log(this.state);
        this.props.signInAction(this.state);
    }


    render (){
        const { classes } = this.props;
        const { uid } = this.props;
        if (uid) {
            return (<> <Redirect to='/' /> </>)
        }
        return (
        <Container>
            <Card className={classes.root}>
                
                <CardContent>
                    <form onSubmit={this.handleSubmit} className={classes.root} noValidate autoComplete="off">
                        <Typography align='center' className={classes.textField} variant="h5" component="h2">Sign In</Typography>

                        <Typography align='center' className={classes.textField} variant="body2" component="p">Email</Typography>
                            <TextField onChange={this.handleChange} autoFocus className={classes.textField} required id="email" label="Email" variant="outlined"/>
                        <Typography align='center' className={classes.textField} variant="body2" component="p">Password</Typography>
                            <TextField onChange={this.handleChange} className={classes.textField} required id="password" label="Password" variant="outlined"/>
                        <Button type='submit' variant="contained" color="primary">Login</Button>

                    </form>

                </CardContent>
            </Card>
            <Typography component='h3'>You don't have an account? <NavLink exact to='/register'>Register</NavLink></Typography>
        </Container>
    )
    }
}
const mapStateToProps = state => {
    let uid = state.firebase.auth.uid;
    return {
        uid : uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signInAction : (credentials) => dispatch(signIn(credentials))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignIn));