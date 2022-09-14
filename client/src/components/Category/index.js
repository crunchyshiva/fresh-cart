import React from 'react';
import {useNavigate} from "react-router-dom"
import './index.css';
import {cat} from './data';

const Category = () => {
    const navigate = useNavigate();
  return (
    <div >
        <div className='caption'>Categories</div>
        {cat.map(item =>
            <div className='categories' onClick={()=> navigate(`/Item`,{state:{selectedCategory:item.id}})}>
                <div className='category-icon'>
                    <img src={`/images/${item.icon}`} alt='icon'/>
                </div>
                <div className='name'>{item.name}</div>
                <div className='des'>{item.des}</div>
            </div>
        )}
    </div>
)}

export default Category