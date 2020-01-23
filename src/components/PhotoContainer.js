import React from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

const PhotoContainer = (props) => {
		const data = props.photos;
		const query = props.match.params.name;
		let photos;
		if (data.length > 0) {
			photos = data.map( photo => 
				<Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />
			)
		} else {
			photos = <NotFound />
		}
		return(
			<div className="photo-container">
		        <h2>Results of {query}</h2>
		        <ul>
		        	{photos}
		      	</ul>
		    </div>
		)
}

export default PhotoContainer;

