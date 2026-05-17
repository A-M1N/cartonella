import { useState } from "react";
import { useNavigate } from "react-router";
import style from "./MainNav.module.css";
import { IoChevronDown } from "react-icons/io5";

export default function MobileDropdownContent({ menu, onClose }) {
  const [expandedItem, setExpandedItem] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (slug) => {
    navigate(`/products?category=${slug}`);
    onClose();
  };

  const handleSubItemClick = (item) => {
    if (item.nested && item.nested.length > 0) {
      setExpandedItem(expandedItem === item.name ? null : item.name);
    } else {
      handleNavigate(item.slug);
    }
  };
  return (
    <ul className={style.mobileSubList}>
      {/* View All option for the main category */}
      <li className={style.mobileSubItem}>
        <button
          className={`${style.mobileSubBtn} ${style.viewAllBtn}`}
          onClick={() => handleNavigate(menu.slug)}
        >
          <span>View All {menu.name}</span>
        </button>
      </li>

      {menu.subItems.map((item) => (
        <li key={item.name} className={style.mobileSubItem}>
          <button
            className={style.mobileSubBtn}
            onClick={() => handleSubItemClick(item)}
          >
            <img src={item.img} alt="" className={style.mobileSubIcon} />
            <span>{item.name}</span>
            {item.nested && item.nested.length > 0 && (
              <IoChevronDown
                className={`${style.subChevron} ${
                  expandedItem === item.name ? style.chevronActive : ""
                }`}
              />
            )}
          </button>

          {expandedItem === item.name && item.nested && (
            <ul className={style.mobileNestedList}>
              {/* View All for this subcategory */}
              <li
                className={style.mobileNestedItem}
                onClick={() => handleNavigate(item.slug)}
              >
                <span className={style.viewAllNested}>All {item.name}</span>
              </li>

              {item.nested.map((nestedItem) => (
                <li
                  key={nestedItem.name}
                  className={style.mobileNestedItem}
                  onClick={() => handleNavigate(nestedItem.slug)}
                >
                  <img
                    src={nestedItem.img}
                    alt=""
                    className={style.mobileNestedIcon}
                  />
                  <span>{nestedItem.name}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
