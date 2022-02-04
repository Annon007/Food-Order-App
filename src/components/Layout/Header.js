import React from "react";
import meals from "../../assests/meals.jpg"
import styles from "./header.module.css"
const Header = () => {
    return <>
        <header className={styles.header}>
            <h1>KhudaLagse</h1>
            <button>Cart</button>
        </header>
        <div className={styles.mainImage}>
            <img src={meals} />
        </div>
    </>
}

export default Header;