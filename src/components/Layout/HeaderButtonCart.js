import React from "react";
import styles from "./headerButtonCart.module.css"
import { Cart } from "../../assests/icons"
const HeaderButtonCart = props => {
    return <button onClick={()=>props.onShowCart()} className={styles.button}>
        <span className={styles.icon}>{Cart}</span>
        <span>Your Cart</span>
        <span className={styles.badge}>3</span>
    </button>
}

export default HeaderButtonCart;