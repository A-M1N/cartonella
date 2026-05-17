import CameraLogo from "../../ui/Components/Logos/icons/CameraLogo";
import ComputerLogo from "../../ui/Components/Logos/icons/ComputerLogo";
import PhoneLogo from "../../ui/Components/Logos/icons/PhoneLogo";
import HeadPhoneLogo from "../../ui/Components/Logos/icons/HeadPhoneLogo";
import SmartWatchLogo from "../../ui/Components/Logos/icons/SmartWatchLogo";
import GamingLogo from "../../ui/Components/Logos/icons/GamingLogo";

export const icons = [
  { Logo: CameraLogo, title: "Camera", link: "/products?category=camera" },
  {
    Logo: ComputerLogo,
    title: "Computer",
    link: "/products?category=pc-components",
  },
  { Logo: PhoneLogo, title: "Phone", link: "/products?category=phones" },
  {
    Logo: HeadPhoneLogo,
    title: "HeadPhone",
    link: "/products?category=pc-headset",
  },
  {
    Logo: SmartWatchLogo,
    title: "SmartWatch",
    link: "/products?category=smart-watch",
  },
  {
    Logo: GamingLogo,
    title: "Gaming",
    link: "/products?category=video-games",
  },
];
