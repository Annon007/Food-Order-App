import { useRef, useState } from 'react';
import classes from './checkout.module.css';

const Checkout = (props) => {
    const [formValidation, setFormValidation] = useState({
        nameState: true,
        streetState: true,
        postalCodeState: true,
        cityState: true,
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = value => value === "";
    const is5Char = value => value.trim().length === 5;
    const confirmHandler = (event) => {
        event.preventDefault();

        const name = nameInputRef.current.value;
        const street = streetInputRef.current.value;
        const postalCode = postalCodeInputRef.current.value;
        const city = cityInputRef.current.value;

        const enteredName = !isEmpty(name)
        const enteredStreet = !isEmpty(street)
        const enteredCite = !isEmpty(city)
        const enteredPostal = is5Char(postalCode)

        setFormValidation({
            nameState: enteredName,
            streetState: enteredStreet,
            cityState: enteredCite,
            postalCodeState: enteredPostal
        })
        const formDataValidation = enteredName && enteredCite && enteredStreet && enteredPostal;
        if (!formDataValidation) {
            return;
        }
        props.onConfirm({
            name,
            street,
            postalCode,
            city,
        })
    };
    const nameField = `${classes.control} ${formValidation.nameState ? "" : `${classes.invalid}`}`
    const streetField = `${classes.control} ${formValidation.streetState ? "" : `${classes.invalid}`}`
    const postalField = `${classes.control} ${formValidation.postalCodeState ? "" : `${classes.invalid}`}`
    const cityField = `${classes.control} ${formValidation.cityState ? "" : `${classes.invalid}`}`
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameField}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formValidation.nameState && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetField}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formValidation.streetState && <p>Please enter a valid Street number!</p>}
            </div>
            <div className={postalField}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef} />
                {!formValidation.postalCodeState && <p>Please enter a valid Code!</p>}
            </div>
            <div className={cityField}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formValidation.cityState && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel} >
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;