import React from 'react'
import { useGlobalContext } from '../context';
import { RiMovie2Fill } from 'react-icons/ri';
const SearchForm = () => {
  let { searchValue, handelSearch } = useGlobalContext();
  return <form className='search-form' onSubmit={e => e.preventDefault()}>
    <div>
      <RiMovie2Fill />
      <h2>Search Movies</h2></div>
    <input className='form-input' type='text' value={searchValue} onChange={handelSearch} placeholder='Enter Movie Name...' />
  </form>
}

export default SearchForm
