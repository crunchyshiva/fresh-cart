import React, { useState, useEffect ,useContext} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Modal } from 'antd';
import axios from "axios";
import './index.css';
import { UserContext } from '../../App';

const Checkout = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const deliveryCharge = 20;
    const [cart, setCart] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [alert, setAlert] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [address, setAddress] = useState({
        name: '',
        house: '',
        street: '',
        area: ''
    });

    useEffect(() => {
        setCart(location.state.cart);
        setSubTotal(location.state.subTotal)
    }, []);

    const handleAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
        setAlert(false)
    }

    const handlePlaceOrder = () => {
        const isEmpty = Object.values(address).some(element => element === '')
        isEmpty ? setAlert(true) : setIsModalOpen(true);
    }

    const handleOk = () => {
        if(state){
            const order = {
                items:cart,
                amount:subTotal+deliveryCharge,
                userDetail:{
                    name:'username',
                    mobileNumber:'8430212018'
                },
                userAddress:{
                    name:address.name,
                    house:address.house,
                    street:address.street,
                    area:address.area
                },
            }
            axios({
                url: "http://localhost:8080/order",
                method: "POST",
                data: order,
            })
            .then((res) => {setOrderPlaced(true)})
            .catch((err) => {console.log(err)});
        }else{
            navigate('/login')
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <div class="checkoutScreen">
            <div class="header">
                <img src="../images/icon-left-white.png" alt="" class="iconBack" onClick={() => navigate(`/Item`, { state: { selectedCategory: location.state.selectedCategory, cart: cart } })} />
                <div class="notifyBar"></div>
            </div>
            <div class="contentContainer">
                {isModalOpen && <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p><b>Confirm Your Order ?</b></p>
                </Modal>}
                {orderPlaced && <Alert message="Your order has been successfully placed." type="error" className='alert-success' closable afterClose={() => setOrderPlaced(false)} />}
                {alert && <Alert message="we would like to know your delivery place" type="error" className='alert-error' closable afterClose={() => setAlert(false)} />}
                <div class="userDetailsContainer">
                    <div class="rows address">
                        <div class="checkCounter">1</div>
                        <div class="rowHeader">Address Details</div>
                        <div class="caption">Name</div>
                        <input type="text" name="name" placeholder="First & last Name" class="value"
                            onChange={(e) => handleAddress(e)} />
                        <div class="caption">Flat/House/Office Number</div>
                        <input type="text" name="house" placeholder="Flat/House/Office Number" class="value"
                            onChange={(e) => handleAddress(e)} />
                        <div class="caption">Street/Society/Office Name</div>
                        <input type="text" name="street" placeholder="street address" class="value"
                            onChange={(e) => handleAddress(e)} />
                        <div class="caption">Area</div>
                        <input type="text" name="area" placeholder="EX-sector-x" class="value"
                            onChange={(e) => handleAddress(e)} />
                    </div>
                    <div class="rows placeOrder">
                        <div class="checkCounter">2</div>
                        <div class="rowHeader">Payments</div>
                        <div class="caption">Pay On Delivery
                        </div>
                        <div class="btnSave placeOrder" onClick={() => handlePlaceOrder()}>Place Order</div>
                    </div>
                </div>
                <div class="cartItemDetails">
                    <div class="total subtotal ">
                        <div class="text ">Subtotal</div>
                        <div class="cartPrice">
                            <span class="rs ">₹</span>
                            <span class="value ">{subTotal}</span>
                        </div>
                    </div>
                    <div class="total deliveryCharge ">
                        <div class="text ">Delivery Charge</div>
                        <div class="cartPrice ">
                            <span class="rs ">+ ₹</span>
                            <span class="value ">{deliveryCharge}</span>
                        </div>
                    </div>
                    <div class="total cartValue ">
                        <div class="text ">Amount</div>
                        <div class="cartPrice">
                            <span class="rs ">₹</span>
                            <span class="value ">{subTotal + deliveryCharge}</span>
                        </div>
                        <div class="text subtext ">(incl. of all taxes)</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout