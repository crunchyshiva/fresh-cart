import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Menu, Button ,Alert} from 'antd';
import Item from '../../components/Item/index';
import { cat } from '../../components/Category/data';
import {useNavigate} from "react-router-dom";
import './index.css';


const ItemScreen = ({ props }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subTotal, setSubTotal] = useState(0);

  const location = useLocation();
  const { Content, Sider } = Layout;

  useEffect(() => {
    const categoryData = cat.map(item => ({ label: item.name, key: item.id }))
    setCategory(categoryData);
    setSelectedCategory(location?.state?.selectedCategory);
    if(location?.state?.cart?.length > 0){
      setCart(location?.state?.cart)
      const total = location?.state?.cart.reduce((previous, current, index , array) => previous + current.subtotal,0);
      setSubTotal(total)
    }
  }, []);

  const addition = (id) => {
    const index = cart.findIndex(el => el.id === id);
    const newState = [...cart];
    newState[index].q += 1
    newState[index].subtotal = newState[index].q * (newState[index].price - newState[index].discount);
    const total = newState.length> 0 && newState.reduce((previous, current, index , array) => previous + current.subtotal,0);
    setSubTotal(total)
    setCart(newState)
  }

  const deletion = (id) => {
    const index = cart.findIndex(el => el.id === id);
    const newState = [...cart];
    newState[index].q -= 1;
    newState[index].subtotal = newState[index].subtotal -  (newState[index].price - newState[index].discount);
    const total = newState.length> 0 && newState.reduce((previous, current, index , array) => previous + current.subtotal,0);
    if(newState[index].q === 0){
      newState.splice(index, 1);
    }
    setSubTotal(total)
    setCart(newState)
  }

  const onProceedToCheckout = () => {
    if(!cart.length>0){
      setIsCartEmpty(true)
    }else{
      navigate(`/Checkout`,{state:{selectedCategory:location.state.selectedCategory,cart:cart,subTotal:subTotal}})
    }
  }

  return (
    <Layout className='itemContainer'>
      <Sider className='category-sidebar-1' >
        <Menu defaultSelectedKeys={['1']} mode="inline" items={category} 
          selectedKeys={selectedCategory} onClick={(e) => setSelectedCategory(e.key)} />
      </Sider>
      <Content className='item-content'>
          <Item selectedCategory={selectedCategory} cart={cart} setCart={setCart} setSubTotal={setSubTotal} />
      </Content>
      <Sider className='category-sidebar-2'>
      {isCartEmpty && <Alert message="cart is empty" type="error" 
          className='alert-error' closable afterClose={() => setIsCartEmpty(false)}/>}
        <div class="itemCartContainer">
          <div class="cartPriceContainer">
            <div class="row">
              <div class="total subtotal">
                <div class="text--1">Subtotal</div>
                <div class="price--1">
                  <span class="rs">₹</span>
                  <span class="value">{subTotal}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="total delivery">
                <div class="text--1">Delivery Charge</div>
                <div class="price--1">
                  <span class="rs">₹</span>
                  <span class="value">20</span>
                </div>
              </div>
            </div>
          </div>
          <div class="itemIntoCart">
            {cart.length > 0 && cart.map(item =>
              <div className='row'>
                <div className='itemImage-product'>
                  <img src={`/images/${item.icon}.jpg`} className='icon' alt='' style={{width:'100%'}}/>
                </div>
                <div className='updatePrice '>
                  <div className='units'>500g</div>
                  <div className='itemName-icon'>{item.name}</div>
                  <div className='operation'>
                    <div className='multiplecation'>
                      <div className='tab minus' onClick={() => deletion(item.id)}>-</div>
                      <div className='tab unit'>{item.q}</div>
                      <div className='tab addition' onClick={() => addition(item.id)}>+</div>
                      <div className='tab multi'>*</div>
                      <div className='tab price'>
                        <span class="rs">₹</span>
                        <span class="value">{item.price - item.discount}</span>
                      </div>
                    </div>
                    <div className='finalPrice'>
                      <span class="rs">₹</span>
                      <span class="value">{(item.price-item.discount)*item.q}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Button type="primary" className='proceedToCheckoutFooter'onClick={() => onProceedToCheckout()}>Proceed To CheckOut</Button>
        </div>
      </Sider>
    </Layout>
  )
}

export default ItemScreen