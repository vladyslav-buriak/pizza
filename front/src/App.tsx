import "./scss/app.scss";
import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
import { NotFound } from "./components";
import Layout from "./layots/layout";
import { Routes, Route } from "react-router-dom";
import Loadable from "react-loadable";

const Cart = Loadable({
  loader: () => import(/*webpackChunkName */ "./pages/Cart"),
  loading: () => <h3>Сторінка завантажується...</h3>,
});

const PizzaInfo = Loadable({
  loader: () => import(/*webpackChunkName */ "./pages/PizzaInfo"),
  loading: () => <h3>Сторінка завантажується...</h3>,
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="about/:id" element={<PizzaInfo />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
