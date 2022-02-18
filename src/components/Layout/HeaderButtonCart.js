import React, { useContext, useEffect, useState } from "react";
import styles from "./headerButtonCart.module.css";
import { Cart } from "../../assests/icons";

import CartContext from "../../store/cart-contaxt";
const HeaderButtonCart = props => {
    const [btnHighlight, setBtnHighlight] = useState(false);
    const cartContext = useContext(CartContext);
    const numberOfMeals = cartContext.item.reduce((acc, cur) => {
        return acc + cur.amount;
    }, 0);
    const { item } = cartContext;
    const btnAnnimation = `${styles.button} ${btnHighlight ? styles.bump : ""}`
    useEffect(() => {
        if (item.length === 0) return;
        setBtnHighlight(true);
        const timer = setTimeout(() => {
            setBtnHighlight(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [item])
    return <button onClick={() => props.onShowCart()} className={btnAnnimation}>
        <span className={styles.icon}>{Cart}</span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfMeals}</span>
    </button>
}

export default HeaderButtonCart;