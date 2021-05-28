import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts, favoriteProduct } from '../redux/actions/actions';


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
    const fetchApi = async () =>{
        const response = await axios.get('https://fakestoreapi.com/products');
        dispatch(setProducts(response.data));
    }

    useEffect(()=>{
        fetchApi();
    },[])

    return (
        <>
            <ProductComponent />
        </>
    )
}



function ProductComponent() {
    let products = useSelector(state=> state.allProducts.products);
    const dispatch = useDispatch();
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
                    <Button onClick={()=>{
                        dispatch(favoriteProduct(product))
                    }} variant="contained" color="success">Add to Favorite</Button>


                </Card>

            </>
        )
    })

    return (
        <div>
            {listing}
        </div>
    )
}

export default Products;