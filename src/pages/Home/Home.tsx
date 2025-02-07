import { useEffect, useState } from "react";
import { Carosal } from "./Carosal/Carosal";
import PopularCard from "./CardPopular/PopularCard";
import { filterFood } from "../../utils/API.services";
import FooterComponent from "../../components/Footer/Footer";
import {styles} from "./styles"
const Home = () => {
  const [westFood, setWestFood] = useState([]);
  const [eastFood, setEastFood] = useState([]);
  const [northFood, setNorthFood] = useState([]);
  const [southFood, setSouthFood] = useState([]);

  const fetchData = async () => {
    const [west, east, north, south] = await Promise.all([
      filterFood({ query: "region=West&limit=10" }),
      filterFood({ query: "region=East&limit=10" }),
      filterFood({ query: "region=North&limit=10" }),
      filterFood({ query: "region=South&limit=10" }),
    ]);
    if(west.status==200){
      setWestFood(west?.data?.data || []);
    }

    if(east.status==200){
      setEastFood(east?.data?.data || []);
    }
    if(north.status==200){
      setNorthFood(north?.data?.data || []);
    }
    if(south.status==200){
      setSouthFood(south?.data?.data || []);
    }
   };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <styles.outerContianer >
      <Carosal />
      <PopularCard title="West" data={westFood} />
      <PopularCard title="North" data={northFood} />
      <PopularCard title="East" data={eastFood} />
      <PopularCard title="South" data={southFood} />
     
      <FooterComponent />
    </styles.outerContianer>
  );
};

export default Home;
