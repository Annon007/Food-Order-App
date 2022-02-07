import { useReducer } from "react";
import CartContext from "./cart-contaxt";
const CartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedCartItem = state.item.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            item: updatedCartItem,
            totalAmount: updatedTotalAmount,
        }
    }
    return { item: [], totalAmount: 0 }
}
const CartProvider = props => {
    const [cartState, dispatchCart] = useReducer(CartReducer, { item: [], totalAmount: 0 })
    const addNewItem = item => {
        dispatchCart({ type: "ADD", item: item });
    };
    const removePrevItem = id => {
        dispatchCart({ type: "DELETE", id: id });

    };
    const initialValue = {
        item: cartState.item,
        totalAmount: cartState.totalAmount,
        addItem: addNewItem,
        removeItem: removePrevItem
    }
    return <CartContext.Provider value={initialValue}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;