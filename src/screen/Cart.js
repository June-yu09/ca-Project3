import React, {useEffect} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
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
import { removeFromCart, authCheck, cartCheck } from '../redux/actions/actions';
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
      paddingTop: '300px', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }))



function Cart() {
    let classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const cart = useSelector(state=>state.firestore.ordered.cart);
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
            dispatch(cartCheck(useruid));
        }
        getAuth();
    },[ cart])
    
    useFirestoreConnect([{
        collection : 'cart',
        where : 
            [['userId','==', useruid]]
        
    }]);

    console.log('this is firestore', useSelector(state=>state.firestore.ordered.cart));
    console.log('this is redux', useSelector(state=>state.cart.products));


    const handleRemove = (product) => {
        dispatch(removeFromCart(product));
    }

    const cartList = useSelector(state=>state.cart.products);

    if( !userId ){
        return(<>
            <Redirect to='/signin' />
        </>)
    }

    return (
        <div>
            

        <CssBaseline />
        <Button color='success' onClick={()=>{ history.goBack() }}>🔙Back to Previous page</Button>

        <div className={classes.heroContent}>
                <Container maxWidth="sm" >
                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>🛒Shopping Cart🛒</Typography>
                </Container>
        </div>


        <Container className={classes.cardGrid} maxWidth="md">

            <Grid container spacing={4}>

        {
            (cartList) &&
            cartList.map(product=>{
                let { id, title, category, price, image } = product;
                return(
                    <>
                    <Grid item key={id} xs={12} sm={6} md={4}>

                        <Card className={classes.card} key={id}>
                        <CardMedia 
                            className={classes.cardMedia}
                            image={image}
                            title='product image'
                        />

                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2"> {title} </Typography>
                            <Typography> {price}$ </Typography>
                            </CardContent>

                            <CardActions>
                            <Button size="small" color="primary" onClick={()=>{ handleRemove(product) }}>❌DELETE</Button>
                            </CardActions>
                        </Card>

                    </Grid>
                    </>
                )
            })
        }

        {
            cartList.length ===0 &&
            <Typography>It is empty</Typography>
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

export default Cart;