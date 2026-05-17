import style from "./MainNav.module.css";
import { menuData } from "../../data/menu/menuData.js";
import { selectCartTotalQuantity } from "../../store/slices/cartSlice.js";
import { selectWishlistCount } from "../../store/slices/wishlistSlice.js";

import { useState } from "react";

import DropDown from "../Components/Dropdown.jsx";
import MobileDropdownContent from "./MobileDropdownContent.jsx";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import { HiX, HiMenu } from "react-icons/hi";

function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();

  const cartCount = useSelector(selectCartTotalQuantity);
  const wishlistCount = useSelector(selectWishlistCount);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
    closeMenu();
  };

  return (
    <nav className={style.mainNav}>
      <div className={style.desktopNav}>
        <div className={style.logoSpacer} />

        <ul className={style.list}>
          <li className={style.navItem}>
            <Link className={style.navLink} to="/">
              Home
            </Link>
          </li>

          {menuData.map((section) => (
            <li key={section.name} className={style.navItem}>
              <span
                className={style.navLink}
                onClick={() => handleCategoryClick(section.slug)}
                style={{ cursor: "pointer" }}
                role="button"
              >
                {section.name}
              </span>

              <div className={style.dropWrapper}>
                <DropDown menu={section} onNavigate={closeMenu} />
              </div>
            </li>
          ))}

          <li className={style.navItem}>
            <Link className={style.navLink} to="/products?onSale=true">
              Offers / Deals
            </Link>
          </li>
          <li className={style.navItem}>
            <Link className={style.navLink} to="/about">
              About Us
            </Link>
          </li>
          <li className={style.navItem}>
            <Link className={style.navLink} to="/support">
              Support
            </Link>
          </li>
        </ul>
      </div>

      <div className={style.mobileActions}>
        <button
          className={style.hamburgerBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {menuOpen && (
        <>
          <div className={style.overlay} onClick={closeMenu} />
          <div className={style.mobileMenu}>
            <div className={style.mobileMenuHeader}>
              <span className={style.menuTitle}>Menu</span>
              <button className={style.closeBtn} onClick={closeMenu}>
                <HiX />
              </button>
            </div>
            <ul className={style.mobileList}>
              <li className={style.mobileNavItem}>
                <Link
                  className={style.mobileNavLink}
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              {menuData.map((section) => (
                <li key={section.name} className={style.mobileNavItem}>
                  <button
                    className={style.mobileNavBtn}
                    onClick={() => toggleDropdown(section.name)}
                  >
                    <span>{section.name}</span>
                    <IoChevronDown
                      className={`${style.chevron} ${
                        activeDropdown === section.name
                          ? style.chevronActive
                          : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === section.name && (
                    <div className={style.mobileDropdown}>
                      <MobileDropdownContent
                        menu={section}
                        onClose={closeMenu}
                      />
                    </div>
                  )}
                </li>
              ))}
              <li className={style.mobileNavItem}>
                <Link
                  className={style.mobileNavLink}
                  to="/offers"
                  onClick={closeMenu}
                >
                  Offers / Deals
                </Link>
              </li>
              <li className={style.mobileNavItem}>
                <Link
                  className={style.mobileNavLink}
                  to="/about"
                  onClick={closeMenu}
                >
                  About Us
                </Link>
              </li>
              <li className={style.mobileNavItem}>
                <Link
                  className={style.mobileNavLink}
                  to="/support"
                  onClick={closeMenu}
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}

      <div className={style.rightBtns}>
        <div className={style.iconContainer}>
          <NavLink to="/wishlist">
            <FaRegHeart className={style.icon} />
            <span className={style.badge}>{wishlistCount}</span>
          </NavLink>
        </div>
        <div className={style.iconContainer}>
          <NavLink to="/cart">
            <MdOutlineShoppingCart className={style.icon} />
            {cartCount > 0 && <span className={style.badge}>{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
