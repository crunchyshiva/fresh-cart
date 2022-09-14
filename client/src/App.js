import React, { useReducer, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/index';
import Home from './screens/Home/index';
import Item from './screens/ItemScreen/index';
import Checkout from './screens/checkout/index';
import About from './screens/About/index';
import Contact from './screens/Contact/index';
import Signup from './screens/Signup/index';
import Login from './screens/Login/index';
import Logout from './screens/Logout/index';
import Errorpage from './screens/ErrorHandling/index';

import { initialState, reducer } from './reducer/UseReducer';

import 'antd/dist/antd.css';
//  context API
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Item" element={<Item />} />
      <Route path="/Checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Header />
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
