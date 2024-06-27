import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import Item from '../Items/Item.js'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Related products</h1>
        <hr></hr>
        <div className='relatedproducts-item'>
            {data_product.map((ite,i)=>{
                return <Item key={i} id={ite.id} name={ite.name} image={ite.image} new_price={ite.new_price} old_price={ite.old_price} />
            })}
        </div>
    </div>
  )
}

export default RelatedProducts