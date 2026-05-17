import { useState } from "react";
import { useAddress } from "../../../hooks/useAddress";
import styles from "../Settings/MyAddress.module.css";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import Spinner from "../../Components/Spinner.jsx";

const emptyAddress = {
  label: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  isDefault: false,
};

export default function MyAddress() {
  const {
    addresses,
    isLoading,
    isError,
    error,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAddress();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyAddress);

  const resetForm = () => {
    setForm(emptyAddress);
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    setForm(emptyAddress);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (addr) => {
    setForm({
      label: addr.label || "",
      address: addr.address || "",
      city: addr.city || "",
      state: addr.state || "",
      postalCode: addr.postalCode || "",
      country: addr.country || "",
      isDefault: addr.isDefault,
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateAddress({ id: editingId, data: form }, { onSuccess: resetForm });
    } else {
      createAddress(form, { onSuccess: resetForm });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this address?")) {
      deleteAddress(id);
    }
  };

  const handleSetDefault = (id) => {
    setDefaultAddress(id);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spinner />
        <p>Loading your Address...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          Failed to load addresses:{" "}
          {error?.response?.data?.message || error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {addresses.length === 0 && !showForm ? (
        <p className={styles.empty}>No saved addresses. Add your first one.</p>
      ) : (
        addresses.map((addr) => (
          <div key={addr.id} className={styles.row}>
            <div className={styles.inputAddressRow}>
              <input
                type="radio"
                name="defaultAddress"
                checked={addr.isDefault}
                onChange={() => handleSetDefault(addr.id)}
                className={styles.input}
              />
              <div className={styles.vertical}>
                <span className={styles.label}>{addr.label || "Address"}</span>
                <span className={styles.data}>
                  {addr.address}, {addr.city}
                  {addr.state ? `, ${addr.state}` : ""} {addr.postalCode},{" "}
                  {addr.country}
                </span>
                {addr.isDefault && (
                  <span className={styles.defaultBadge}>Default</span>
                )}
              </div>
            </div>
            <div className={styles.btnContainer}>
              <button
                className={styles.btn}
                onClick={() => openEditForm(addr)}
                disabled={isUpdating || isDeleting}
              >
                <FaRegEdit /> Edit
              </button>
              <button
                className={styles.btnDanger}
                onClick={() => handleDelete(addr.id)}
                disabled={isDeleting}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}

      {showForm && (
        <div className={styles.formOverlay}>
          <form onSubmit={handleSubmit} className={styles.addressForm}>
            <h3>{editingId ? "Edit Address" : "New Address"}</h3>
            <div className={styles.formGrid}>
              <input
                name="label"
                placeholder="Label (e.g., Home, Office)"
                value={form.label}
                onChange={handleChange}
              />
              <input
                name="address"
                placeholder="Street address *"
                value={form.address}
                onChange={handleChange}
                required
              />
              <input
                name="city"
                placeholder="City *"
                value={form.city}
                onChange={handleChange}
                required
              />
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
              />
              <input
                name="postalCode"
                placeholder="Postal code"
                value={form.postalCode}
                onChange={handleChange}
              />
              <input
                name="country"
                placeholder="Country *"
                value={form.country}
                onChange={handleChange}
                required
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleChange}
                />
                Set as default address
              </label>
            </div>
            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.primaryBtn}
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className={styles.secondaryBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <button
          className={styles.btn}
          onClick={openAddForm}
          disabled={isCreating}
        >
          <FaPlus /> Add New Address
        </button>
      )}
    </div>
  );
}
