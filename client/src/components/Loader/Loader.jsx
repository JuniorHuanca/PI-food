import styles from './Loader.module.css'
const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}>
                <div className={styles.box_1}>
                </div>
                <span>
                    Loading.....
                </span>
            </div>
        </div>

    )
}

export default Loader;