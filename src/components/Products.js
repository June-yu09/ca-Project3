import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, favoriteProduct, authCheck, cartCheck, addToCart, fetchMenProducts, fetchWomenProducts, fetchJeProducts, fetchElProducts } from '../redux/actions/actions';
import firebase from '../fbConfig';
import { useFirestoreConnect } from 'react-redux-firebase';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
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
      paddingTop: '100%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    circle: {
        display: 'flex',
        '& > * + *': {
        marginLeft: theme.spacing(2),
    },
    }
  }))


const Products = ()=>{
    const dispatch = useDispatch();

    const cart = useSelector(state=>state.firestore.ordered.cart);
    const useruid = useSelector(state=>state.check.userId);
    const userId = useSelector(state=> state.firebase.auth.uid);
    let classes = useStyles();

    const cartList = useSelector(state=>state.cart.products);

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
    },[cart, userId])

    useFirestoreConnect([{
        collection : 'cart',
        where : 
            [['userId','==', useruid]]
        
    }]);



    useEffect(()=>{
        dispatch(fetchProducts());
    },[])

    let {products, isLoading, error} = useSelector(state => 
        ({
        products : state.allProducts.products,
        isLoading : state.allProducts.isLoading,
        error : state.allProducts.error
        })
    );

    let listing = products.map(product =>{
        let { id, title, image, price } = product;
        return (
            <>
            <Grid item key={id} xs={12} sm={6} md={4}>

                <Card className={classes.card} key={id}>
                
                    <Link to={`/products/${id}`}>
                        <CardMedia 
                            className={classes.cardMedia}
                            image={image}
                            title='product image'
                        />
                    </Link>

                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2"> {title} </Typography>
                        <Typography> {price}$ </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small" color="primary"><Typography onClick={()=>{
                            dispatch(favoriteProduct(product));
                        }}>💟</Typography></Button>
                        <Button size="small" color="primary"><Typography onClick={()=>{
                            dispatch(addToCart(product));
                        }}>🛒</Typography></Button>
                    </CardActions>
                </Card>
            </Grid>
            </>
        )
    })

    return (<>
        <CssBaseline />
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm" >
                        <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                    🛍SHOP🛍
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    👕👚💍🧥👛🖥💸
                    </Typography>
                    <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        
                        <Grid item>
                        <Button onClick={()=>{ dispatch(fetchWomenProducts()) }} variant="outlined" color="primary">
                            Women
                        </Button>
                        </Grid>

                        <Grid item>
                        <Button onClick={()=>{ dispatch(fetchMenProducts()) }} variant="outlined" color="primary">
                            Men
                        </Button>
                        </Grid>

                        <Grid item>
                        <Button onClick={()=>{ dispatch(fetchJeProducts()) }} variant="outlined" color="primary">
                            Jewelery
                        </Button>
                        </Grid>

                        <Grid item>
                        <Button onClick={()=>{ dispatch(fetchElProducts()) }} variant="outlined" color="primary">
                            Electronics
                        </Button>
                        </Grid>

                        <Grid item>
                        <Button onClick={()=>{ dispatch(fetchProducts()) }} variant="outlined" color="primary">
                            All
                        </Button>
                        </Grid>
                    </Grid>
                    </div>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {
                    isLoading?
                    <>
                    <div className={classes.circle}>
                    <CircularProgress />
                    </div>
                    <Typography component='h1' variant='h1'> Loading </Typography>
                    </>:
                    <>{listing}</>
                    }

                   
                </Grid>
            </Container>

            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    make a project by using react, redux, firebase, material ui
                </Typography>
            </footer>

        </div>
        </>
    )
}



export default Products;