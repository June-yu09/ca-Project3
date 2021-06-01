import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFirestoreConnect } from 'react-redux-firebase';

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
    let classes = useStyles();

    const userId = useSelector(state=> state.firebase.auth.uid);
    useFirestoreConnect([{collection: 'favorites', where:[['userId','==',userId]]}]);

    const favorites = useSelector(state=>state.firestore.ordered.favorites);
    
    console.log(favorites);
    console.log(typeof(favorites))




    return (
        <div>
            This is favorites page
        
        {
            favorites && 
            favorites.map(favorite=>{
                let { title, image, price, category } = favorite;
                return (<Card className={classes.root}>
                        <img style={divStyle} src={image} alt='item'/>
                        <CardContent>
                            <Typography component='h2'> {title} </Typography>
                            <Typography component='h5'> {price} </Typography>
                            <Typography component='h5'> {category} </Typography>
                        </CardContent>
                        
                </Card>)
            })
        }

            
            
        </div>
    )
}

export default Favorites;