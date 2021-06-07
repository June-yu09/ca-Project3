import { useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { selectedProduct, removeSelectedProduct, addToCart, favoriteProduct } from '../redux/actions/actions';



const useStyles = makeStyles((theme) => ({
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
      paddingTop: '100%',
      height: '500px'
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }))

function Detail() {
    

    const { productId } = useParams();
    const product = useSelector(state=> state.product);

    const { id, title, image, price, description, quan } = product;
    const dispatch = useDispatch();
    const history = useHistory();
    let classes = useStyles();


    const fetchDetail =async (idNum)=>{
        let response = await axios.get(`https://fakestoreapi.com/products/${idNum}`);
        dispatch(selectedProduct(response.data));
    }

    useEffect(()=>{
        
        fetchDetail(productId);
        
        return ()=>{
            dispatch(removeSelectedProduct())
        }
    },[productId]);

    return (
        <div>   
            <Button color="primary" onClick={()=>{ history.goBack() }}>🔙Back to Hompage</Button>

            {
                !title?
                <Typography component='h2'> Loading </Typography>:
                <>
                <CssBaseline />
                <Container className={classes.cardGrid} maxWidth="md">
                            <Card className={classes.card} key={id}>
                                <CardMedia
                                className={classes.cardMedia}
                                image={image}
                                title='product image'
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2"> {title} </Typography>
                                    <Typography component='p'>Product Id {id} </Typography>
                                    <Typography > {price}$ </Typography>
                                    <Typography component='h5'> {description} </Typography>

                                </CardContent>

                                <CardActions>
                                <Button size="small" color="primary"><Typography onClick={()=>{
                                    dispatch(favoriteProduct(product));
                                }}>💟Favorite</Typography></Button>
                                <Button size="small" color="primary"><Typography onClick={()=>{
                                    dispatch(addToCart(product));
                                }}>🛒Add to Cart</Typography></Button>
                                </CardActions>
                            </Card>
                </Container>
                </>

            }     
            
            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    make a project by using react, redux, firebase, material ui
                </Typography>
            </footer>
        </div>
    )
}
export default Detail;