import React from "react";
import { Card, Text, makeStyles } from "@fluentui/react-components";

// Define TypeScript types for food items
interface FoodItem {
  _id: string;
  name: string;
  ingredients: string[];
  diet: string;
  prep_time: number;
  cook_time: number;
  flavor_profile: string;
  course: string;
  state: string;
  region: string;
  img: string;
}

// Fluent UI v9 Styling
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column", // Stack cards vertically
    alignItems: "center", // Center the cards
    padding: "20px",
    gap: "20px",
  },
  card: {
    width: "100%", // Make card full width
    maxWidth: "600px", // Limit max width for better readability
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  details: {
    fontSize: "16px",
    color: "gray",
    marginTop: "8px",
  },
});

const MyFavFood: React.FC = () => {
  const classes = useStyles();
  const foods: FoodItem[] = [
    {
      _id: "67a19bf10b4e739db2ea9887",
      name: "Balu shahi",
      ingredients: ["Maida flour, yogurt, oil, sugar"],
      diet: "Vegetarian",
      prep_time: 45,
      cook_time: 25,
      flavor_profile: "Sweet",
      course: "Dessert",
      state: "West Bengal",
      region: "East",
      img: "https://res.cloudinary.com/dldfjvzkn/image/upload/v1738607289/Balu_shahi_enfoxt.jpg",
    },
    {
      _id: "67a19bf10b4e739db2ea9888",
      name: "Boondi",
      ingredients: ["Gram flour, ghee, sugar"],
      diet: "Vegetarian",
      prep_time: 80,
      cook_time: 30,
      flavor_profile: "Sweet",
      course: "Dessert",
      state: "Rajasthan",
      region: "West",
      img: "https://res.cloudinary.com/dldfjvzkn/image/upload/v1738607289/Boondi_qb8fct.jpg",
    },
  ];

  return (
    <div className={classes.container}>
      {foods.map((food) => (
        <Card key={food._id} className={classes.card}>
          <img src={food.img} alt={food.name} className={classes.image} />
          <Text className={classes.title}>{food.name}</Text>
          <Text className={classes.details}>
            <strong>Ingredients:</strong> {food.ingredients.join(", ")}
          </Text>
          <Text className={classes.details}>
            <strong>Diet:</strong> {food.diet}
          </Text>
          <Text className={classes.details}>
            <strong>Time:</strong> {food.prep_time + food.cook_time} min
          </Text>
          <Text className={classes.details}>
            <strong>State:</strong> {food.state}
          </Text>
        </Card>
      ))}
    </div>
  );
};

export default MyFavFood;
