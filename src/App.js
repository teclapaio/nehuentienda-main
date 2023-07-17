import React, { Component } from "react";
import './App.css';
// React router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// componentes
import MiTienda from './components/MiTienda';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';

import { CartProvider } from "./Context/CartContext";

import Carrito from "./components/Carrito/Carrito";


import Checkout from "./components/Checkout/Checkout";
// pages
import ContactoPage from "./Pages/ContactoPage/ContactoPage";
import HomePage from "./Pages/HomePage/HomePage";
import PoliticasPage from "./Pages/PoliticasPage/PoliticasPage";
import ItemPage from "./Pages/ItemPage/ItemPage";
import CategoriaPage from "./Pages/CategoriaPage/CategoriaPage";


class App extends Component {

  render() {
    return (
      <Router>
           <CartProvider>
      <div className="app">
        <MiTienda
          titulo="NEHUEN"
          subtitulo="TODO LO QUE TE GUSTA"
        />
        <NavBar />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/Politicas" element={<PoliticasPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/user-tipo/:tipo" element={<CategoriaPage />} />
         
          <Route path="/Carrito" element={<Carrito />}/>
          <Route path="/checkout" element={<Checkout />}/>
          </Routes>

      
        <ItemListContainer greeting="Gracias por visitar nuestra página"/> 
      </div>
      </CartProvider>
      </Router>
    );
  }
}

export default App;
