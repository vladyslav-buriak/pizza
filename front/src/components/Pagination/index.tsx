import styles from "./Pagination.module.scss";
import React, { FC } from "react";
import ReactPaginate from "react-paginate";

type PaginationProps={
    pages:number;
    changePages:any;
}

const Pagination:FC<PaginationProps> = ({ pages, changePages }) => {
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
  
    />
  );
};

export default Pagination;
