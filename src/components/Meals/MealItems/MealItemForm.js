import React from "react";
import styles from "./mealItemForm.module.css";

import Input from "../../UI/Input";

const MealItemForm = props => {
    return <form className={styles.form}>
        <Input label="Amount" input={{
            type: "number",
            id: "amount",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1"
        }} />
        <button>+ Add</button>
    </form>
};

export default MealItemForm;