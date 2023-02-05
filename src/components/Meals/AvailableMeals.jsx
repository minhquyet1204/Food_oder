import React, { useState, useEffect } from "react";

import Card from "../Ui/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const fetchMealsData = async () => {
    const response = await fetch(
      "https://movie-demo-b2081-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
    );
    const data = await response.json();

    const loadedMeals = [];
    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(loadedMeals);
  };

  useEffect(() => {
    fetchMealsData();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
