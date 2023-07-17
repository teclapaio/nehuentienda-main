import React, { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [cartCount, setCartCount] = useState(initial); 

  const handleAddToCart = () => {
    // Verificar si la cantidad en el carrito es menor que el stock
    if (cartCount < stock) {
      
      setCartCount((prevCount) => prevCount + 1);
      onAdd(1); 
    }
  };

  const handleRemoveFromCart = () => {
    
    if (cartCount > 0) {
      setCartCount((prevCount) => prevCount - 1);
      onAdd(-1); 
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleRemoveFromCart} disabled={cartCount === 0}>
          &#8722;
        </button>
        <span style={{ margin: "0 10px" }}>{cartCount}</span>
        <button onClick={handleAddToCart} disabled={cartCount >= stock}>
          +
        </button>
      </div>
    </div>
  );
};

export default ItemCount;
