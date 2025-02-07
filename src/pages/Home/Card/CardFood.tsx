import * as React from "react";
import {
  makeStyles,
  Body1,
  Caption1,
} from "@fluentui/react-components";
import {stylesComp } from "./styles"
import {
  Card,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import { IoLeafSharp } from "react-icons/io5";
import { GiChickenLeg } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import {  motion } from 'framer-motion';
import { FoodItem } from "../../../types/foodTypes";


// Define styles
const useStyles = makeStyles({
  card: {
    margin: "auto",
    width: "100%",
    maxWidth: "250px",
    padding:"10px",
     },
  image: {
    width: "100%",
    borderRadius: "8px",
  },
});

// Accept food item as props
export const CardFood: React.FC<{ food: FoodItem }> = ({ food }) => {
  const styles = useStyles();
const navigate=useNavigate()

  return (

    <motion.div
    whileHover={{ scale: 1.05 }}
        onHoverStart={() => {}}
        onHoverEnd={() => {}}
        whileTap={{ scale: 0.8 }}
      >


    <Card className={styles.card} onClick={()=>navigate(`single-food/${food._id}`)}>
      <CardHeader
        image={<img src={food.img} alt={food.name} className={styles.image} />}
        header={<Body1><b>{food.name}</b></Body1>}
        description={<Caption1>{food.course} - {food.state}</Caption1>}
      />

      <CardPreview>
        <stylesComp.image src={food.img} alt={food.name} className={styles.image} />
      </CardPreview>

      <Body1>
        {/* <b>Ingredients:</b> {food.ingredients} */}
        <b>Region:</b> {food.region}
      </Body1>
      {/* <Body1>
        <b>Preparation Time:</b> {food.prep_time} mins
      </Body1>
      <Body1>
        <b>Cooking Time:</b> {food.cook_time} mins
      </Body1> */}
      <Body1>
        <b>Flavor:</b> {food.flavor_profile}
      </Body1>
      <Body1>
        <b>Diet:</b> {food.diet}{food.diet==="vegetarian"?<IoLeafSharp color="green" size={20}/>:<GiChickenLeg color="red" size={20}/>}
      </Body1>

      {/* <CardFooter>
        <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
        <Button icon={<ShareRegular fontSize={16} />}>Share</Button>
      </CardFooter> */}
    </Card>
  </motion.div>
    
    
    
  );
};
