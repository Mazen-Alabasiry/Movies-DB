import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=160e88be`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [functionality, setFunctionality] = useState('home')
  const [movies, setMovies] = useState([]);
  //
  const [currentPageData] = useState([])
  const [currentPageIndex, setCurrentPageIndex] = useState(1)
  const [NumbersOfPages] = useState(10)
  //


  const SearchMovies = async () => {
    setLoading(true)
    try {

      let response = await fetch(`${API_ENDPOINT}` + `&s=${searchValue !== '' ? searchValue : 'batman'}`.split(' ').join('%20') + `&page=${currentPageIndex}`);
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
  /// At Searching
  useEffect(() => {
    SearchMovies();
  }, [searchValue])


  const getMovies = async () => {
    try {

      const res = await fetch(
        `https://www.omdbapi.com/?apikey=160e88be}&s=Batman&page=${currentPageIndex}`
      );
      const movies = await res.json();
      setMovies(movies.Search)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  };
  /// At First Render 
  useEffect(() => {
    setLoading(true)
    getMovies();
  }, [])
  /// At change pagination
  useEffect(() => {
    setLoading(true)
    functionality === 'home' ? getMovies() : SearchMovies();
  }, [currentPageIndex])
  ///

  const handelSearch = (e) => {
    setSearchValue(e.target.value)
    setFunctionality('search')
  }


  ////


  const displayCurrentPage = (number) => {
    setCurrentPageIndex(number);
  }
  return <AppContext.Provider value={{
    searchValue, handelSearch, movies, loading, currentPageData, displayCurrentPage, currentPageIndex, NumbersOfPages
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }


















// try {
//   let page = 1;
//   while (page <= 20) {
//     const res = await fetch(
//       `https://www.omdbapi.com/?apikey=c24c2c7d&s=Batman&page=${page}`
//     );
//     const movies = await res.json();
//     movies.Search.forEach((movie) => moviesList.push(movie));
//     page++;
//   }
//   setMovies(moviesList)
//   setLoading(false)
// } catch (error) {
//   console.log(error.message)
// }







// try {

//   let moviesList = [];
//   let page = 1;
//   while (page <= 10) {
//     const res = await fetch(
//       `https://www.omdbapi.com/?apikey=c24c2c7d&s=${`${searchValue !== '' ? searchValue : 'batman'}`.split(' ').join('+').trim()}&page=${page}`);
//     const movies = await res.json();

//     if (movies.Response === 'True') {
//       movies.Search.forEach((movie) => moviesList.push(movie));
//       setMovies(moviesList);
//       setLoading(false)
//     } else {
//       setLoading(false)
//     }
//     page++;

//   }

// } catch (error) {
//   console.log(error.message)
// }