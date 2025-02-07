  import React, { useEffect, useState } from "react";
  import { 
    Card, 
    Image, 
    Text, 
    Divider,
    Spinner,
    makeStyles,
  } from "@fluentui/react-components";
  import { useParams } from "react-router-dom";
  import { searchSingleFood } from "../../utils/API.services";
  import { Dish } from "../../types/foodTypes";
import FooterComponent from "../../components/Footer/Footer";

  const useStyles = makeStyles({
    card: {
      width: "100%",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      maxWidth: "1200px",
      margin: "20px auto",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "32px",
      alignItems: "start",
    },
    imageContainer: {
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      "&:hover img": {
        transform: "scale(1.03)",
      },
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
    },
    detailsSection: {
      display: "flex",
      flexDirection: "column",
    },
    sectionTitle: {
      color: "#1a73e8",
      marginBottom: "8px",
    },
    tagContainer: {
      display: "flex",
      flexWrap: "wrap",
      padding:"10px",
      marginBottom: "12px",
    },
    tag: {
      backgroundColor: "#e8f0fe",
      color: "#1967d2",
      borderRadius: "20px",
      fontSize: "20px",
    },
    ingredientList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",

      listStyle: "none",
     
      margin: "12px 0",
    },
    ingredientItem: {
      display: "flex",
      alignItems: "center",

      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      "&::before": {
        content: "'• '",
        color: "#1a73e8",
        marginRight: "4px",
      },
    },
    timeContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",

      margin: "12px 0",
    },
    timeBox: {
      textAlign: "start",
      justifyContent:"center",

      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
    },
  });

  const SingleFood: React.FC = () => {
    const styles = useStyles();
    const { id } = useParams();
    const [dish, setDish] = useState<Dish>();
    const [loading, setLoading] = useState(true);

    const fetchData = async (id1: string) => {
      try {
        setLoading(true);
        const result = await searchSingleFood({ query: id1 });
        if (result?.status === 200) {
          setDish(result.data);
        }
      } catch (error) {
        console.error("Error fetching dish:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (id) fetchData(id);
    }, [id]);

    if (loading) {
      return (
        <div style={{}}>
          <Spinner  />
        </div>
      );
    }

    if (!dish) {
      return (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Text size={500} weight="semibold">
            Recipe not found
          </Text>
        </div>
      );
    }

    return (

      <>
      
      <Card className={styles.card}>
        <div className={styles.gridContainer}>
          {/* Image Section */}
          <div className={styles.imageContainer}>
            <Image
              src={dish.img}
              alt={dish.name}
              className={styles.image}
            />
          </div>

          {/* Details Section */}
          <div className={styles.detailsSection}>
            <Text size={700} weight="bold" block style={{ marginBottom: "16px" }}>
              {dish.name}
            </Text>

            <div className={styles.tagContainer}>
              <span className={styles.tag}>{dish.course}</span>
              <span className={styles.tag}>{dish.diet}</span>
              <span className={styles.tag}>{dish.flavor_profile}</span>
            </div>

            <div className={styles.timeContainer}>
              <div className={styles.timeBox}>
                <Text size={400} weight="medium" block>
                  {dish.prep_time} min
                </Text>
                <Text size={200} style={{ color: "#666" }}>Prep Time</Text>
              </div>
              <div className={styles.timeBox}>
                <Text size={400} weight="medium" block>
                  {dish.cook_time} min
                </Text>
                <Text size={200} style={{ color: "#666" }}>Cook Time</Text>
              </div>
            </div>

            <Divider style={{ margin: "16px 0" }} />

            <Text size={500} weight="semibold" className={styles.sectionTitle}>
              Regional Info
            </Text>
            <Text size={300} block>
              {dish.state}, {dish.region} Region
            </Text>

            <Divider style={{ margin: "16px 0" }} />

            <Text size={500} weight="semibold" className={styles.sectionTitle}>
              Ingredients
            </Text>
          <ul className={styles.ingredientList}>
            {dish.ingredients.map((ingredient, index) => (
              <li key={index} className={styles.ingredientItem}>
                <Text size={300}>{ingredient}</Text>
              </li>
            ))}
          </ul>

          {/* <Button 
            appearance="primary" 
            icon={<SaveRegular />}
            style={{ marginTop: "16px", alignSelf: "start" }}
          >
            Save to Collection
          </Button> */}
        </div>
      </div>
    </Card>
     <FooterComponent/>
      </>
  );
};

export default SingleFood;