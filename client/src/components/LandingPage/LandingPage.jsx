import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
const LandingPage = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles.container} ${styles.container_element}`}>
                <p className={styles.title}>Recipes</p>
                <h3 className={styles.title}>and</h3>
                <h1 className={styles.title}>Diets</h1>
                <Link to='/home'><button className={styles.button}>Get Start</button></Link>
            </div>
        </div>
    )
}

export default LandingPage;