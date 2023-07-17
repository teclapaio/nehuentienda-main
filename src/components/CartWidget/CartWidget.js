import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './CartWidget.css'; 

const CartWidget = () => {
  const { cantidadEnCarrito } = useContext(CartContext);

  return (
    <div>
      <Link className="Formato" to="/carrito">
        <ShoppingCartIcon style={{ color: "white" }} /> 
        <span className="Numero" style={{ color: "white" }}>{cantidadEnCarrito()}</span> 
      </Link>
    </div>
  );
};

export default CartWidget;