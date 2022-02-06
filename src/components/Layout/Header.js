import React from "react";
import meals from "../../assests/meals.jpg"
import styles from "./header.module.css";

import HeaderButtonCart from "./HeaderButtonCart";

const Header = () => {
    return <>
        <header className={styles.header}>
            <h1>KhudaLagse</h1>
            <HeaderButtonCart />
        </header>
        <div className={styles.mainImage}>
            <img src={meals}  alt="Table of food"/>
        </div>
    </>
}

export default Header;