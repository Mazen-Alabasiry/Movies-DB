import React from 'react'
import { useGlobalContext } from '../context'
function Pagination() {
    let { NumbersOfPages: numbers, displayCurrentPage, currentPageIndex } = useGlobalContext();
    let numberofpages = []
    for (let index = 1; index <= 10; index++) {
        numberofpages.push(index)
    }
    return (
        <div className='btn-container'>
            <button onClick={() => {
                displayCurrentPage(currentPageIndex === 1 ? numbers : currentPageIndex - 1);
            }} className='prev-btn'>prev</button>
            {numberofpages.map((item, index) => {
                return (
                    <button onClick={() => {
                        displayCurrentPage(item);
                    }} key={index} className={`${index === currentPageIndex - 1 ? 'page-btn active-btn' : 'page-btn'}`}>{item}</button>
                )
            })}
            <button onClick={() => {
                displayCurrentPage(currentPageIndex === numbers ? 1 : currentPageIndex + 1);

            }} className='next-btn'>next</button>
        </div>
    )
}

export default Pagination