import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = () => {
		return(
		  <nav className="main-nav">
	        <ul>
	          <li><NavLink to='/cats'>Cats</NavLink></li>
	          <li><NavLink to='/dogs'>Dogs</NavLink></li>
	          <li><NavLink to='/sunset'>Sunset</NavLink></li>
	        </ul>
	      </nav>
		)
}

export default MainNav;