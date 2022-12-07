import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRecipeByID } from "../../redux/actions";
import styles from "./RecipeDetail.module.css";


const RecipeDetail = () => {
    const dispatch = useDispatch();
    const diet = useSelector(store => store.recipe)
    console.log(diet);
    const { id } = useParams()
    useEffect(() => {
        dispatch(getRecipeByID(id))
        return () => {
            console.log('Cleanup')
            dispatch(getRecipeByID())
        }
    }, [])
    return (
        <div className={styles.container} key={diet.id}>
            <div className={styles.head}>
                <Link to='/home'><button className={styles.btn}>Volver</button></Link>
            </div>
            <div className={styles.info}>
                <h1>{diet.name}</h1>
                <p className={styles.infop}><b>Types: </b>{diet.dishTypes}</p>
                <img src={diet.image} alt="" />
                <p className={styles.infop}><b>Dietas: </b>
                    {diet.diets ? diet.diets.map(e => { return <span> {e}</span> }) : false
                    }
                </p>
                <p className={styles.infop}><b>Score: </b> {diet.healthScore} </p>
                <p><b>Resumen: </b> {diet.summary} </p>
                <p><b>Pasos: </b> {diet.steps} </p>
            </div>
        </div >

    )
}
export default RecipeDetail;