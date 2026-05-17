import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import style from "./TopBar.module.css";
import Logo from "./Logo";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import Select from "react-select";
import defaultAvatar from "../../data/profiles/2.png";

const langOptions = [
  {
    value: "english",
    label: "English",
    image: <span className="fi fi-gb"></span>,
  },
];

const formatOptionLabel = ({ label, image }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    {image}
    <span>{label}</span>
  </div>
);

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "black",
    border: "none",
    boxShadow: "none",
    padding: "4px 8px",
    minHeight: "40px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "black",
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#333" : "black",
    color: "white",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#ccc",
  }),
};

function TopBar() {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const getAvatarUrl = (avatar) => {
    if (!avatar) return defaultAvatar;
    if (avatar.startsWith("http")) return avatar;
  };

  // Derived state
  const isLoggedIn = user !== null;

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setSearchOpen(false);
    }
  };

  return (
    <div className={style.topNav}>
      {searchOpen && (
        <div className={style.searchOverlay}>
          <div className={style.searchOverlayContent}>
            <input
              className={style.searchInputMobile}
              placeholder="Search Here..."
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
            <button
              className={style.closeSearch}
              onClick={() => setSearchOpen(false)}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}

      <div className={style.logoWrapper}>
        <Logo />
      </div>

      <div className={style.desktopSearch}>
        <input
          className={style.searchInput}
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchSubmit}
        />
        <IoIosSearch className={style.searchIcon} />
      </div>

      {/* Desktop Navigation */}
      <div className={style.desktopNav}>
        <Select
          options={langOptions}
          formatOptionLabel={formatOptionLabel}
          styles={customStyles}
          isSearchable={false}
          placeholder="Language"
        />

        {isLoggedIn ? (
          // Logged In State
          <div className={style.userSection}>
            <NavLink to="/settings/account" className={style.userProfile}>
              <img
                src={getAvatarUrl(user.avatar)}
                alt={user.name}
                className={style.userAvatar}
              />
              <span className={style.userName}>{user.name}</span>
            </NavLink>
            <button onClick={handleLogout} className={style.logoutBtn}>
              <IoLogOutOutline className={style.logoutIcon} />
              Logout
            </button>
          </div>
        ) : (
          // Logged Out State
          <>
            <NavLink to="/signup" className={style.loginLink}>
              Create Account
            </NavLink>
            <NavLink to="/login" className={style.loginLink}>
              Login
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Actions */}
      <div className={style.mobileActions}>
        <button
          className={style.iconButton}
          onClick={() => setSearchOpen(true)}
        >
          <IoIosSearch />
        </button>
        <button
          className={style.iconButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={style.mobileMenu}>
          {isLoggedIn ? (
            // Mobile - Logged In State
            <>
              <NavLink
                to="/settings/account"
                className={style.mobileUserProfile}
                onClick={() => setMenuOpen(false)}
              >
                <img
                  src={user.avatar ? user.avatar : defaultAvatar}
                  alt={user.name}
                  className={style.userAvatarMobile}
                />
                <span className={style.userNameMobile}>{user.name}</span>
              </NavLink>
              <button onClick={handleLogout} className={style.mobileLogoutBtn}>
                <IoLogOutOutline className={style.logoutIcon} />
                Logout
              </button>
            </>
          ) : (
            // Mobile - Logged Out State
            <>
              <NavLink
                to="/signup"
                className={style.loginLink}
                onClick={() => setMenuOpen(false)}
              >
                Create Account
              </NavLink>
              <NavLink
                to="/login"
                className={style.loginLink}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            </>
          )}
          <div>
            <Select
              options={langOptions}
              formatOptionLabel={formatOptionLabel}
              styles={customStyles}
              isSearchable={false}
              placeholder="Language"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TopBar;
