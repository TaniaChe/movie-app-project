import React from 'react';
import './MoviesList.css';
import { BsFillHeartFill } from 'react-icons/bs';
export default function MoviesList ({data, handleFavorite, checkFavorite}) {
	console.log(checkFavorite)
  return (

    <div className='wrapper'>
		{data.map((item) => { 
			const isFav = checkFavorite(item.imdbID)
			return (

			<div className='card-container'>
				<p>{item.Title} <BsFillHeartFill  className={isFav ? 'favotite red' : 'favorite'} onClick={() => handleFavorite(item)}/></p>
				
				<img src={item.Poster} alt=""/>
			</div>
		)})}
		
	 </div>

  );
}