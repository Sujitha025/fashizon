import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='description-box'>
        <div className='descriptionbox-navigator'>
            <div className='description-nav-box'>
                Description
            </div>
            <div className='description-nav-box fade'>
                Reviews(122)
            </div>
        </div>
        <div className='descriptionbox-description'>
            <p>Welcome to Fashizon, your ultimate destination for an unparalleled online shopping experience. Our platform is designed to bring you a seamless, enjoyable, and secure way to shop for a wide variety of products, all from the comfort of your home.</p>
            <p>We collaborate with reputable brands and suppliers to ensure that all products offered on our platform meet the highest standards of quality. Every product is carefully vetted to provide our customers with the best.</p>
        </div>
    </div>
  )
}

export default DescriptionBox