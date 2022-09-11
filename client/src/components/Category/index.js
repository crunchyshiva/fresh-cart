import React from 'react';
import './index.css';
import {cat} from './data';

const Category = () => {
  return (
    <div>
        <div className='caption'>categories</div>
        {cat.map(item =>
            <div className='categories'>
            <div className='category-icon'>
                <img src={`/images/${item.icon}`} alt='icon'/>
            </div>
            <div className='name'>{item.name}</div>
            <div className='des'>{item.des}</div>
        </div>)}
    </div>
)}

export default Category