import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';
import './Header.css';
import logo from './images/logoSmall.png';
import { UserContext } from '../App';
const Header = () => {
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li>
            <NavLink to="/About">About</NavLink>
          </li>
          <li>
            <NavLink to="/Contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/Logout">Logout</NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink to="/About">About</NavLink>
          </li>
          <li>
            <NavLink to="/Contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/Signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/Login">Login</NavLink>
          </li>
        </>
      );
    }
  };
  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" class="logo" />
          </Link>
          <input
            type="text"
            placeholder="search your favorite items here"
            class="searchBar"
          />
        </div>
        <div className="right-menu">
          <ul>
            <RenderMenu />
          </ul>
        </div>
        <div className="Social-media">
          <ul className="Social-media-desktop">
            <li>
              <a
                href="https://www.instagram.com/crunchy_shiva/"
                target="_shivam"
              >
                <FiInstagram className="instagram" size={18} />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100024552923562"
                target="_shivam"
              >
                <FiFacebook className="facebook" size={18} />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UC1dJlbGkExn7-nHqmVOzRwg"
                target="_shivam"
              >
                <FiYoutube className="youtube" size={18} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
