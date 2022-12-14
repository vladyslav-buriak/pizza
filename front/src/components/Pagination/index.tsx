import styles from "./Pagination.module.scss";
import  { FC } from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  pages: number;
  changePages: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ pages, changePages }) => {
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
