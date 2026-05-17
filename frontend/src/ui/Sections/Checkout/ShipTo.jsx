import styles from "../Checkout/ShipTo.module.css";
export default function ShipTo({ shippingData, onEdit }) {
  if (!shippingData) return null;
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    postalCode,
    country,
    phone,
    email,
  } = shippingData;

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Ship To</p>
      <div className={styles.divider}></div>
      <div className={styles.content}>
        <p className={styles.contentInfo}>
          <strong>
            {firstName} {lastName}
          </strong>
        </p>
        <p className={styles.contentInfo}>{address}</p>
        <p className={styles.contentInfo}>
          {city},{postalCode}
        </p>
        <p className={styles.contentInfo}>{country}</p>
        <p className={styles.contentInfo}>{phone}</p>
        <p className={styles.contentInfo}>{email}</p>
      </div>
      <button className={styles.changeBtn} onClick={onEdit}>
        Change
      </button>
    </div>
  );
}
