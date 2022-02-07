import React, { useContext } from "react";
import styles from "./headerButtonCart.module.css";
import { Cart } from "../../assests/icons";

import CartContext from "../../store/cart-contaxt";
const HeaderButtonCart = props => {
    const cartContext = useContext(CartContext);
    const numberOfMeals = cartContext.item.reduce((acc, cur) => {
        return acc + cur.amount;
    }, 0)
    return <button onClick={() => props.onShowCart()} className={styles.button}>
        <span className={styles.icon}>{Cart}</span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfMeals}</span>
    </button>
}

export default HeaderButtonCart;