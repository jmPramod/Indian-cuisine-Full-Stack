import {
    Button,
    Image,
    makeStyles,
    tokens,
    typographyStyles,
  } from "@fluentui/react-components";
  import {
    Carousel,
    CarouselCard,
    CarouselNav,
    CarouselNavButton,
    CarouselNavContainer,
    CarouselViewport,
    CarouselAnnouncerFunction,
    CarouselSlider,
  } from "@fluentui/react-components";
  import * as React from "react";
import { useNavigate } from "react-router-dom";
  
  const useClasses = makeStyles({
    bannerCard: {
      alignContent: "center",
      borderRadius: tokens.borderRadiusLarge,
      height: "80vh",
      textAlign: "left",
      position: "relative",
      width: "100%", 
      "@media (max-width: 768px)": {
        height: "350px",
      },
    },
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      position: "absolute",
      left: "10%",
      top: "35%",
      background: tokens.colorNeutralBackground1,
      padding: "18px",
      maxWidth: "270px",
      width: "50%",
      "@media (max-width: 768px)": {
        left: "5%",
        width: "80%",
        padding: "12px",
      },
      "@media (max-width: 480px)": {
        width: "90%",
        padding: "10px",
      },
    },
    title: {
      ...typographyStyles.title1,
      "@media (max-width: 768px)": {
        fontSize: typographyStyles.subtitle1.fontSize,
      },
    },
    subtext: {
      ...typographyStyles.body1,
      "@media (max-width: 768px)": {
        fontSize: typographyStyles.body2.fontSize,
      },
    },
  });
  const REGIONS = [
    "Central",
    "East",
    "North",
    "North East",
    "South",
    "West"
  ];
  
  const IMAGES = [
    "https://res.cloudinary.com/dldfjvzkn/image/upload/v1738686308/Central_fgooww.jpg","https://res.cloudinary.com/dldfjvzkn/image/upload/v1738686310/East_mxoqgu.jpg","https://res.cloudinary.com/dldfjvzkn/image/upload/v1738686307/North_rwifqz.webp","https://res.cloudinary.com/dldfjvzkn/image/upload/v1738686307/North_East_mleaaq.jpg","https://res.cloudinary.com/dldfjvzkn/image/upload/v1738686308/South_sz8msk.jpg","https://res.cloudinary.com/dldfjvzkn/image/upload/v1738686308/West_qjmqtw.jpg"  ];
  
  const BannerCard: React.FC<{ children: React.ReactNode; imageSrc: string; index: number, region: string  }> = ({
    children,
    imageSrc,
    region,
    index,
  }) => {
    const classes = useClasses();
  const navigation=useNavigate()
    return (
      <CarouselCard className={classes.bannerCard} aria-label={`${index + 1} of ${IMAGES.length}`}>
        <Image fit="cover" src={imageSrc} role="presentation" />
  
        <div className={classes.cardContainer}>
          <div className={classes.title}>{children}</div>
          
          <div>
            <Button size="small" shape="square" appearance="primary"  onClick={()=>navigation(`/table/?region=${encodeURIComponent(region)}`)}>
            Click to Know more
            </Button>
          </div>
        </div>
      </CarouselCard>
    );
  };
  
  const getAnnouncement: CarouselAnnouncerFunction = (index, totalSlides) => {
    return `Carousel slide ${index + 1} of ${totalSlides}`;
  };
  
  const NAMES = [
    "Best Food Recipes in Central Indian",
    "Best Food Recipes in East Indian ",
    "Best Food Recipes in North Indian ",
    "Best Food Recipes in North-East Indian ",
    "Best Food Recipes in South Indian ",
    "Best Food Recipes in West Indian "
  ];
  
  export const Carosal = () => (  
    <Carousel groupSize={1} circular announcement={getAnnouncement}>
      <CarouselViewport>
        <CarouselSlider>
          {NAMES.map((name, index) => (
            <BannerCard key={`image-${index}`} imageSrc={IMAGES[index % IMAGES.length]} index={index} region={REGIONS[index]}>
              {name}
            </BannerCard>
          ))}
        </CarouselSlider>
      </CarouselViewport>
      <CarouselNavContainer layout="inline" autoplay={{ "aria-label": "Enable autoplay" }}>
        <CarouselNav>
          {(index) => <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />}
        </CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
  