import React from "react";
import Header from "./components/header/header";
import Routes from "./routes";
import Footer from "./components/footer/footer";
import "./App.css";

function App() {
  return (
    <div>
      <Header/>
      <Routes/>
      <Footer/>
    </div>
  );
}

export default App;
