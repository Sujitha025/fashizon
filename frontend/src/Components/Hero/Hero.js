import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
               <h1>Hey there!</h1>
                <div className='hero-hand-icon'>
                <p>New Collections for Everyone!!</p>
                </div>
            </div>
            <div className='hero-latest-btn'>
                <div>Latest Collections</div>
                <img src={arrow_icon} alt=""></img>
            </div>
        </div>
        <div className='hero-right'>
            <img src={hero_image} alt=""/>
        </div>
    </div>
  )
}

export default Hero