import style from "./PromoBar.module.css";
function PromoBar() {
  return (
    <div className={style.promoBar}>
      <p className={style.promoTxt}>
        Save 10% with FIRST20 Promo Code for your first order!
      </p>
    </div>
  );
}

export default PromoBar;
