import React from 'react';
import { Link } from 'react-router-dom'
const url = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
const SingleMovie = ({ data }) => {

  return <Link to={`/movie/${data.imdbID}`}>
    <article className='movie'>
      <img src={(data.Poster === 'N/A' || data.Poster === undefined) ? url : data.Poster} alt={data.Title} />
      <div className='movie-info'>
        <h4>{data.Title}</h4>
        <p> {data.Year}</p>
      </div>
    </article>
  </Link>

}

export default SingleMovie
