import styles from "../Checkout/PaymentMethod.module.css";
import PaymentMethodCard from "../Checkout/PaymentMethodCard.jsx";
import paypal from "../../../data/payment/PayPal.png";
import stripe from "../../../data/payment/stripe.png";
import skrill from "../../../data/payment/Skrill.png";
import apple from "../../../data/payment/Applepay.png";

export default function PaymentMethod({
  selectedPayment,
  setSelectedPayment,
  setStep,
}) {
  const items = [
    {
      title: "Paypal",
      description: "Fast and secure payment with PayPal",
      image: paypal,
      hoverColor: "#253B80",
    },
    {
      title: "Skrill",
      description: "Fast and secure payment with Skrill",
      image: skrill,
      hoverColor: "#862165",
    },
    {
      title: "Stripe",
      description: "Fast and secure payment with PayPal",
      image: stripe,
      hoverColor: "#6461FC",
    },
    {
      title: "ApplePay",
      description: "Fast and secure payment with PayPal",
      image: apple,
      hoverColor: "#181818",
    },
  ];

  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Choose Payment Method</h4>
      <p className={styles.paragraph}>
        Select your preferred payment option to complete your purchase
      </p>
      <div className={styles.cardsContainer}>
        {items.map((item) => (
          <PaymentMethodCard
            item={item}
            key={item.title}
            selected={selectedPayment.title === item.title}
            onSelect={() =>
              setSelectedPayment({
                title: item.title,
                hoverColor: item.hoverColor,
              })
            }
          />
        ))}
      </div>

      <button
        className={styles.formBtn}
        onClick={() => setStep((step) => step - 1)}
      >
        Back
      </button>
    </div>
  );
}
