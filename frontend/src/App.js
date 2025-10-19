import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import client from "./apolloClient"; // make sure this file exists
import Home from "./pages/Home";
import EmployeeDetail from "./pages/EmployeeDetail";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
