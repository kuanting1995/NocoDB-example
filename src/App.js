import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Nopage from "./Nopage";
import Listmy from "./Listmy";
import RefForm from "./RefForm";
import Ref1117 from "./Ref1117";
import Example from "./Example";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/ex" element={<Example />} />
          <Route path="/ref" element={<RefForm />} />
          <Route path="/ref1117" element={<Ref1117 />} />
          <Route path="/listmy" element={<Listmy />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
