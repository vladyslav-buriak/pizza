import Header from "./components/Header";
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import PizzaInfo from "./pages/PizzaInfo";

<App />;

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/about/:id" element={<PizzaInfo />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
