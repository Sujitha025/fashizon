import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewLetter from '../Components/NewsLetter/NewLetter'


export const Shop = () => {
  return (
    <div>
       <Hero></Hero>
       <Popular></Popular>
       <Offers></Offers>
       <NewCollections></NewCollections>
       <NewLetter></NewLetter>
    </div>
  )
}
