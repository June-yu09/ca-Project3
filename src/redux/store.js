import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducer/index.js';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import firebase from '../fbConfig';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducers,
    composeEnhancer(
        applyMiddleware(thunk.withExtraArgument({getFirebase})),
        reduxFirestore(firebase)
        )
    );



export default store;

