/* eslint-disabled */
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './components/Products';
import { Route, Link, Switch } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Detail from './components/Detail';
import Navbar from './components/Navbar';
import About from './screen/About';


function App() {

  const [apiData, setApiData] = useState([]);
  const [detailData, setDetail] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [apiAddress, setApi] = useState('https://fakestoreapi.com/products?limit=9');


  const fetchApi = () => {
    axios.get(apiAddress)
    .then((result)=>{
      setApiData(result.data);
    })
  }
  const fetchApiDetail = () =>{
    axios.get('https://fakestoreapi.com/products')
    .then((result)=>{
      setDetail(result.data);
    })
  }

  useEffect(() => {
    fetchApi();
    fetchApiDetail();
  }, [apiAddress])

  

  return (
    <div className="App">
      <Navbar />
      {/* 네비게이션바 만들기(로고클릭하면 홈으로가는버튼, 장바구니)+ 페이지간 이동은 라우터의 link이용 */}
      {/* 좀 있어보이게 점보트론넣기 */}



      <Switch>
        <Route exact path='/'>
            <Products apiData={ apiData } />
            {
              clicked !== true &&
              <Button variant={ 'outlined' } onClick={()=>{
                setApi('https://fakestoreapi.com/products');
                setClicked(true);
              }}>Show more</Button>
            }
        </Route>
        <Route path='/products/:id'>
          {
            detailData.length!==0&&
            <Detail detailData={ detailData }/>
          }

        </Route>
        <Route path='/about'>
          <About />
        </Route>

      </Switch>
      
      {/* 스티키푸터만들기(뒤로가기, 채팅) */}
      {/* 푸터만들기 */}
    </div>
  );
}

export default App;
