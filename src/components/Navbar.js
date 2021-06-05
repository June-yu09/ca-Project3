import React, { useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut, authCheck } from '../redux/actions/actions';
import firebase from '../fbConfig';



const useStyles = makeStyles((theme)=>({
    title: {
        flexGrow:1,
    }
    ,
    offset: theme.mixins.toolbar,
    
}))


function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch;
    const auth = useSelector(state=> state.firebase.auth);
    const useruid = useSelector(state=> state.check);
    const userAuth = ()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                console.log('user logged in');
                console.log('from Navbar', user);
                console.log('what is user.id?', user.uid);
                dispatch(authCheck(user.uid));
            }else{
                console.log('no user');
            }
        })
    }
    useEffect(()=>{
        userAuth();
    },[])

    

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        dispatch(signOut());
    }


    return (
        <div>
            <AppBar position='fixed'>
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon onClick={handleClick}/>
                </IconButton>
                <Menu 
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'top',
                }}
                transformOrigin={{
                  vertical: 'top',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                    <MenuItem><NavLink exact to='/'>Home</NavLink></MenuItem>
                    <MenuItem><NavLink exact to='/about'>About us</NavLink></MenuItem>


                </Menu>


                <Typography className={classes.title}>
                <NavLink exact to='/'>Shop</NavLink>
                </Typography>

                {
                    auth.isEmpty ?
                    <>
                    <Typography>
                    <NavLink exact to='/signin'>SignIn</NavLink>
                    </Typography>

                    <Typography>
                    <NavLink exact to='/signup'>SignUp</NavLink>
                    </Typography>
                    </>:
                    <>
                    <button onClick={logOut}>SignOut</button>
                    <Typography className={classes.title}>Welcome[{auth.email}]</Typography>

                    <Typography>
                    <NavLink exact to='/favorites'>💙</NavLink>
                    </Typography>
                    
                    <Typography>
                    <NavLink exact to='/cart'>Cart</NavLink>
                    </Typography>
                    
                    </>
                }
                
                             

               
                

                
                
                
                

                </Toolbar>
            </AppBar>
            <div className={classes.offset} />

            
        </div>
    )
}

export default Navbar;
