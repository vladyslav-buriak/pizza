import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss";

const Pagination =({pages,changePages})=>{
    return(
        <ReactPaginate
        className={styles.paginationWrapp}
        breakLabel="..."
        nextLabel=">"
        onPageChange={changePages}
        pageRangeDisplayed={3}
        pageCount={pages}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    );
}

export default Pagination;