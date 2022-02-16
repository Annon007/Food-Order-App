import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import styles from "./mealItems.module.css";
import CartContext from "../../../store/cart-contaxt";
const MealItems = props => {
    const addingData = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    const formData = data => {
        console.log(data);
        addingData.addItem({
            id: props.id,
            price: props.price,
            name: props.name,
            amount: data
        })
    }
    return <li className={styles.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={styles.descriptions}>{props.descriptions}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
            <MealItemForm data={formData} />
        </div>
    </li>
}
export default MealItems;