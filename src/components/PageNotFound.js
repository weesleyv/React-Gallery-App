import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return(
		<div>
			<h2>Page Not Found!</h2>
			<button><Link to="/">Return to Home Page</Link></button>
		</div>
	)
}

export default PageNotFound;