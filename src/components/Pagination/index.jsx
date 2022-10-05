import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ pages, changePages }) => {
  return (
    <ReactPaginate
      className={styles.paginationWrapp}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => {
        changePages(e.selected + 1);
      }}
      pageRangeDisplayed={3}
      pageCount={pages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
