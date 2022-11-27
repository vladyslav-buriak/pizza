import "../../scss/app.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setSortCategory,
  setCurrentPage,
  selectFilter,
} from "../../redux/slices/filterSlice";
import { fetchAllPizzas, selectPizzas } from "../../redux/slices/pizzasSlice";
import SkeletonPizza from "../../components/PizzaItem/Skeleton/SkeletonPizza";
import Categories from "../../components/Categories";
import PizzaItem from "../../components/PizzaItem";
import Sort from "../../components/Sort";
import CartEmpty from "../Cart/CartEmpty";
import Pagination from "../../components/Pagination";

const Home = () => {
  const { currentSortBy, currentCat, currentPage, searchValue } =
    useSelector(selectFilter);
  const { pizzasItem, amount, limit, loading } = useSelector(selectPizzas);

  const dispatch = useDispatch();

  const handlerCategory = (index: number) => {
    dispatch(setSortCategory(index));
  };

  const handlerPagination = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getAllPizzas = async () => {
    const category = currentCat > 0 ? `&category=${currentCat}` : " ";
    dispatch(
      //@ts-ignore
      fetchAllPizzas({
        searchValue,
        sortBy: currentSortBy.sortProps,
        order: currentSortBy.sortOrder,
        category,
        currentPage,
        limit,
      })
    );
  };

  useEffect(() => {
    getAllPizzas();
  }, [currentSortBy, searchValue, currentPage, currentCat]);

  return (
    <>
      <div className="content__top">
        <Categories currentCat={currentCat} handlerCategory={handlerCategory} />
        <Sort currentSortBy={currentSortBy} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {loading === "error" ? (
        <CartEmpty>
          <h2>возникла ошибка</h2>
        </CartEmpty>
      ) : (
        <div className="content__items">
          {loading === "pending"
            ? [...new Array(6)].map((_, i) => (
                <SkeletonPizza key={i} info={true} height={260} />
              ))
            : pizzasItem.map((p: any, i: number) => {
                return <PizzaItem key={i} {...p} />;
              })}
        </div>
      )}
      <Pagination pages={amount} changePages={handlerPagination} />
    </>
  );
};

export default Home;
