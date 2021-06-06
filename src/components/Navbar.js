import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles , useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/actions/actions';
import firebase from '../fbConfig';
import { useFirestoreConnect } from 'react-redux-firebase';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    
    
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }))


function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector(state=> state.firebase.auth);

    const userId = useSelector(state=> state.firebase.auth.uid);
    const useruid = useSelector(state=> state.check);
    const cart = useSelector(state=>state.firestore.ordered.cart);
    const history = useHistory();



    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        dispatch(signOut());
    }
    useFirestoreConnect([{
        collection : 'cart',
        where : 
            [['userId','==', useruid]]
        
    }]);

    
    
    const cartList = useSelector(state=>state.cart.products);


    return (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}>
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    {
                        !auth.isEmpty&&
              
                            <Typography noWrap onClick={()=>{ history.push('/favorites') }}>
                            💖
                            </Typography>
      
                    }
                    <Typography variant="h6" noWrap onClick={()=>{ history.push('/') }}>
                        SHOP
                    </Typography>
                    
                    {
                        !auth.isEmpty&&
                        <>
                            
                            <Typography flexGrow={3} noWrap onClick={()=>{ history.push('/cart') }}>
                            <LocalGroceryStoreIcon color='action'></LocalGroceryStoreIcon>
                            </Typography>
                            {
                                cartList &&
                                <Typography flexGrow={3} noWrap> {cartList.length} </Typography>
                            }

                        </>
                    }
                    </Toolbar>
                    </AppBar>


                    <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    >
                        <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                        </div>
                        
                    <Divider />

                    <List>
                    
                        <ListItem button onClick={()=>{ history.push('/') }}>
                                <ListItemText primary='Home' />
                        </ListItem>

                        <ListItem button onClick={()=>{ history.push('/about') }}>
                                <ListItemText primary='About us' />
                        </ListItem>
                       
                    </List>
                    <Divider />
                    {
                        auth.isEmpty?
                        <List>
                    
                        <ListItem button onClick={()=>{ history.push('/signin') }}>
                                <ListItemText primary='SignIn' />
                        </ListItem>

                        <ListItem button onClick={()=>{ history.push('/signup') }}>
                                <ListItemText primary='Sign Up' />
                        </ListItem>
                       
                        </List>:
                        <List>
                    
                        <ListItem button onClick={logOut}>
                            
                                <ListItemText primary='Sign Out' />
                        </ListItem>

                        <ListItem>
                                <ListItemText>Welcome {auth.email} </ListItemText>
                        </ListItem>
                       
                        </List>
                    }




                    </Drawer>

                    <main
                        className={clsx(classes.content, {
                        [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        
                    </main>



            
        </div>
    )
}

export default Navbar;
