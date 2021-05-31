import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { favoriteProduct } from '../redux/actions/actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const useStyles = makeStyles({
    root:{
        maxWidth: 440,
    },
    
})
const divStyle = {
    width: '450px',
    height: '450px'
}



function Favorites() {
    const fav = useSelector(state=>state.favorites);
    let classes = useStyles();

    let { id, title, image, price, category } = fav;


    return (
        <div>
            This is favorites page

            <Card className={classes.root}>
                <img style={divStyle} src={image} alt='item'/>
                <CardContent>
                    <Typography component='h2'> {title} </Typography>
                    <Typography component='h5'> {price} </Typography>
                    <Typography component='h5'> {category} </Typography>
                </CardContent>
                

            </Card>
            
        </div>
    )
}

export default Favorites;