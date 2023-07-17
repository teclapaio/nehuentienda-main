import React, { useState, useEffect, useContext } from "react";
import CardUser from "../../components/CardUser/CardUser";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs, documentId } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { CartContext } from "../../Context/CartContext";

const ItemPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [category, setCategory] = useState("");
  const { agregarAlCarrito } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, "productos"), where(documentId(), "==", id));
      const docs = [];
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setUserData(docs);

      if (docs.length > 0) {
        setCategory(docs[0].tipo);
      }
    };
    getUsers();
  }, [id]);

  const handleAddToCart = () => {
    const product = userData.find((data) => data.id === id);
    if (product) {
      const productToAdd = { ...product, tipo: product.tipo }; 
      agregarAlCarrito(productToAdd, cartCount);
      console.log(`Agregando ${cartCount} productos del tipo ${product.tipo} al carrito`);
    }
  };

  const handleQuantityChange = (value) => {
    setCartCount(value);
  };

  return (
    <div>
      <h1>Categoría: {category.toUpperCase()}</h1>
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        {userData.map((data) => (
          <div key={data.id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CardUser data={data} />
              <div style={{ marginLeft: 20 }}>
                <h3>Descripción del Producto:</h3>
                <p style={{ wordWrap: "break-word", maxWidth: "300px" }}>{data.descri}</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <button onClick={() => handleQuantityChange(cartCount - 1)} disabled={cartCount === 1}>
                &#8722;
              </button>
              <span style={{ margin: "0 10px" }}>{cartCount}</span>
              <button onClick={() => handleQuantityChange(cartCount + 1)} disabled={cartCount >= data.stock}>
                +
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <button onClick={handleAddToCart}>Agregar al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemPage;