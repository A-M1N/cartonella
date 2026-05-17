import Accordion from "../../Components/Accordion";
import styles from "./Support.module.css";

export default function Support() {
  const faqs = [
    {
      question: "How can I track my order?",
      answer: [
        "After your order is shipped, you will receive an email with a tracking link.",
      ],
    },
    {
      question: "What payment methods are supported?",
      answer: ["We accept credit cards, debit cards, and cash on delivery."],
    },
    {
      question: "Can I return or exchange a product?",
      answer: [
        "Yes, returns and exchanges are accepted within 14 days if the product is unused and in its original packaging.",
      ],
    },
    {
      question: "How can I contact support?",
      answer: [
        "You can contact our support team through the contact form or email us directly.",
      ],
    },
  ];

  return (
    <main className={styles.support}>
      {/* Terms & Conditions */}
      <section className={styles.section}>
        <h1 className={styles.title}>Terms & Conditions</h1>

        <p>
          By using Cartonella, you agree to comply with and be bound by the
          following terms and conditions. Please review them carefully.
        </p>

        <p>
          All products are subject to availability. We reserve the right to
          refuse or cancel any order at our discretion.
        </p>

        <p>
          Prices and product descriptions are subject to change without prior
          notice.
        </p>
        <br></br>
        <br></br>
        <h2 className={styles.title}>Frequently Asked Questions</h2>

        <div className={styles.faqs}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              title={faq.question}
              features={faq.answer}
              defaultOpen={false}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
