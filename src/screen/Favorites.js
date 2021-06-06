import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useHistory, Redirect } from 'react-router-dom';
import { removeFavorite, addToCart, authCheck, favoriteCheck } from '../redux/actions/actions';
import firebase from '../fbConfig';



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

    const favorites = useSelector(state=>state.firestore.ordered.favorites);
    const useruid = useSelector(state=>state.check.userId);
    const userId = useSelector(state=> state.firebase.auth.uid);


    
    const userAuth = ()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                dispatch(authCheck(user.uid));
            }else{
                console.log('no user');
            }
        })
    }
    useEffect(()=>{
        const getAuth = async ()=>{
           await userAuth();
           dispatch(favoriteCheck(useruid));
        }
        getAuth();
    },[favorites])

    


    // console.log('what is hook userid', userId);
    useFirestoreConnect([{
        collection: 'favorites',
        where:
            [['userId','==',useruid]]
        
    }]);

    console.log('this is firestore state', useSelector(state=>state.firestore.ordered.favorites));
    console.log('this is favorites state', useSelector(state=>state.favorites.favorites));

    const favoriteList = useSelector(state=>state.favorites.favorites)

    if ( !userId ){
        return <>
            <Redirect to='/signin' />
        </>
    }

    return (
        <div className={classes.root}>
            This is favorites page
        
        {
            favorites && favorites.map(favorite=>{
                return <>
                <Card className={classes.root} key={favorite.id}>
                        <img style={divStyle} src={favorite.image} alt='item'/>
                        <CardContent>
                            <Typography component='h2'> {favorite.title} </Typography>
                            <Typography component='h5'> {favorite.price} </Typography>
                            <Typography component='h5'> {favorite.category} </Typography>
                        </CardContent>
                        <Button variant='outlined' onClick={()=>{ dispatch(removeFavorite(favorite)) }}>❌DELETE</Button>
                        <Button variant='outlined' onClick={()=>{ dispatch(addToCart(favorite)) }}>🛒Add to Cart</Button>

                </Card>
                </>
                }
            )

        }
        {/* <Button variant='outlined' onClick={()=>{ 
            console.log(userId);
            console.log(useruid);
            }}>TEST BUTTON</Button> */}

        
        {
            !favorites && <Typography component='h1'> Your favorite is empty </Typography>

        }

        <Button variant='outlined' onClick={()=>{ history.goBack() }}>Back to previous page</Button>

            
            
        </div>
    )
}

export default Favorites;