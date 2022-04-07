import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  //
  const FetchMovies = async () => {
    setLoading(true)
    try {

      let response = await fetch(`${API_ENDPOINT}` + `&s=${searchValue !== '' ? searchValue : 'batman'}`.split(' ').join('%20'));
      let data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search)
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    FetchMovies();
  }, [searchValue])
  ///
  useEffect(() => {
    setLoading(true)

    const moviesList = [];
    const getMovies = async () => {
      try {
        let page = 1;
        while (page <= 10) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=Batman&page=${page}`
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
  //
  const handelSearch = (e) => {
    setSearchValue(e.target.value)
  }


  return <AppContext.Provider value={{ searchValue, handelSearch, movies, loading }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
