import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useAddress } from "../../../hooks/useAddress";

import styles from "../Checkout/ShippingForm.module.css";
import { Link } from "react-router";

export default function ShippingForm({ setStep, setShippingData, savedData }) {
  const { user } = useSelector((state) => state.auth);
  const { addresses } = useAddress();

  const defaultAddr = useMemo(() => {
    if (!addresses || addresses.length === 0) return null;
    return addresses.find((a) => a.isDefault) || addresses[0];
  }, [addresses]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: savedData || {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      saveInfo: true,
      sameAsBilling: true,
    },
  });

  // Auto‑fill when logged in and no savedData override
  useEffect(() => {
    if (!savedData && user) {
      const nameParts = (user.name || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      reset({
        email: user.email || "",
        firstName,
        lastName,
        phone: user.phone || "",
        company: "",
        address: defaultAddr?.address || "",
        city: defaultAddr?.city || "",
        state: defaultAddr?.state || "",
        postalCode: defaultAddr?.postalCode || "",
        country: defaultAddr?.country || "",
        saveInfo: true,
        sameAsBilling: true,
      });
    }
  }, [user, savedData, defaultAddr, reset]);

  const onSubmit = (data) => {
    setShippingData(data);
    setStep(2);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Email Address <span className={styles.star}>*</span>
          </label>
          <input
            type="email"
            isRequired
            className={styles.input}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.namesContainer}>
          <div className={styles.nameField}>
            <label className={styles.label}>
              First Name <span className={styles.star}>*</span>
            </label>
            <input
              isRequired
              style={{ height: "2.5rem" }}
              className={styles.inputName}
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
            />
            {errors.firstName && (
              <span className={styles.errorText}>
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className={styles.nameField}>
            <label className={styles.label}>
              Last Name <span className={styles.star}>*</span>
            </label>
            <input
              isRequired
              className={styles.inputName}
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
            />
            {errors.lastName && (
              <span className={styles.errorText}>
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Phone Number <span className={styles.star}>*</span>
          </label>

          <input
            type="tel"
            isRequired
            className={styles.input}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone && (
            <span className={styles.errorText}>{errors.phone.message}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Company Name <span className={styles.optional}>(Optional)</span>
          </label>
          <input className={styles.input} {...register("company")} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Street Address <span className={styles.star}>*</span>{" "}
          </label>
          <input
            isRequired
            className={styles.input}
            {...register("address", {
              required: "Street address is required",
            })}
          />
          {errors.address && (
            <span className={styles.errorText}>{errors.address.message}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            City <span className={styles.star}>*</span>
          </label>
          <input
            isRequired
            className={styles.input}
            {...register("city", {
              required: "City is required",
            })}
          />
          {errors.city && (
            <span className={styles.errorText}>{errors.city.message}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            State/Province <span className={styles.star}>*</span>
          </label>
          <input
            isRequired
            className={styles.input}
            {...register("state", {
              required: "State is required",
            })}
          />
          {errors.state && (
            <span className={styles.errorText}>{errors.state.message}</span>
          )}
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Zip/Postal Code </label>
          <input
            isRequired
            className={styles.input}
            {...register("postalCode", {
              required: "Postal code is required",
            })}
          />
          {errors.postalCode && (
            <span className={styles.errorText}>
              {errors.postalCode.message}
            </span>
          )}
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Country <span className={styles.star}>*</span>
          </label>
          <input
            isRequired
            className={styles.input}
            {...register("country", {
              required: "Country is required",
            })}
          />
          {errors.country && (
            <span className={styles.errorText}>{errors.country.message}</span>
          )}
        </div>

        <span className={styles.divider}></span>

        <div className={styles.row}>
          <input
            type="checkbox"
            defaultChecked={true}
            className={styles.checkboxInput}
            {...register("saveInfo")}
          />
          <span className={styles.checkboxContent}>
            Save this information for faster check-out next time
          </span>
        </div>
        <div className={styles.row}>
          <input
            type="checkbox"
            defaultChecked={true}
            className={styles.checkboxInput}
            {...register("sameAsBilling")}
          />
          <span className={styles.checkboxContent}>
            Billing address same as shipping
          </span>
        </div>
        <div className={styles.btnsContainer}>
          <button
            type="submit"
            className={styles.formBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Continue to Payment"}
          </button>
          <Link className={styles.formBtn} to="/cart">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
