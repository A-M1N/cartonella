import styles from "../Settings/ChangePassword.module.css";

export default function ChangePassword() {
  return (
    <form className={styles.form}>
      <p className={styles.label}>Password Changes</p>
      <div className={styles.containerInput}>
        <input
          placeholder="Current Password"
          className={styles.input}
          type="password"
        />
      </div>
      <div className={styles.containerInput}>
        <input
          placeholder="New Password"
          className={styles.input}
          type="password"
        />
      </div>
      <div className={styles.containerInput}>
        <input
          placeholder="Re-Enter New Password"
          className={styles.input}
          type="password"
        />
      </div>
      <button className={styles.submitBtn}>Save Changes</button>
    </form>
  );
}
