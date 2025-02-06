
import { makeStyles, Spinner } from "@fluentui/react-components";
const useStyles = makeStyles({
    container: {
      "> div": { padding: "20px",

        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"100vh",
        width:"100%"
       },
    },
  });
const SpinnerLoader = () => {
    const styles = useStyles();
  return (

    <div className={styles.container}>

        <Spinner size="huge"  />
    </div>
  )
}

export default SpinnerLoader