import { Outlet } from "react-router-dom";
import styles from "../pages/SettingsPage.module.css";
import ProfilePhoto from "../ui/Sections/Settings/ProfilePhoto";
import SettingsSidebar from "../ui/Sections/Settings/SettingsSidebar";
function SettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <ProfilePhoto />
        <SettingsSidebar />
      </div>
      <div className={styles.rightPanel}>
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsPage;
