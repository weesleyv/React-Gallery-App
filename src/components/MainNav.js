import React from 'react';
import { NavLink } from 'react-router-dom';

class MainNav extends React.Component {
	//passing performsearch() func through props and use NavLinks innertext as a param,
	//@param{e} - event
		handleClick = e => {
			const query = e.target.innerText;
			this.props.onSearch(query)
		}
		render() {
			return(
			  <nav className="main-nav">
		        <ul>
		          <li><NavLink to='/search/cats' onClick={this.handleClick}>Cats</NavLink></li>
		          <li><NavLink to='/search/dogs' onClick={this.handleClick}>Dogs</NavLink></li>
		          <li><NavLink to='/search/sunset' onClick={this.handleClick}>Sunset</NavLink></li>
		        </ul>
		      </nav>
			)
		}
}

export default MainNav;