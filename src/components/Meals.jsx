import { useState, useEffect, useCallback } from "react";
import MealItem from "./MealItem";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([])

    const fetchMeals = useCallback( // useCallback berfungsi untuk memoize function agar tidak menyebabkan rerender ulang ketika dijadikan dependency pada useEffect
        async function fetchMeals() {
            try {
                const response = await fetch('http://localhost:3000/meals')

                if (!response.ok) {
                    //..
                }

                const meals = await response.json()
                setLoadedMeals(meals)
            } catch (error) {
                console.log(error);
            }
        },
        [],
    )


    useEffect(() => {
        fetchMeals()
    }, [fetchMeals])


    return <ul id="meals">
        {
            loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)
        }
    </ul>
}