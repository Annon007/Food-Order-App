import React, {useContext} from "react";
import Modal from "../UI/Modal";
import styles from "./cart.module.css";
import CartContext from "../../store/cart-contaxt";
import CartItem from "./CartItem";

const Cart=props=>{

    const cartCTX = useContext(CartContext);
    const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;
    const cartCheck = cartCTX.item.length>0;

    const cartAddHandeler = () =>{

    };
    const cartRemoveHandeler = () =>{

    }
    const cartItems=(
        <ul className={styles.cartItems}>
            {cartCTX.item.map(item=> <CartItem kry={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartRemoveHandeler.bind(null, item.id)} onAdd={cartAddHandeler.bind(null, item)}/>)}
        </ul>
    );
    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles.buttonAlt} onClick={props.onClose}>Close</button>
            {cartCheck && <button className={styles.button}>Order</button>}
            
        </div>
    </Modal>
}
export default Cart;