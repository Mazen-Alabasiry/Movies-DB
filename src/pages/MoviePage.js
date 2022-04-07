import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_ENDPOINT } from '../context'
import Loading from '../components/Loading'
const url = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
function MoviePage() {
    const [movie, setMovie] = useState({});
    let { id } = useParams();
    ////
    const getMovie = async (id) => {
        await fetch(API_ENDPOINT + `&i=${id}`)
            .then((response) => response.json())
            .then(async (data) => {
                let title = data.Title.split(" ").join("%20");
                await fetch(API_ENDPOINT + `&t=${title}`)
                    .then((res) => res.json())
                    .then((data) => setMovie(data));
            });
    };

    useEffect(() => {
        getMovie(id);
    }, [id])
    ///
    if (Object.keys(movie).length === 0) {
        return <Loading />
    }
    return (
        <section className='single-movie'>
            <img src={(movie.Poster === 'N/A' || movie.Poster === undefined) ? url : movie.Poster} alt={movie.Title} />
            <div className='single-movie-info'>


                <h2>{movie.Title}</h2>
                <p>{movie.Plot}</p>
                <div className='block'><span>Actors:</span><h4>{movie.Actors}</h4></div>
                <div className='block'> <span>Director:</span><h4>{movie.Director}</h4></div>
                <div className='block'><span>Duration:</span><h4>{movie.Runtime}</h4></div>
                <div className='block'><span>Type:</span><h4>{movie.Type}</h4></div>
                <div className='block'><span>Country:</span><h4>{movie.Country}</h4></div>
                <div className='block'><span>Language:</span><h4>{movie.Language}</h4></div>
                <div className='block'><span>Genres:</span><h4>{movie.Genre}</h4></div>
                <div className='block'><span>PG Rating:</span><h4>{movie.Rated}</h4></div>
                <div className='block'><span>Year:</span><h4>{movie.Year}</h4></div>
                <div className='block'><span>Released:</span><h4>{movie.Released}</h4></div>
                <div className='block'><span>Awards:</span><h4>{movie.Awards}</h4></div>
                <div className='block'><span>Box Office:</span><h4>{movie.BoxOffice}</h4></div>
                <div className='ratings'>
                    {Object.keys(movie).length !== 0 && movie.Ratings.map((item, index) =>
                        <div key={index}>
                            <span> {item.Source === 'Internet Movie Database' ? 'IMDb' : item.Source}:</span> <h4>{item.Value}</h4>
                        </div>
                    )}
                </div>
                <Link to='/' className='btn'>Back To Movies</Link>
            </div>
        </section>
    )
}

export default MoviePage