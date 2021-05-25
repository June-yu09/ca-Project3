/* eslint-disabled */
import './App.css';
import { useState } from 'react';
import Products from './components/Products';
import { Route, Link, Switch } from 'react-router-dom';
import Detail from './components/Detail';
import Navbar from './components/Navbar';
import About from './screen/About';
import Register from './components/Register';


function App() {

  const [detailData, setDetail] = useState([]);
  

  

  return (
    <div className="App">
      <Navbar />
      {/* 네비게이션바 만들기(로고클릭하면 홈으로가는버튼, 장바구니)+ 페이지간 이동은 라우터의 link이용 */}
      {/* 좀 있어보이게 점보트론넣기 */}



      <Switch>
        <Route exact path='/'>
            <Products />
            
        </Route>
        <Route path='/products/:productId'>
          
          <Detail />

        </Route>
        <Route path='/about'>
          <About />
        </Route>

        <Route path='/register'>
          <Register />
        </Route>

      </Switch>
      
      {/* 스티키푸터만들기(뒤로가기, 채팅) */}
      {/* 푸터만들기 */}
    </div>
  );
}

export default App;
