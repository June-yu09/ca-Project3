import React, {useEffect} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Button } from '@material-ui/core';
import { removeFromCart, authCheck, cartCheck } from '../redux/actions/actions';
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
        <div className={classes.root}>
        <Typography component='h2'>This is Shopping cart</Typography>
        {
            (cartList) ? 
            cartList.map(product=>{
                let { id, title, category, price, image, amount } = product;
                return(
                    <>
                    <Card className={classes.root} key={id}>
                        <img style={divStyle} src={image} alt='item'/>
                        <CardContent>
                            <Typography component='h2'> {title} </Typography>
                            <Typography component='h5'> {price} </Typography>
                            <Typography component='h5'> {category} </Typography>
                            <Typography component='h5'> {amount} </Typography>

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