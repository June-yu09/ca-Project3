import React from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }))

function OrderSuccess() {
    let classes = useStyles();
    const history = useHistory();
    const userId = useSelector(state=> state.firebase.auth.uid);


    useFirestoreConnect([{
        collection : 'cart',
        where : 
            [['userId','==', userId]]
        
    }]);

    return (
        <div>
            <CssBaseline />
            <Button color='success' onClick={()=>{ history.push('/') }}>ðGo to Mainpage</Button>
            <div className={classes.heroContent}>
                <Container maxWidth="sm" >
                <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>Thank you for your order!ð¸</Typography>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                <Card className={classes.card}>
                                
                                <CardContent className={classes.cardContent}>
                                    <Typography>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore </Typography>
                                    <Button size="large" color="primary" onClick={()=>{ history.push('/') }}>âï¸Go back to Home</Button>
                                </CardContent> 
                            </Card>
                </Grid>
            </Container>
            <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    make a project by using react, redux, firebase, material ui
                </Typography>
            </footer>
        </div>
    )
}
export default OrderSuccess;