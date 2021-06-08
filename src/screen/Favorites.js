import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useHistory, Redirect } from 'react-router-dom';
import { removeFavorite, addToCart, authCheck, favoriteCheck } from '../redux/actions/actions';
import firebase from '../fbConfig';



const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '300px',
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }))


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

    


    useFirestoreConnect([{
        collection: 'favorites',
        where:
            [['userId','==',useruid]]
        
    }]);

    useFirestoreConnect([{
        collection : 'cart',
        where : 
            [['userId','==', useruid]]
        
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
        <div>
            <CssBaseline />
            <Button color='success' onClick={()=>{ history.goBack() }}>🔙Back to Previous page</Button>

            <div className={classes.heroContent}>
                <Container maxWidth="sm" >
                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>💖Favorite💖</Typography>
                </Container>
            </div>


            <Container className={classes.cardGrid} maxWidth="md">

            <Grid container spacing={4}>
        
            {
                favoriteList && favoriteList.map(favorite=>{ 
                    return (<>
                        <Grid item key={favorite.id} xs={12} sm={6} md={4}>
                            <Card className={classes.card} key={favorite.id}>
                                <CardMedia 
                                    className={classes.cardMedia}
                                    image={favorite.image}
                                    title='product image'
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2"> {favorite.title} </Typography>
                                    <Typography> {favorite.price}$ </Typography>
                                </CardContent>

                                <CardActions>
                                <Button color='success' onClick={()=>{ dispatch(removeFavorite(favorite)) }}>❌DELETE</Button>
                                <Button color='success' onClick={()=>{ dispatch(addToCart(favorite)) }}>🛒Add to Cart</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </>)
                    
                    }
                )
            }
            
            
            {
                !favorites&&
                <Typography component='h1'> Your favorite is empty </Typography>

            }
    
                </Grid>
            </Container>
            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    make a project by using react, redux, firebase, material ui
                </Typography>
            </footer>
            
        </div>
    )
}

export default Favorites;