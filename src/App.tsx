import React from "react";
import {
    Route,
    Routes,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProductSearchList from "./pages/ProductSearchList/ProductSearchList";

const App = () => (
    <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/items" element={ <ProductSearchList /> } />
        <Route path="/items/:id" element={ <ProductDetail /> } />
        <Route path='*' element={<ErrorPage />}/>
    </Routes>
);

export default App;