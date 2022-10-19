
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import PizzaInfo from "./pages/PizzaInfo";
import Layout from "./layots/layout";
import { Routes, Route } from "react-router-dom";

<App />;

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
