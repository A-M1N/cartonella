import style from "../Components/SubItem.module.css";
import ArrowIcon from "../Components/Logos/icons/ArrowIcon";

export default function SubItem({ item, onHover, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  return (
    <li
      className={style.subItem}
      onMouseEnter={() => onHover(item.name)}
      onClick={handleClick}
    >
      <div className={style.imgWrapper}>
        <div className={style.imgContainer}>
          <img src={item.img} className={style.iconImg} />
        </div>
        <p>{item.name}</p>
        {item.nested && item.nested.length > 0 && (
          <ArrowIcon className={style.arrow} />
        )}
      </div>
    </li>
  );
}
