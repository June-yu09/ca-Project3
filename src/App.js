/* eslint-disabled */
import Products from './components/Products';
import { Route, Switch } from 'react-router-dom';
import Detail from './components/Detail';
import Navbar from './components/Navbar';
import About from './screen/About';
import SignUp from './screen/SignUp';
import SignIn from './screen/SignIn';
import Favorites from './screen/Favorites';
import Cart from './screen/Cart';
import OrderSuccess from './screen/OrderSuccess';

function App() {

  

  

  return (
    <div className="App">
      <Navbar />



      <Switch>

        <Route exact path='/' component={Products} />   
        <Route path='/products/:productId' component={Detail} />
        <Route path='/about' component={About} />
        <Route path='/ordered' component={OrderSuccess} /> 
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/favorites' component={Favorites} />
        <Route path='/cart' component={Cart} />



          
      </Switch>
      
    </div>
  );
}

export default App;
