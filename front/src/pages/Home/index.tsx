import "../../scss/app.scss";
import { FC, useCallback, useEffect } from "react";
import { setSortCategory, setCurrentPage } from "../../redux/filter/slice";
import { selectFilter } from "../../redux/filter/selectors";
import { selectPizzas } from "../../redux/pizza/selectors";
import { fetchAllPizzas } from "../../redux/pizza/asyncActions";
import SkeletonPizza from "../../components/PizzaItem/Skeleton/SkeletonPizza";
import { Categories } from "../../components/";
import { PizzaItem } from "../../components/";
import { Sort } from "../../components/";
import { CartEmpty } from "../../components/";
import { Pagination } from "../../components/";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Home: FC = () => {
  const { currentSortBy, currentCat, currentPage, searchValue } =
    useAppSelector(selectFilter);
  const { pizzasItem, amount, limit, loading } = useAppSelector(selectPizzas);

  const dispatch = useAppDispatch();

  const handlerCategory = useCallback((index: number) => {
    dispatch(setSortCategory(index));
  }, []);

  const handlerPagination = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getAllPizzas = async () => {
    const category = currentCat > 0 ? `&category=${currentCat}` : " ";
    dispatch(
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
