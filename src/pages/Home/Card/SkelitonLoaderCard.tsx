import { Card, Skeleton, SkeletonItem } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    padding: "16px",
  },
  card: {
    margin: "auto",
    width: "100%",
    maxWidth: "250px",
    padding: "10px",
    minHeight: "250px",
  },
  cardSkeleton: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "column",
  },

  buttonContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
    width: "100%",
    flexDirection: "column",
  },
  img: {
    height: "200px",
    width: "100%",
  },
});

export const SkeletonLoader = () => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <Skeleton>
        <div className={styles.cardSkeleton}>
          <SkeletonItem size={32} shape="rectangle" className={styles.img} />
        </div>

        <div className={styles.buttonContainer}>
          <SkeletonItem size={32} shape="rectangle" />
          <SkeletonItem size={32} shape="rectangle" />
        </div>
      </Skeleton>
    </Card>
  );
};
