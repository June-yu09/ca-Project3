import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../redux/actions/actions';
import { connect } from 'react-redux';






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

class SignUp extends Component {
    state = {
        email:'',
        password:'',
        confirmPassword:'',
    }
    handleChange = e => {
        this.setState({
            [e.target.id] : e.target.value,
        })
    }
    handleSubmit = e =>{
        e.preventDefault();
        console.log(this.state);
        if(this.state.password !== this.state.confirmPassword){
            alert('Please put password correctly')
        }else{
            this.props.signUpEvent(this.state);
        }
    }


    render (){
        const { classes } = this.props;
        
        
        return (
            <Container>
                <Card className={classes.root}>
                    
                    <CardContent>
                        <form onSubmit={this.handleSubmit} className={classes.root} noValidate autoComplete="off">
                            <Typography align='center' className={classes.textField} variant="h5" component="h2">Register</Typography>
    
                            <Typography align='center' className={classes.textField} variant="body2" component="p">Email</Typography>
                                <TextField onChange={this.handleChange} autoFocus className={classes.textField} required id="email" label="Email" variant="outlined"/>
                            <Typography align='center' className={classes.textField} variant="body2" component="p">Password</Typography>
                                <TextField onChange={this.handleChange} className={classes.textField} required id="password" label="Password" variant="outlined"/>
                            <Typography align='center' className={classes.textField} variant="body2" component="p">Confirm Password</Typography>
                                <TextField onChange={this.handleChange} className={classes.textField} required id="confirmPassword" label="confirmPassword" variant="outlined"/>
                            <Button type='submit' variant="contained" color="primary">Register</Button>

                        </form>
    
                    </CardContent>
                </Card>
                <Typography component='h3'>Already have an account? <NavLink exact to='/signin'>Sign In</NavLink></Typography>
            </Container>
        )
    }
}
const mapStateToProps = (state)=>{
    let auth = state.firebase.auth;
    return {
        auth : auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUpEvent : (credentials)=> dispatch(signUp(credentials))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignUp));