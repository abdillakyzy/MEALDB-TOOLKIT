import React from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import Main from "./Pages/Main/Main.js";
import Footer from "./Components/Footer/Footer.js";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
