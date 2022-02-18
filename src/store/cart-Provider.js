import { useReducer } from "react";
import CartContext from "./cart-contaxt";
const CartReducer = (state, action) => {

    if (action.type === "ADD") {
        const indexOfNewItemAdd = state?.item.findIndex(item => item.id === action?.item?.id);
        const uptadedItem = state.item[indexOfNewItemAdd];
        let updatedItemSet;
        if (uptadedItem) {
            const updateActionItem = { ...uptadedItem, amount: uptadedItem.amount + action.item.amount }
            updatedItemSet = [...state.item];
            updatedItemSet[indexOfNewItemAdd] = updateActionItem;


        } else {
            updatedItemSet = [...state.item, action.item];

        }
        const updateTotalAmount = updatedItemSet.reduce((acc, cur) => {
            return acc + cur.price * cur.amount
        }, 0);

        return {
            item: [...updatedItemSet],
            totalAmount: updateTotalAmount
        };
    }
    if (action.type === "DELETE") {

        const itemIndex = state.item.findIndex(item => item.id === action.id);
        const removeItem = state.item[itemIndex];
        console.log(removeItem, state.item)
        const updateTotalMount = Math.abs(state.totalAmount - removeItem.price);
        let updatedItemSet;
        if (removeItem.amount === 1) {
            console.log("Here");
            const getRemoveItem = state.item.filter(item => item.id !== action.id)
            updatedItemSet = [...getRemoveItem];
        } else {
            console.log("Here else");

            const updateItem = { ...removeItem, amount: removeItem.amount - 1 };
            state.item[itemIndex] = updateItem
            updatedItemSet = [...state.item];
        }
        return {
            item: updatedItemSet,
            totalAmount: updateTotalMount
        }
    }

    // if (action.type === "REMOVE"){
    //     const itemIndex = state.item.findIndex(item => item.id === action.id);
    //     const removeItem = state.item[itemIndex];
    //     const updatedAmount = state.item.totalAmount - removeItem.amount;
    //     let filteredItem;
    //     if( removeItem.amount < 1){
    //         filteredItem = state.item.filter(item => item.id !== action.id)
    //     } else {

    //     }
    // }
    console.log(state.item)

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
        item: cartState?.item,
        totalAmount: cartState.totalAmount,
        addItem: addNewItem,
        removeItem: removePrevItem
    }
    return <CartContext.Provider value={initialValue}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;