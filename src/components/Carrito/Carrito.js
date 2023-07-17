import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";
import ItemCount from "../ItemCount/ItemCount";
import "./Carrito.css";

const Carrito = () => {
  const { carrito, precioTotal, vaciarCarrito, agregarAlCarrito } = useContext(CartContext);
  const [totalProductos, setTotalProductos] = useState(0);

  const handleVaciar = () => {
    vaciarCarrito();
    setTotalProductos(0);
  };

  const handleCantidadChange = (id, cantidad) => {
    // Buscamos el producto en el carrito por su ID
    const producto = carrito.find((prod) => prod.id === id);

    if (producto) {
      // Actualizamos la cantidad del producto en el carrito utilizando la función agregarAlCarrito del contexto
      agregarAlCarrito(producto, cantidad);
      // Calculamos la nueva cantidad total de productos
      const nuevaCantidadTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
      setTotalProductos(nuevaCantidadTotal);
    }
  };

  return (
    <div className="container">
      <h1 className="main-title">Carrito</h1>

      {carrito.map((prod) => (
        <div key={prod.id}>
          <br />
          <h3>{prod.name}</h3>
          
          <p>Precio unit: ${prod.precio}</p>
          <p>Cantidad: {prod.cantidad}</p>
          <p>Precio total: ${prod.precio * prod.cantidad}</p>
          <ItemCount
            stock={prod.stock}
            initial={prod.cantidad}
            onAdd={(cantidad) => handleCantidadChange(prod.id, cantidad)} // Llamamos a handleCantidadChange al cambiar la cantidad
          />
          <br />
        </div>
      ))}

      {carrito.length > 0 ? (
        <>
          <h2>Precio total: ${precioTotal()}</h2>
          <h3>Cantidad total de productos: {totalProductos}</h3>
          <div className="button-container">
            <button onClick={handleVaciar}>Vaciar Carrito</button>
            <Link to="/checkout">Finalizar compra</Link>
          </div>
        </>
      ) : (
        <h2>El carrito está vacío</h2>
      )}
    </div>
  );
};

export default Carrito;