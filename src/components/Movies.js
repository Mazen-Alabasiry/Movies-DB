import React from 'react'
import { useGlobalContext } from '../context'
import SingleMovie from './SingleMovie'
import Loading from '../components/Loading'
const Movies = () => {
  let { movies, loading } = useGlobalContext();
  if (loading) { return <Loading /> }
  return <section className='movies'>
    {
      movies.map((movie, index) => <SingleMovie key={index} data={movie} />)
    }
  </section>
}

export default Movies
