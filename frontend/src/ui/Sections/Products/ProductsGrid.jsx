import styles from "../Products/ProductsGrid.module.css";
import CardItem from "../../Components/CardItem";
import CardItemList from "../../Components/CardItemList";
import ProductsToolbar from "./ProductsToolbar";
import Pagination from "../../Components/Pagination";
import { useProducts } from "../../../hooks/useProducts";
import { useFilters } from "../../../hooks/useFilters";
import Spinner from "../../Components/Spinner";

export default function ProductsGrid({ viewMode, setViewMode }) {
  const { setPage } = useFilters();

  const { data, isLoading, isError, error, isFetching } = useProducts({
    limit: viewMode === "list" ? 10 : 12,
  });

  if (isLoading) {
    return (
      <div className={styles.rightPanel}>
        <ProductsToolbar viewMode={viewMode} setViewMode={setViewMode} />
        <Spinner size={48} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.rightPanel}>
        <ProductsToolbar viewMode={viewMode} setViewMode={setViewMode} />
        <div className={styles.error}>
          Error Loading Products....{error.message}
        </div>
      </div>
    );
  }

  const { products = [], pagination = {} } = data || {};

  if (products.length === 0) {
    return (
      <div className={styles.rightPanel}>
        <ProductsToolbar
          viewMode={viewMode}
          setViewMode={setViewMode}
          total={0}
        />
        <div className={styles.empty}>
          <p>No products found.</p>
          <p className={styles.emptyHint}>Try adjusting your filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rightPanel}>
      <ProductsToolbar
        total={pagination.total}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {/* Grid View */}
      {viewMode === "grid" && (
        <div className={styles.grid}>
          {products.map((product) => (
            <CardItem
              key={product.id}
              id={product.id}
              image={product.image.startsWith("http") ? product.image : ""}
              title={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              reviewCount={product.reviewCount}
              labelTitle={
                product.onSale ? "On Sale" : product.isNew ? "New" : null
              }
              labelColor={product.onSale ? "#DB4444" : "#22c55e"}
            />
          ))}
        </div>
      )}
      {/* List View */}
      {viewMode === "list" && (
        <div className={styles.list}>
          {products.map((product) => (
            <CardItemList
              key={product.id}
              id={product.id}
              image={product.image.startsWith("http") ? product.image : ""}
              title={product.name}
              description={product.description}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              reviewCount={product.reviewCount}
              stock={product.stock}
              labelTitle={
                product.onSale ? "On Sale" : product.isNew ? "New" : null
              }
              labelColor={product.onSale ? "#DB4444" : "#22c55e"}
            />
          ))}
        </div>
      )}
      <Pagination
        currentPage={pagination.page || 1}
        totalPages={pagination.pages || 1}
        total={pagination.total || 0}
        onPageChange={setPage}
      />
    </div>
  );
}
