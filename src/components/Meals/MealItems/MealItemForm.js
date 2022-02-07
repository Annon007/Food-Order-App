import React, { useRef, useState } from "react";
import styles from "./mealItemForm.module.css";
import CartContext from "../../../store/cart-contaxt";
import Input from "../../UI/Input";

const MealItemForm = props => {
    const amountInput = useRef();
    const [validForm, setValidForm] = useState(false);
    const submittedForm = e => {
        e.preventDefault();
        const enteredAmount = amountInput.current.value;
        const enteredAmountNumber = +amountInput.current.value;
        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setValidForm(true);
            return;
        }
        props.data(enteredAmountNumber);
    }
    return <form onSubmit={submittedForm} className={styles.form}>
        <Input label="Amount" ref={amountInput} input={{

            type: "number",
            id: "amount",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
            name: "amount"
        }} />
        {validForm && <p>Invalid Input!</p>}
        <button type="submit">+ Add</button>
    </form>
};

export default MealItemForm;