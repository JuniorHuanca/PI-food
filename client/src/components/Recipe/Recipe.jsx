import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypesDiets, postRecipe } from '../../redux/actions/index'
import styles from './Recipe.module.css'
function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Se requiere un Nombre';
    }
    if (!input.summary) {
        errors.summary = 'Se requiere un resumen del plato'
    }
    if (!input.healthScore || input.healthScore < 0 || input.healthScore > 100) {
        errors.healthScore = 'healthScore debe estar entre 0-100'
    }
    if (!input.steps) {
        errors.steps = 'Se requiere los pasos para realizar esta receta'
    }
    if (!input.dishTypes) {
        errors.dishTypes = 'Se requiere un tipo de plato'
    }
    if (input.diets.length <= 0) {
        errors.diets = 'Se requiere al menos un tipo de dieta'
    }
    return errors;
}
const Recipe = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((store) => store.typeDiets);
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        dishTypes: "",
        steps: "",
        image: "",
        diets: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleSelectDiets(e) {
        if (input.diets.length > 4) {
            return setErrors({
                ...errors,
                diets: 'La receta no puede contener más de 5 tipos de dietas'
            })
        }
        if (input.diets.includes(e.target.value)) {
            return setErrors({
                ...errors,
                diets: 'La receta no puede contener el mismo tipo de dieta más de 2 veces.'
            })
        }
        setErrors({
            ...errors,
            diets: ''
        })
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }
    function handleSelectTypes(e) {
        setInput({
            ...input,
            dishTypes: e.target.value
        })
        setErrors({
            ...errors,
            dishTypes: ''
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        if (!input.name || !input.summary || !input.healthScore || !input.dishTypes || !input.steps || !input.diets.length) {
            return alert('Recceta no creada, complete los campos requeridos')
        }
        // console.log(input)
        dispatch(postRecipe(input))
        alert('Recceta creada')
        setInput({
            name: "",
            summary: "",
            healthScore: "",
            dishTypes: "",
            steps: "",
            image: "",
            diets: []
        })
        history.push('/home')
    }
    function handleDeleteDiets(e) {
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== e)
        })
    }
    useEffect(() => {
        dispatch(getTypesDiets())
    }, [dispatch])
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <Link to='/home'><button className={styles.btn}>Volver</button></Link>
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className={styles.page}>
                    <h1 className={styles.tittle}>Nueva receta</h1>
                    <div className={`${styles.field} ${styles.field_v1}`}>
                        <label className={styles.ha_screen_reader}>Name</label>
                        <input className={styles.field__input} placeholder="write a recipe name" value={input.name} onChange={(e) => handleChange(e)} name="name" />
                        <span className={styles.field__label_wrap} aria-hidden="true">
                            <p className={`${styles.field__label} ${errors.name && styles.error}`}>Name</p>
                        </span>
                    </div>
                    {errors.name && (
                        <p className={styles.error_p}>{errors.name}</p>
                    )}
                    <div className={`${styles.field} ${styles.field_v1}`}>
                        <label className={styles.ha_screen_reader}>Summary</label>
                        <textarea className={styles.field__input} placeholder="write a recipe summary" value={input.summary} onChange={(e) => handleChange(e)} name="summary" />
                        <span className={styles.field__label_wrap} aria-hidden="true">
                            <span className={`${styles.field__label} ${errors.summary && styles.error}`}>summary</span>
                        </span>
                    </div>
                    {errors.summary && (
                        <p className={styles.error_p}>{errors.summary}</p>
                    )}
                    <div className={`${styles.field} ${styles.field_v1}`}>
                        <label className={styles.ha_screen_reader}>HealthScore</label>
                        <input className={styles.field__input} placeholder="example: 32" value={input.healthScore} onChange={(e) => handleChange(e)} name="healthScore" type="number" />
                        <span className={styles.field__label_wrap} aria-hidden="true">
                            <span className={`${styles.field__label} ${errors.healthScore && styles.error}`}>HealthScore</span>
                        </span>
                    </div>
                    {errors.healthScore && (
                        <p className={styles.error_p}>{errors.healthScore}</p>
                    )}
                    <div className={`${styles.field} ${styles.field_v1}`}>
                        <label className={styles.ha_screen_reader}>Steps</label>
                        <textarea className={styles.field__input} placeholder="write a recipe steps" value={input.steps} onChange={(e) => handleChange(e)} name="steps" type="text" />
                        <span className={styles.field__label_wrap} aria-hidden="true">
                            <span className={`${styles.field__label} ${errors.steps && styles.error}`}>Steps</span>
                        </span>
                    </div>
                    {errors.steps && (
                        <p className={styles.error_p}>{errors.steps}</p>
                    )}
                    <div className={`${styles.field} ${styles.field_v1}`}>
                        <label className={styles.ha_screen_reader}>Image</label>
                        <input className={styles.field__input} placeholder="example: https://example/image.com" value={input.image} onChange={(e) => handleChange(e)} name="image" type="text" />
                        <span className={styles.field__label_wrap} aria-hidden="true">
                            <span className={`${styles.field__label} ${errors.image && styles.error}`}>Image</span>
                        </span>
                    </div>
                    <div className={styles.field}>
                        <label>DishTypes:</label>
                        <select onChange={(e) => handleSelectTypes(e)} defaultValue={'DEFAULT'} className={`${errors.dishTypes && styles.error} ${styles.select}`}>
                            <option disabled value="DEFAULT" >Select...</option>
                            <option value='side dish'>side dish</option>
                            <option value='lunch'>lunch</option>
                            <option value='main course'>main course</option>
                            <option value='main dish'>main dish</option>
                            <option value='dinner'>dinner</option>
                            <option value='morning meal'>morning meal</option>
                            <option value='brunch'>brunch</option>
                            <option value='breakfast'>breakfast</option>
                            <option value='soup'>soup</option>
                        </select>

                    </div>
                    {errors.dishTypes && (
                        <p className={styles.error_p}>{errors.dishTypes}</p>
                    )}
                    <div className={styles.field}>
                        <label>Types Diet:</label>
                        <select onChange={(e) => handleSelectDiets(e)} defaultValue={'DEFAULT'} className={`${errors.diets && styles.error} ${styles.select}`}>
                            <option value="DEFAULT" disabled>Select...</option>
                            {types?.map((type) => { return <option value={type.name} key={type.id}>{type.name}</option> })}
                        </select>
                    </div>
                    {errors.diets && (
                        <p className={styles.error_p}>{errors.diets}</p>
                    )}
                    <div className={styles.container_diets}>
                        {
                            input.diets.map(el =>
                                <div key={el} className={styles.container_diets}>
                                    <p >{el} <button to='#' onClick={() => handleDeleteDiets(el)} className={styles.btnX}>X</button></p>

                                </div>
                            )
                        }
                    </div>


                    <button type='submit' className={`${styles.btn} ${styles.color}`}>Crear receta</button>
                </div>

            </form>
        </div>
    )
}

export default Recipe;
