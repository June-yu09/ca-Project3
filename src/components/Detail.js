import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';



function Detail({detailData}) {
    const { id } = useParams();
    const history = useHistory();
    const divStyle = {
        width: '450px',
        height: '450px'
    }
    let myProduct = detailData.find(e=>{
                return e.id == id;
            })

    return (
        <div>        
            <h2>{myProduct.title}</h2>
            <img style={divStyle} src={myProduct.image} alt='productImage' />
            <h5>Price : { myProduct.price }</h5>
            <p>{ myProduct.description }</p>
                    
            
            <Button variant='outlined' onClick={()=>{ history.goBack() }}>Back to Homepage</Button>
            {/* 나중에 하단에오는 스틱바 만들면 삭제하기 */}
                    
            
        </div>
    )
}
export default Detail;