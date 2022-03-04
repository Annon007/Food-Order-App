import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./cart.module.css";
import CartContext from "../../store/cart-contaxt";
import CartItem from "./CartItem";
import Checkout from "./checkout";

const Cart = props => {
    const [isCheckout, setIscheckout] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCTX = useContext(CartContext);
    const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;
    const cartCheck = cartCTX.item.length > 0;

    const cartAddHandeler = (item) => {
        cartCTX.addItem({ ...item, amount: 1 });
    };
    const cartRemoveHandeler = (id) => {
        cartCTX.removeItem(id)
    }
    const cartItems = (
        <ul className={styles.cartItems}>
            {cartCTX.item.map(item => <CartItem kry={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartRemoveHandeler.bind(null, item.id)} onAdd={cartAddHandeler.bind(null, item)} />)}
        </ul>
    );
    const checkoutHandeler = () => {
        setIscheckout(true)
    }

    const submittedCheckoutFormHandeler = async userData => {
        setIsSubmitting(true);
        await fetch('https://react-prac-adae1-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCTX.item
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCTX.clearCart();
    }

    const cartModalContent = <>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>

        {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submittedCheckoutFormHandeler} />}
        {!isCheckout && <div className={styles.actions}>
            <button className={styles.buttonAlt} onClick={props.onClose}>Close</button>
            {cartCheck && <button className={styles.button} onClick={checkoutHandeler}>Order</button>}
        </div>}
    </>;
    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );
    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
}
export default Cart;