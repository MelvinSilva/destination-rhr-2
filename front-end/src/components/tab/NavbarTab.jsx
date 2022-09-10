import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsHouseDoorFill } from 'react-icons/bs';
import { IoBedOutline, IoRestaurantOutline } from 'react-icons/io5';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function NavbarTab() {
  return (
    <div className="navbar-tab">
      <div className="tab-return">
        <NavLink
          to="/home/choice-station"
          className={({ isActive }) => `tab${isActive ? '--active' : ''}`}
        >
          <BsHouseDoorFill />
        </NavLink>
      </div>
      <div className="tab">
        <NavLink
          to="accomodation"
          className={({ isActive }) => `tab${isActive ? '--active' : ''}`}
        >
          <IoBedOutline />
          <p>&nbsp;couchage</p>
        </NavLink>
      </div>
      <div className="tab">
        <NavLink
          to="eat"
          className={({ isActive }) => `tab${isActive ? '--active' : ''}`}
        >
          <IoRestaurantOutline />
          <p>&nbsp;se restaurer</p>
        </NavLink>
      </div>
      <div className="tab">
        <NavLink
          to="store"
          className={({ isActive }) => `tab${isActive ? '--active' : ''}`}
        >
          <AiOutlineShoppingCart />
          <p>&nbsp;shop</p>

        </NavLink>
      </div>

    </div>
  );
}

export default NavbarTab;
