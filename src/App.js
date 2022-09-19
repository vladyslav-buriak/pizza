import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaItem from "./components/PizzaItem";
import Sort from "./components/Sort";
import "./scss/app.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    getAllPizzas();
  }, []);

  const getAllPizzas = async () => {
    try {
      await axios
        .get("https://63276da95731f3db99593be8.mockapi.io/products")
        .then((resp) => setPizzas(resp.data));
    } catch (e) {
      alert(e);
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
              {pizzas.map((p, i) => {
                return <PizzaItem key={i} {...p} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
