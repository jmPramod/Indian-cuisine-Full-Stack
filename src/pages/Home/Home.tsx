import { useEffect, useState } from "react";
import { Carosal } from "./Carosal/Carosal";
import PopularCard from "./CardPopular/PopularCard";
import { filterFood } from "../../utils/API.services";
import FooterComponent from "../../components/Footer/Footer";

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
    // const result = await filterFood({ query: `diet=West&limit=10` });
    // setFood(result && result.data.data);
    // console.log("result", result && result.data.info);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ background: "#F4F1EA" }}>
      <Carosal />
      <PopularCard title="West" data={westFood} />
      <PopularCard title="North" data={northFood} />
      <PopularCard title="East" data={eastFood} />
      <PopularCard title="South" data={southFood} />
     
      <FooterComponent />
    </div>
  );
};

export default Home;
