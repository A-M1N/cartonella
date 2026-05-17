import styles from "../ui/DropdownFilterButton.module.css";
export default function DropdownFilterButton({ title }) {
  return (
    <div className={styles.dropdown}>
      <select className={styles.btn}>
        <option value="position">
          {title} <span>Position</span>
        </option>
        <option>Price - Lowest First</option>
        <option>Price - Highest First</option>
      </select>
    </div>
  );
}
