import styles from "../Checkout/PaymentMethodCard.module.css";

export default function PaymentMethodCard({ item, selected, onSelect }) {
  return (
    <div
      className={`${styles.cardContainer}  ${selected ? styles.selected : ""}`}
      style={{ "--hover-color": item.hoverColor }}
      onClick={onSelect}
    >
      <div>
        <input
          type="radio"
          name="payment"
          className={styles.radioInput}
          checked={selected}
          readOnly
        />
      </div>
      <div className={styles.imgWrapper}>
        <img src={item.image} className={styles.img} />
      </div>
      <div className={styles.titlesContainer}>
        <h5 className={styles.title}>{item.title}</h5>
        <p className={styles.description}>{item.description}</p>
      </div>
      {selected && <span className={styles.selectedLabel}>Selected</span>}
    </div>
  );
}
