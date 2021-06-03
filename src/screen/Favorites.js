import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { removeFavorite } from '../redux/actions/actions';


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
    const history = useHistory();
    const dispatch = useDispatch();
    console.log(useSelector(state=>state));

    const userId = useSelector(state=> state.firebase.auth.uid);
    useFirestoreConnect([{collection: 'favorites', where:[['userId','==',userId]]}]);

    const favorites = useSelector(state=>state.firestore.ordered.favorites);

    return (
        <div>
            This is favorites page
        
        {
            favorites ? 
            favorites.map(favorite=>{
                let { title, image, price, id } = favorite;
                return (<Card className={classes.root} key={id}>
                            <img style={divStyle} src={image} alt='item'/>
                            <CardContent>
                                <Typography component='h2'> {title} </Typography>
                                <Typography component='h5'> {price} $ </Typography>
                            </CardContent>
                            <Button variant='outlined' onClick={()=>{ dispatch(removeFavorite(favorite)) }}>❌Delete</Button>

                        </Card>)
            }):
            <Typography component='h2'> Your favorite is empty </Typography>


        }
        <Button variant='outlined' onClick={()=>{ history.goBack() }}>Back to previous page</Button>

            
            
        </div>
    )
}

export default Favorites;