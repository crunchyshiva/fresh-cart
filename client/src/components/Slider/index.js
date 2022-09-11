import { Carousel } from 'antd';
import React from 'react';


const Slider = () => (
  <Carousel className='caraousel' autoplay>
    <div>
      <img src='/images/icon-chocolate.jpg' alt='caraousel-1' />
    </div>
    <div>
      <img src='/images/icon-bread.jpg' alt='caraousel-2' />
    </div>
    <div>
      <img src='/images/icon-chocolate.jpg' alt='caraousel-3' />
    </div>
  </Carousel>
);

export default Slider;