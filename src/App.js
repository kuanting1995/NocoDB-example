import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import List from "./List";
import Nopage from "./Nopage";
import List_my from "./List_my";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list" element={<List />} />
          <Route path="listmy" element={<List_my />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;