import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionSuccess from "./components/Transaction/TransactionSuccess";
import InputPage from "./components/User/InputPage";

const App = () => {
  console.log("App Rendered");
  return (
   
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/success" element={<TransactionSuccess />} />
      </Routes>
  
  );
};

export default App;
