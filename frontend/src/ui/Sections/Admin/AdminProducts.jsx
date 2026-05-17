import { useEffect, useState } from "react";
import styles from "./AdminPages.module.css";
import adminService from "../../../services/adminService";
import toast from "react-hot-toast";
import { MdAdd, MdClose } from "react-icons/md";
import Pagination from "../../Components/Pagination";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  oldPrice: "",
  image: "",
  images: "",
  stock: "",
  brand: "",
  categoryId: "",
  featured: false,
  isNew: false,
  onSale: false,
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (page = currentPage, searchValue = search) => {
    try {
      setIsLoading(true);

      const data = await adminService.getProducts({
        page,
        limit: 50,
        search: searchValue || undefined,
      });

      setProducts(data.products || []);
      setPagination(data.pagination);
      setCurrentPage(data.pagination?.page || 1);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  const fetchCategories = async () => {
    try {
      const data = await adminService.getCategories();
      setCategories(Array.isArray(data) ? data : data.categories || []);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(1);
  };

  const handleReset = () => {
    setSearch("");
    setCurrentPage(1);
    fetchProducts(1, "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      image: product.image || "",
      images: product.images?.join(", ") || "",
      stock: product.stock || "",
      brand: product.brand || "",
      categoryId: product.categoryId || product.category?.id || "",
      featured: product.featured || false,
      isNew: product.isNew || false,
      onSale: product.onSale || false,
    });
    setShowForm(true);
  };

  const buildPayload = () => {
    return {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      image: form.image,
      images: form.images
        ? form.images
            .split(",")
            .map((img) => img.trim())
            .filter(Boolean)
        : [],
      stock: Number(form.stock || 0),
      brand: form.brand || null,
      categoryId: Number(form.categoryId),
      featured: form.featured,
      isNew: form.isNew,
      onSale: form.onSale,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = buildPayload();

      if (editingProduct) {
        await adminService.updateProduct(editingProduct.id, payload);
        toast.success("Product updated");
      } else {
        await adminService.createProduct(payload);
        toast.success("Product created");
      }

      setShowForm(false);
      setEditingProduct(null);
      setForm(emptyForm);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Product save failed");
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete product?",
    );
    if (!confirmed) return;

    try {
      await adminService.deleteProduct(productId);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";
    return image.startsWith("http") ? image : "";
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Inventory</p>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>
            Add, edit, and manage your store products.
          </p>
        </div>

        <button className={styles.primaryBtn} onClick={openCreateForm}>
          <MdAdd />
          Add Product
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {showForm && (
        <div className={styles.panel} style={{ marginBottom: "1.5rem" }}>
          <div className={styles.header} style={{ marginBottom: "1rem" }}>
            <div>
              <h2 className={styles.title} style={{ fontSize: "1.25rem" }}>
                {editingProduct ? "Edit Product" : "Create Product"}
              </h2>
              <p className={styles.subtitle}>
                Fill product details and save changes.
              </p>
            </div>

            <button
              className={styles.secondaryBtn}
              onClick={() => setShowForm(false)}
            >
              <MdClose />
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <input
                className={styles.input}
                name="name"
                placeholder="Product name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                className={styles.input}
                name="brand"
                placeholder="Brand"
                value={form.brand}
                onChange={handleChange}
              />

              <input
                className={styles.input}
                name="price"
                type="number"
                step="0.01"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />

              <input
                className={styles.input}
                name="oldPrice"
                type="number"
                step="0.01"
                placeholder="Old price"
                value={form.oldPrice}
                onChange={handleChange}
              />

              <input
                className={styles.input}
                name="stock"
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
              />

              <select
                className={styles.select}
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.slug} #{category.id}
                  </option>
                ))}
              </select>

              <input
                className={`${styles.input} ${styles.full}`}
                name="image"
                placeholder="https://..."
                value={form.image}
                onChange={handleChange}
                required
              />

              <input
                className={`${styles.input} ${styles.full}`}
                name="images"
                placeholder="/uploads/a.jpg, /uploads/b.jpg"
                value={form.images}
                onChange={handleChange}
              />

              <textarea
                className={`${styles.textarea} ${styles.full}`}
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />

              <div className={`${styles.checkboxRow} ${styles.full}`}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                  />
                  Featured
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={form.isNew}
                    onChange={handleChange}
                  />
                  New
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="onSale"
                    checked={form.onSale}
                    onChange={handleChange}
                  />
                  On Sale
                </label>
              </div>
            </div>

            <div className={styles.formActions}>
              <button className={styles.primaryBtn} type="submit">
                {editingProduct ? "Update Product" : "Create Product"}
              </button>

              <button
                className={styles.secondaryBtn}
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.panel}>
        <form className={styles.toolbar} onSubmit={handleSearch}>
          <input
            className={styles.input}
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className={styles.primaryBtn} type="submit">
            Search
          </button>

          <button
            className={styles.secondaryBtn}
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </form>

        {isLoading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <div className={styles.empty}>No products found.</div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Flags</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productCell}>
                        <img
                          className={styles.productImg}
                          src={getImageUrl(product.image)}
                          alt={product.name}
                        />
                        <div>
                          <div className={styles.bold}>{product.name}</div>
                          <div className={styles.muted}>
                            {product.brand || "No brand"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{product.category?.name || "-"}</td>

                    <td className={styles.bold}>
                      ${Number(product.price).toFixed(2)}
                    </td>

                    <td>{product.stock}</td>

                    <td>
                      <div className={styles.muted}>
                        {product.featured && "Featured "}
                        {product.isNew && "New "}
                        {product.onSale && "Sale "}
                        {!product.featured &&
                          !product.isNew &&
                          !product.onSale &&
                          "-"}
                      </div>
                    </td>

                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.secondaryBtn}
                          onClick={() => openEditForm(product)}
                        >
                          Edit
                        </button>

                        <button
                          className={styles.dangerBtn}
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && pagination.pages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.pages}
            total={pagination.total}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}

export default AdminProducts;
