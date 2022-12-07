import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getRecipesByName, getTypesDiets, orderByName, orderByScore, orderByTypeDiet } from '../../redux/actions';
import styles from './Home.module.css'
import { Link } from 'react-router-dom';
import Pagination from "../Cards/Pagination";
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
const Cards = lazy(() => import('../Cards/Cards'));

const Home = () => {

    const recipes = useSelector(store => store.recipesFilter)
    const types = useSelector(state => state.typeDiets)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9); //number of cards in page
    const [search, setSearch] = useState('')
    const [order, setOrder] = useState('')

    const indexOfLastPost = currentPage * recipesPerPage;
    const indexOfFirstPost = indexOfLastPost - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    
    useEffect(() => {
        setLoading(true);
        dispatch(getRecipes())
        dispatch(getTypesDiets())
        setLoading(false);
    }, [dispatch])

    function handleFilterTypeDiet(e) {
        e.preventDefault();
        dispatch(orderByTypeDiet(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)

    }
    function handleScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
    }

    function handleRecipesByName(e) {
        e.preventDefault(e)
        dispatch(getRecipesByName(search))
        setSearch('')
        setCurrentPage(1);
    }
    function handleInputName(e) {
        setSearch(e.target.value)
    }
    console.log(currentRecipes)
    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <label>Sort:</label>
                <select onChange={e => handleSort(e)} name="alphabetical" defaultValue={'DEFAULT'} className={styles.select}>
                    <option disabled value="DEFAULT">Alphabetical</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                </select>
                <select onChange={e => handleScore(e)} name="numerical" className={styles.select} defaultValue={'DEFAULT'}>
                    <option disabled value="DEFAULT">Score</option>
                    <option value="MenorMayor">From Min to Max</option>
                    <option value="MayorMenor">From Max to Min</option>
                </select>
                <label>Diet Types:</label>
                <select onChange={(e) => handleFilterTypeDiet(e)} defaultValue={'DEFAULT'} className={styles.select}>
                    <option disabled value="DEFAULT">Select...</option>
                    <option value='all' >All recipes</option>
                    {types?.map((type) => <option key={type.name} value={type.name}>{type.name}</option>)}
                </select>
                <form className={styles.form} onSubmit={(e) => { handleRecipesByName(e) }}>
                    <input placeholder="Type something here..." type="text" className={styles.input} value={search} onChange={(e) => { handleInputName(e) }}></input>
                    <button type='submit' className={styles.button}> Search 🔎</button>
                </form>
                <Link to="/recipe">
                    <button className={styles.button}>Add new recipe ➕</button>
                </Link>
            </nav>
            <Suspense fallback={<Loader></Loader>}>
                {
                    currentRecipes.length ?
                        (
                            <div>
                                <Cards recipes={currentRecipes} loading={loading}></Cards>
                                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate}></Pagination>
                            </div>
                        ) : <Error></Error>
                }
            </Suspense>
        </div>
    )
}

export default Home;