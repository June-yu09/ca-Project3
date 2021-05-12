/* eslint-disabled */
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './components/Products';
import SearchBar from './components/SearchBar';


function App() {

  const [apiData, setApiData] = useState([]);
  const fetchApi = () => {
    axios.get('https://fakestoreapi.com/products')
    .then((result)=>{
      setApiData(result.data);
    })
  }

  useEffect(() => {
    fetchApi();
  }, [])

  return (
    <div className="App">
      {/* <SearchBar /> */}
      <Products apiData={ apiData } />
    </div>
  );
}

export default App;
