import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Button } from '@material-ui/core';
import { removeFromCart } from '../redux/actions/actions';



const useStyles = makeStyles({
    root:{
        maxWidth: 440,
    },
    
})
const divStyle = {
    width: '450px',
    height: '450px'
}



function Cart() {
    let classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const userId = useSelector(state=> state.firebase.auth.uid);
    useFirestoreConnect([{
        collection : 'cart',
        where : 
            [['userId','==', userId]]
        
    }]);

    const cart = useSelector(state=>state.firestore.ordered.cart);
    const handleRemove = (product) => {
        dispatch(removeFromCart(product));
    }

    return (
        <div className={classes.root}>
        <Typography component='h2'>This is Shopping cart</Typography>
        {
            cart ? 
            cart.map(product=>{
                let { id, title, category, price, image } = product;
                return(
                    <>
                    <Card className={classes.root} key={id}>
                        <img style={divStyle} src={image} alt='item'/>
                        <CardContent>
                            <Typography component='h2'> {title} </Typography>
                            <Typography component='h5'> {price} </Typography>
                            <Typography component='h5'> {category} </Typography>
                        </CardContent>
                        <Button variant='outlined' onClick={()=>{ handleRemove(product) }}>❌DELETE</Button>
                        
                    </Card>

                    
                    </>
                )
            }):
            <Typography component='h2'> Your shopping cart is empty </Typography>

        }
        <Button variant='outlined' onClick={()=>{ history.goBack() }}>🔙Back to Hompage</Button>



        </div>
    )
    
}

export default Cart;