import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


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
    const carts = useSelector(state=>state.cart.products)
    let classes = useStyles();
    const listing = carts.map(cart=>{
        let { id, title, image, price, category, quan } = cart;
        return (
            <Card className={classes.root} key={id}>
                    <img style={divStyle} src={image} alt='item'/>
                    <CardContent>
                        <Typography component='h2'> {title} </Typography>
                        <Typography component='h5'> {price} </Typography>
                        <Typography component='h5'> {category} </Typography>
                        <Typography component='h5'>stock: {quan} </Typography>

                    </CardContent>
                    

            </Card>
        )
    })

    return (
        <div>
            This is Shopping Cart

            {
                carts?
                <div>{listing}</div>:
                <h1>Your Cart is empty</h1>
            }
            
            
        </div>
    )
}

export default Favorites;