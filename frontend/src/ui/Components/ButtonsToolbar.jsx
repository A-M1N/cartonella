import styles from "../Components/ButtonsToolbar.module.css";
import ignore from "../../data/productsgridicons/ignore.svg";
import { IoClose } from "react-icons/io5";

export default function ButtonsToolbar({ onClick, filterName }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {filterName}
      <div className={styles.imgContainer}>
        <img src={ignore} className={styles.img} />
      </div>
    </button>
  );
}
