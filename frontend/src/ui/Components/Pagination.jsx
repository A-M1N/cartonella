import styles from "../Components/Pagination.module.css";
import ArrowRight from "../Components/Arrows/ArrowRight";
import ArrowLeft from "../Components/Arrows/ArrowLeft";

export default function Pagination({
  currentPage,
  totalPages,
  total,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add dots before middle section if needed
      if (start > 2) {
        pages.push("dots-start");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add dots after middle section if needed
      if (end < totalPages - 1) {
        pages.push("dots-end");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Don't render if only one page or no pages
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.font} ${styles.arrow} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ArrowLeft width="16" height="16" className={styles.icon} />
      </button>

      {pageNumbers.map((page, index) => {
        if (typeof page === "string") {
          // Render dots
          return (
            <span key={page} className={styles.dots}>
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            className={`${styles.font} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => handlePageClick(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        className={`${styles.font} ${styles.arrow} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ArrowRight width="16" height="16" className={styles.icon} />
      </button>
    </div>
  );
}
