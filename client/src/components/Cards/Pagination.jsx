import React from 'react'
import styles from './Cards.module.css'
const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage, setCurrentPage }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i)
  }
  const handleNext = () => {
    setCurrentPage(currentPage + 1)
    console.log(currentPage) 
  }

  const handlePrev = () => {
    setCurrentPage(currentPage - 1)
    console.log(currentPage) 
  }
  return (
    <div className={styles.pages}>
      <button className={styles.btn} onClick={handlePrev} disabled={currentPage === pageNumbers[0] ? true : false}>prev</button>
        {
          pageNumbers.map(number => (
            <button className={`${styles.btn} ${currentPage === number ? styles.active : styles.disabled}`} key={number} onClick={() => paginate(number)} href='/home'>{number}</button>
          ))
        }
      <button className={styles.btn} onClick={handleNext} disabled={currentPage === pageNumbers.length ? true : false}>next</button>

    </div>
      )
}

export default Pagination









// import React, { useState } from 'react'
// import styles from './Cards.module.css'
// const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage, setCurrentPage }) => {
//   const [pageNumberLimit, setPageNumberLimit] = useState(5)
//   const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
//   const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
//   const pageNumbers = []
//   for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
//     pageNumbers.push(i)
//   }
//   const handleNext = () => {
//     setCurrentPage(currentPage + 1)
//     console.log(currentPage) 
//     if(currentPage + 1 > maxPageNumberLimit){
//       setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
//       setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
//     }
//   }

//   const handlePrev = () => {
//     setCurrentPage(currentPage - 1)
//     // console.log(currentPage) 
//     // if((currentPage - 1) % pageNumberLimit === 0){
//     //   setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
//     //   setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
//     // }
//   }
//   return (
//     <div className={styles.pages} onClick={handlePrev}>
//       <button className={styles.btn}>prev</button>
//         {
//           pageNumbers.map(number => (
//             <button className={`${styles.btn} ${currentPage === number ? styles.active : styles.disabled}`} key={number} onClick={() => paginate(number)} href='#/home'>{number}</button>
//           ))
//         }
//       <button className={styles.btn} onClick={handleNext}>next</button>

//     </div>
//   )
// }

// export default Pagination