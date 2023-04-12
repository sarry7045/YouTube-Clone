import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = React.lazy(() => import("./Pages/Home"));
const Search = React.lazy(() => import("./Pages/Search"));
const Watch = React.lazy(() => import("./Pages/Watch"));
const ReactHookForm = React.lazy(() => import("./ReactHookForm"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="*" element={<Home />} />
          <Route path="/ReactHookForm" element={<ReactHookForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
