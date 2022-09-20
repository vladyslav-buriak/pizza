import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaItem from "./components/PizzaItem";
import Sort from "./components/Sort";
import "./scss/app.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonPizza from "./components/PizzaItem/Skeleton/SkeletonPizza";


function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllPizzas();
  }, []);

  const getAllPizzas = async () => {
    setIsLoading(true);
    try {
      await axios
        .get("https://63276da95731f3db99593be8.mockapi.io/products")
        .then((resp) => setPizzas(resp.data));
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false)
    }
  };
  return (

    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading ? [...new Array(6)].map((_, i) => <SkeletonPizza key={i} />)
                : pizzas.map((p, i) => {
                  return <PizzaItem key={i} {...p} />
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
