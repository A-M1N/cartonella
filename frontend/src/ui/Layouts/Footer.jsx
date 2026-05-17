import styles from "../Layouts/Footer.module.css";
import Logo from "../Components/Logo";
import visa from "../../data/visa.svg";
import mastercard from "../../data/mastercard.svg";
import stripe from "../../data/stripe.svg";
import paypal from "../../data/paypal.svg";
import { Link } from "react-router";
import { FaTwitter } from "react-icons/fa6";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import playstore from "../../data/googleplay.svg";
import qrcode from "../../data/QrCode.png";
import appstore from "../../data/appstore.svg";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.topFooter}>
        <div className={`${styles.column} ${styles.brandColumn}`}>
          <div className={styles.logoWrapper}>
            <Logo logoColor="#000" cartColor="#000" />
            <h3 className={styles.logoHeading}>
              Cartonella - Online Shopping Market
            </h3>
          </div>
          <div className={styles.contactInfo}>
            <p className={styles.hotlineParagraph}>HOTLINE 24/7</p>
            <p className={styles.numberParagraph}>(+20) 1145 12 0123</p>
            <p className={styles.contactParagraph}>
              257 Thatcher Road St, Brooklyn, Manhattan, NY 10092
            </p>
            <p className={styles.contactParagraph}>contact@cartonella.com</p>
          </div>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Twitter">
              <FaTwitter className={styles.icon} />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF className={styles.icon} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className={styles.icon} />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube className={styles.icon} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin className={styles.icon} />
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Top Categories</h4>
          <ul className={styles.columnUl}>
            <li>
              <Link
                to="/products?category=pc-components"
                className={styles.link}
              >
                Computers
              </Link>
            </li>
            <li>
              <Link to="/products?category=phones" className={styles.link}>
                Mobiles & Tablets
              </Link>
            </li>
            <li>
              <Link to="/products?category=camera" className={styles.link}>
                Cameras
              </Link>
            </li>
            <li>
              <Link to="/products?category=tv" className={styles.link}>
                TV
              </Link>
            </li>
            <li>
              <Link to="/products?category=laptops" className={styles.link}>
                Laptops
              </Link>
            </li>
            <li>
              <Link to="/products?category=clothing" className={styles.link}>
                Clothes
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/products?category=video-games" className={styles.link}>
                Video Games
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Company</h4>
          <ul className={styles.columnUl}>
            <li>
              <Link to="/about" className={styles.link}>
                About Cartonella
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.link}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.link}>
                Career
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.link}>
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Help Center</h4>
          <ul className={styles.columnUl}>
            <li>
              <Link to="/support" className={styles.link}>
                Customer Service
              </Link>
            </li>
            <li>
              <Link to="/support" className={styles.link}>
                Policy
              </Link>
            </li>
            <li>
              <Link to="/support" className={styles.link}>
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/settings/orders" className={styles.link}>
                Track Order
              </Link>
            </li>
            <li>
              <Link to="/support" className={styles.link}>
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/settings/account" className={styles.link}>
                My Account
              </Link>
            </li>
          </ul>
        </div>

        <div className={`${styles.column} ${styles.appColumn}`}>
          <h4 className={styles.columnTitle}>Download App</h4>
          <p className={styles.saveNewUser}>
            Save <span className={styles.offer}>3$</span> with App New User
          </p>
          <div className={styles.layoutImgs}>
            <img src={qrcode} alt="QR Code" className={styles.qrCode} />
            <div className={styles.verticalImgs}>
              <img
                src={playstore}
                alt="Google Play"
                className={styles.storeImg}
              />
              <img src={appstore} alt="App Store" className={styles.storeImg} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.botFooter}>
        <div className={styles.botFooterContainer}>
          <p className={styles.copyright}>
            © 2026 <span className={styles.copyrightWord}>Cartonella</span>. All
            Rights Reserved
          </p>
          <div className={styles.paymentIcons}>
            <img src={paypal} alt="PayPal" />
            <img src={stripe} alt="Stripe" />
            <img src={mastercard} alt="Mastercard" />
            <img src={visa} alt="Visa" />
          </div>
          <div className={styles.currencyLang}>
            <select aria-label="Currency">
              <option>USD</option>
            </select>
            <select aria-label="Language">
              <option>English</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
