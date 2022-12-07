import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css'
import Loader from '../Loader/Loader'

const Cards = ({ recipes, loading }) => {
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <>
            <div className={styles.container}>
                {
                    recipes.map((e, index) => {
                        return (
                            <Card key={index}
                                id={e.id || e.idApi}
                                name={e.name}
                                image={e.image}
                                diets={e.diets}
                                healthScore ={e.healthScore}
                            />

                        )
                    })
                }
            </div>
        </>
    );
}
export default Cards;