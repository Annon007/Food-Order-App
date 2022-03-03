import { useEffect, useState } from "react";
import styles from "./availableMeals.module.css";
import Card from "../UI/Card";
import MealItems from "./MealItems/MealItems";


const AvailableMeals = () => {
    const [transformedData, setTransformedData] = useState();
    const [isLodaing, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const getMeals = async () => {
            try {
                setIsLoading(true);
                const sendReq = fetch("https://react-prac-adae1-default-rtdb.firebaseio.com/meals.json");

                const res = await sendReq;
                if (!res.ok) {

                    throw new Error("Something Went Wrong!");
                }
                const data = await res.json();
                let fetchedData = [];

                for (const meal in data) {
                    fetchedData.push({
                        id: meal,
                        name: data[meal].name,
                        description: data[meal].description,
                        price: data[meal].price
                    })
                };
                setTransformedData(fetchedData)
                setIsLoading(false);
                setIsError();

            } catch (err) {
                setIsLoading(false)
                setIsError(err);
            }
        }
        getMeals()
    }, [])
    const mealLists = transformedData?.map(meals => {
        return <MealItems
            key={meals.id}
            id={meals.id}
            name={meals.name}
            descriptions={meals.description}
            price={meals.price}
        />
    });

    if (isLodaing) {
        return <p className={styles.loadingText}>Loading...</p>
    }

    if (isError) {
        return <p className={styles.errorTxt}>Fetching Filed!</p>
    }
    return <section className={styles.meals}>
        <Card>
            <ul >
                {mealLists}
            </ul>
        </Card>
    </section>
};
export default AvailableMeals;