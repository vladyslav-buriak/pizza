import Header from "./components/Header";
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Context } from "./Context";
import { useEffect, useState, useContext } from "react";

<App />;

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [sortCategory, setSortCategory] = useState(0);
  const [sortName, setSortName] = useState({
    name: "за популярністю",
    sortProps: "rating",
    sortOrder: "desc",
  });

  return (
    <Context.Provider
      value={{
        sortCategory,
        setSortCategory,
        sortName,
        setSortName,
        searchValue,
        setSearchValue,
      }}
    >
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
