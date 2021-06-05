import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, favoriteProduct } from '../redux/actions/actions';


const useStyles = makeStyles({
    root:{
        maxWidth: 440,
    },
    
})
const divStyle = {
    width: '450px',
    height: '450px'
}


const Products = ()=>{
    const dispatch = useDispatch();
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
    console.log('after clicking add favorites state', useSelector(state=>state.firestore.ordered.favorites));

    let classes = useStyles();
    let listing = products.map(product =>{
        let { id, title, image, price, category } = product;
        return (
            <>
            <Card className={classes.root} key={id}>
                
                    <Link to={`/products/${id}`}>
                    <img style={divStyle} src={image} alt='item'/>
                    <CardContent>
                        <Typography component='h2'> {title} </Typography>
                        <Typography component='h5'> {price} </Typography>
                        <Typography component='h5'> {category} </Typography>
                    </CardContent>
                    </Link>
                
                
                <Button variant="outlined"><Typography onClick={()=>{
                    dispatch(favoriteProduct(product));
                }}>Add to Favorite</Typography></Button>
            </Card>
            </>
        )
    })

    return (
        <div>

        {
        isLoading?
        <>
        <Typography component='h1'> Loading </Typography>
        <Typography component='h1'> Loading </Typography>
        <Typography component='h1'> Loading </Typography>
        <Typography component='h1'> Loading </Typography>
        <Typography component='h1'> Loading </Typography>

        </>:
        <>{listing}</>
        }

        {
            error.length!==0 && <div> Something went wrong {error} </div>
        }
        </div>
    )
}



export default Products;