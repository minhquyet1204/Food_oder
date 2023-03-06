import Card from "../Ui/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const dummyData = [
  {
    id: 1,
    name: "Tofu, shrimp sauce, and noodles",
    price: 4.12,
    description: "Soft rice noodles, fried tofu, and fermented shrimp",
  },
  {
    id: 2,
    name: "Bread",
    price: 5.13,
    description: "Deliciousness, convenience, and full of nutrients",
  },
  {
    id: 3,
    name: "Kebab rice noodles",
    price: 7.02,
    description:
      "Grilled pork with rice noodles heaping piles of fresh greens, and a dipping sauce",
  },
  {
    id: 4,
    name: "Grilled rice paper",
    price: 8.25,
    description: "large, round, thick rice crackers with sesame seeds",
  },
];
const AvailableMeals = () => {
  const mealsList = dummyData.map((meal) => (
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
