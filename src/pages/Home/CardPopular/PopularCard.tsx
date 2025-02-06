import  { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardFood } from "../Card/CardFood";
import { FoodItem } from "../../../types/foodTypes";
import { Body1, Title1 } from "@fluentui/react-components";

const PopularCard = (props:{title:string,data:FoodItem[]}) => {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const updateDeviceType = () => {
      if (window.innerWidth < 464) {
        setDeviceType("mobile");
      } else if (window.innerWidth < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);

    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div style={{padding:"20px"}}>
      <div style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>

        <Title1>{props.title}</Title1>
<Body1> <u>View More</u></Body1>
      </div>
      <Carousel
        swipeable={false}
        draggable={false}
        // showDots={true}
        responsive={responsive}
        ssr={true}
        // infinite={true}
        // autoPlay={deviceType !== "mobile"}
        // autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5s"
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", ""]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {props.data&&props.data.map((food,i)=>(

<div key={i}>

  <CardFood food={food} />

</div>
        ))}
      
      {/* <CardFood food={foodData} /><CardFood food={foodData} /><CardFood food={foodData} /> */}
      
            </Carousel>
    </div>
  );
};

export default PopularCard;
