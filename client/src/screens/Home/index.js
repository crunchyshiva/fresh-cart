import React from 'react';
import Slider from '../../components/Slider/index';
import Category from '../../components/Category';
import './index.css';

const Home = () => {
  return (
    <div className='homeContainer'>
      <Slider />
      <Category />
    </div>
  )
}

export default Home