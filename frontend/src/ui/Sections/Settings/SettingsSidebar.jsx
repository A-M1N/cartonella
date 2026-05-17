import { LuUser } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { RiFileList3Line, RiLockPasswordLine } from "react-icons/ri";

import styles from "./SettingsSidebar.module.css";
import { NavLink } from "react-router";

const settingsItems = [
  { path: "/settings/account", label: "Account Details", icon: LuUser },
  { path: "/settings/orders", label: "My Orders", icon: RiFileList3Line },
  { path: "/settings/address", label: "My Address", icon: FaLocationDot },
  {
    path: "/settings/password",
    label: "Change Password",
    icon: RiLockPasswordLine,
  },
];

export default function SettingsSidebar() {
  return (
    <nav className={styles.sideBarFeatures}>
      <ul className={styles.settingsList}>
        {settingsItems.map(({ path, label, icon: Icon }) => (
          <li key={path} className={styles.item}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              <Icon className={styles.userIcon} size={24} />
              <span className={styles.title}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
