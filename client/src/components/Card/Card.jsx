import React from "react";
import { Link } from "react-router-dom";
import styles from './Card.module.css'
export default function Card({ id, image, name, diets, healthScore }) {
    return (
        <Link to={`/recipeDetail/${id}`}>
            <div className={styles.flip}>
                <div className={styles.front} style={{backgroundImage: `url(${image})`}}>
                    <h1 className={styles.text_card}>{name}</h1>
                    <br />
                    <h4 className={styles.text_card}>{healthScore}</h4>
                </div>
                <div className={styles.back}>
                    <h2>Diets: </h2>
                    <p >{diets?.map((e, index)=> {return <span key={index}> {e}</span>})}</p>
                </div>
            </div>
        </Link>
    )
}