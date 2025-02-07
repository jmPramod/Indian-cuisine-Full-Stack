import { useEffect, useState } from "react";
import { Carosal } from "./Carosal/Carosal";
import PopularCard from "./CardPopular/PopularCard";
import { filterFood } from "../../utils/API.services";
import { FoodItem } from "../../types/foodTypes";
import FooterComponent from "../../components/Footer/Footer";

const Home = () => {
  const [food, setFood] = useState<FoodItem[]>([]);

  const fetchData = async () => {
    const result = await filterFood({ query: `diet=non vegetarian&limit=10` });
    setFood(result && result.data.data);
    console.log("result", result && result.data.info);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ background: "#F4F1EA" }}>
      <Carosal />
      <PopularCard title="South" data={food} />
      <PopularCard title="North" data={food} />
      <PopularCard title="West" data={food} />
     
      <FooterComponent />
    </div>
  );
};

export default Home;
