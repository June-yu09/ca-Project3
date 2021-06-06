import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from './fbConfig';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducer/index';
import thunk from 'redux-thunk';





const store = createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument({getFirebase}))
    );



const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance,
};


ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <App />
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);
