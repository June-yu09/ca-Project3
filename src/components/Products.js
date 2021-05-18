import React from 'react'
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
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

function Products({ apiData }) {
    let classes = useStyles();
    return (
        <div>
        {/* 카테고리별 필터넣기 */}
        {/* 제품들 나열을 카드로만들기 */}

        {
            apiData.map((d)=>{
                return (
                    <Card className={classes.root}>
                        <Link to={`/products/${d.id}`}>
                            <img style={divStyle} src={d.image} alt='item'/>
                            {/* <CardMedia 
                                className={classes.media}
                                component='img'
                                alt='item'
                                height='400'
                                src={d.image}
                                title='item'
                                Images are zoomed cause CardMedia put image as background.
                            /> */ }
                            <CardContent>
                                <Typography component='h2'> {d.title} </Typography>
                            </CardContent>


                            
                        </Link>
                    </Card>
                );
            })
        }
            
        </div>
    )
}

export default Products;