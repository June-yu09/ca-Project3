import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { selectedProduct, removeSelectedProduct, addToCart } from '../redux/actions/actions';


function Detail() {
    const divStyle = {
        width: '450px',
        height: '450px'
    }

    const { productId } = useParams();
    const product = useSelector(state=> state.product);
    const { id, title, image, price, description, quan } = product;
    const dispatch = useDispatch();
    const history = useHistory();
    

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

            {
                !title?
                <Typography component='h2'> Loading </Typography>:
                <>
                    <h2>{title}</h2>
                    <h5>product ID : {id}</h5>
                    <img style={divStyle} src={image} alt='productImage' />
                    <h5>Price : { price }$ </h5>
                    <p>{ description }</p>
                    <p>Stock : {quan} </p>
                            
                    <Button variant='outlined' onClick={()=>{ 
                        dispatch(addToCart(product));
                     }}>Add to Cart</Button>

                    <Button variant='outlined' onClick={()=>{ history.goBack() }}>🔙Back to Hompage</Button>
                    {/* 나중에 하단에오는 스틱바 만들면 삭제하기 */}
                    
                </>

            }     
            
            
        </div>
    )
}
export default Detail;