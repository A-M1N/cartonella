import { useSelector } from "react-redux";
import styles from "../Settings/ProfilePhoto.module.css";
import defaultAvatar from "../../../data/profiles/2.png";

export default function ProfilePhoto() {
  const { user } = useSelector((state) => state.auth);

  const getAvatarUrl = (avatar) => {
    if (!avatar) return defaultAvatar;
    if (avatar.startsWith("http")) return avatar;
  };

  return (
    <div className={styles.layoutProfile}>
      <div className={styles.imgWrapper}>
        <img
          src={getAvatarUrl(user.avatar)}
          className={styles.iconProfile}
          alt={user?.name || "User"}
        />
      </div>
      <div className={styles.nameContainer}>
        <p className={styles.name}>{user?.name || "Guest"}</p>
      </div>
    </div>
  );
}
