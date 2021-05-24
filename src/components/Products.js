import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../redux/actions';


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
    const products = useSelector(state=>state);
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