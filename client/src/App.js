import * as React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/header/header.component";
import HomePage from "./pages/home-page/home-page.component";
import SignInPage from "./pages/sign-in-page/sign-in-page.component";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<SignInPage/>} />
      </Routes>
    </div>
  );
}

export default App;
