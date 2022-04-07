import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=c24c2c7d`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  //

  /// At Searching
  const FetchMovies = async () => {
    setLoading(true)
    try {

      let moviesList = [];
      let page = 1;
      while (page <= 10) {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=c24c2c7d&s=${`${searchValue !== '' ? searchValue : 'batman'}`.split(' ').join('+').trim()}&page=${page}`);
        const movies = await res.json();

        if (movies.Response === 'True') {
          movies.Search.forEach((movie) => moviesList.push(movie));
          setMovies(moviesList);
          setLoading(false)
        } else {
          setLoading(false)
        }
        page++;

      }

    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    FetchMovies();
  }, [searchValue])

  /// At First Render 

  useEffect(() => {
    setLoading(true)

    const moviesList = [];
    const getMovies = async () => {
      try {
        let page = 1;
        while (page <= 20) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=c24c2c7d&s=Batman&page=${page}`
          );
          const movies = await res.json();
          movies.Search.forEach((movie) => moviesList.push(movie));
          page++;
        }
        setMovies(moviesList)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    };


    getMovies();
  }, [])
  ///

  const handelSearch = (e) => {
    setSearchValue(e.target.value)
  }




  return <AppContext.Provider value={{
    searchValue, handelSearch, movies, loading
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
