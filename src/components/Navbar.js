import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme)=>({
    title: {
        flexGrow:1,
    }
    ,
    offset: theme.mixins.toolbar,
    
}))


function Navbar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <MenuItem><Link to='/'>Home</Link></MenuItem>
                    <MenuItem><Link to='/about'>About us</Link></MenuItem>


                </Menu>

                <Typography className={classes.title}>
                    Nerd Shop
                </Typography>

                </Toolbar>
            </AppBar>
            <div className={classes.offset} />

            
        </div>
    )
}

export default Navbar;
