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
    const favs = useSelector(state=>state.favorites.products)
    let classes = useStyles();
    const listing = favs.map(fav=>{
        let { id, title, image, price, category } = fav;
        return (
            <Card className={classes.root} key={id}>
                    <img style={divStyle} src={image} alt='item'/>
                    <CardContent>
                        <Typography component='h2'> {title} </Typography>
                        <Typography component='h5'> {price} </Typography>
                        <Typography component='h5'> {category} </Typography>
                    </CardContent>
                    

            </Card>
        )
    })

    return (
        <div>
            This is favorites page

            {
                favs?
                <div>{listing}</div>:
                <h3>Favorite List is empty</h3>
            }
            
            
        </div>
    )
}

export default Favorites;