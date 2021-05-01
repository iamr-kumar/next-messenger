import styles from "../styles/Loading.module.css";
import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <center className={styles.center}>
      <div>
        <img src="/assets/logo.png" className={styles.logo} />
        <Circle color="#3CBC28" size={60} />
      </div>
    </center>
  );
};

export default Loading;
