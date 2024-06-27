import React from 'react'
import './NewCollections.css'
// import new_collection from '../Assets/new_collections';
import Item from '../Items/Item.js'
import { useState,useEffect } from 'react';

const NewCollections = () => {
  const [new_collection,setNew_Collection] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/newcollections')
        .then((response)=>response.json())
        .then((data)=>setNew_Collection(data));
    },[])
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr></hr>
        <div className='collections'>
            {new_collection.map((ite,i) => {
                return <Item key={i} id={ite.id} name={ite.name} image={ite.image} new_price={ite.new_price} old_price={ite.old_price} />
            })}
        </div>
    </div>
  )
}

export default NewCollections;