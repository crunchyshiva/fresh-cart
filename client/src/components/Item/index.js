import React from 'react';
import {items} from './data';

import './index.css';

const Item = ({selectedCategory,cart,setCart,setSubTotal}) => {

   const handleCart = (item) => {
    const newState = [...cart];
    const isExist = cart.some(el => el.id === item.id);
    const index = cart.findIndex(el => el.id === item.id);
    if(!isExist){
        if(item.q === 0){
            item.q += 1
        } 
        const newArray =[
            ...cart,
            item
        ]
        item.subtotal = item.q * (item.price-item.discount);
        const total = newArray.length> 0 && newArray.reduce((previous, current, index , array) => previous + current.subtotal,0);
        setSubTotal(total);
        setCart(prevState => [...prevState,item]);      
    }else{
       newState[index].q += 1;
       newState[index].subtotal = newState[index].q * (newState[index].price-newState[index].discount);
       const total = newState.length> 0 && newState.reduce((previous, current, index , array) => previous + current.subtotal,0);
       setSubTotal(total)   
       setCart(newState)
    }
   }

  return (
    items.map(item => item.c1 === selectedCategory  &&
        <div className='item'>
            <div className='itemImage'>
                <img src={`/images/${item.icon}.jpg`} alt='icon' className='item-icon'/>
            </div>
            <div className='itemName'>{item.name}</div>
            <div className='footer'>
                <div className='pricingOption'> 500g
                  <span className='unit'></span>
                </div>
                <div className='price old'>
                    <span className='rs'>₹ {item.price}</span>
                </div>
                <div className='price new'>
                    <span className='rs'>₹ {item.price-item.discount}</span>
                </div>
                <div className='addCart' onClick={() => handleCart(item)}>Add To Cart</div>
            </div>
        </div>
    )
)}

export default Item