import { useEffect, useState } from "react";
import styles from "./AdminPages.module.css";
import { useDealOfDay } from "../../../hooks/useDeals";
import adminService from "../../../services/adminService";
import toast from "react-hot-toast";

const emptyForm = {
  productId: "",
  dealPrice: "",
  activeDate: "",
  expiresAt: "",
  freeShipping: false,
  freeGift: false,
  giftDescription: "",
};

export default function AdminDeals() {
  const { data: deal, isLoading, refetch } = useDealOfDay();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  // Fetch products for dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await adminService.getProducts({ limit: 116 });
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateDeal = async (e) => {
    e.preventDefault();

    try {
      setLoadingAction(true);

      await adminService.createDailyDeal({
        productId: form.productId,
        dealPrice: form.dealPrice,
        activeDate: form.activeDate,
        expiresAt: form.expiresAt,
        freeShipping: form.freeShipping,
        freeGift: form.freeGift,
        giftDescription: form.giftDescription || null,
      });

      toast.success("Daily deal created");
      setShowForm(false);
      setForm(emptyForm);
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create deal");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteDeal = async () => {
    if (!deal) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete today's deal?",
    );

    if (!confirmed) return;

    try {
      setLoadingAction(true);
      await adminService.deleteDailyDeal(deal.id);
      toast.success("Daily deal deleted");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setLoadingAction(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";
    return image.startsWith("http") ? image : "";
  };

  return (
    <div className={styles.adminPage}>
      <h2>Daily Deal</h2>

      {isLoading ? (
        <p>Loading deal...</p>
      ) : deal ? (
        <div className={styles.card}>
          <h3>Current Deal</h3>

          <div className={styles.row}>
            <img
              src={getImageUrl(deal.product.image)}
              alt={deal.product.name}
              className={styles.productImage}
            />

            <div>
              <p>
                <strong>{deal.product.name}</strong>
              </p>
              <p>Original: ${deal.originalPrice}</p>
              <p>Deal Price: ${deal.dealPrice}</p>
              <p>Savings: ${deal.savings}</p>
              <p>
                Expires in: {deal.timeRemaining.hours}h{" "}
                {deal.timeRemaining.minutes}m
              </p>

              {deal.freeShipping && <p>🚚 Free Shipping</p>}
              {deal.freeGift && <p>🎁 {deal.giftDescription}</p>}
            </div>
          </div>

          <button
            className={styles.deleteBtn}
            onClick={handleDeleteDeal}
            disabled={loadingAction}
          >
            Delete Deal
          </button>
        </div>
      ) : (
        <p>No active deal today.</p>
      )}

      <div className={styles.actions}>
        <button onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Cancel" : "Create Daily Deal"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateDeal} className={styles.form}>
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="dealPrice"
            placeholder="Deal Price"
            value={form.dealPrice}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="activeDate"
            value={form.activeDate}
            onChange={handleChange}
            required
          />

          <input
            type="datetime-local"
            name="expiresAt"
            value={form.expiresAt}
            onChange={handleChange}
            required
          />

          <label>
            <input
              type="checkbox"
              name="freeShipping"
              checked={form.freeShipping}
              onChange={handleChange}
            />
            Free Shipping
          </label>

          <label>
            <input
              type="checkbox"
              name="freeGift"
              checked={form.freeGift}
              onChange={handleChange}
            />
            Free Gift
          </label>

          {form.freeGift && (
            <input
              type="text"
              name="giftDescription"
              placeholder="Gift Description"
              value={form.giftDescription}
              onChange={handleChange}
            />
          )}

          <button type="submit" disabled={loadingAction}>
            Create Deal
          </button>
        </form>
      )}
    </div>
  );
}
