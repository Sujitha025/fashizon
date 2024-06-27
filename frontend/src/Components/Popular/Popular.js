import React from 'react';
import './Popular.css';
import data_product from '../Assets/data';
import Item from '../Items/Item';
import { useState,useEffect } from 'react';
const Popular = () => {
  const [popularProducts,setPopularProducts] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen')
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  },[])
  return (
    <div className='popular'>
    <h1>POPULAR IN WOMEN</h1>
    <hr></hr>
    <div className='popular-item'>
    {
        popularProducts.map((ite,i) => {
            return <Item key={i} id={ite.id} name={ite.name} image={ite.image} new_price={ite.new_price} old_price={ite.old_price} />
        })
    }
    </div>
    </div>
  )
}

export default Popular;