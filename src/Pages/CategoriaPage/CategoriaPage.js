import React, { useState, useEffect } from "react";
import CardUser from "../../components/CardUser/CardUser";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const CategoryPage = () => {
  const { tipo } = useParams();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, "productos"), where("tipo", "==", tipo));
      const docs = [];
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      setUserData(docs);
    };

    getUsers();
  }, [tipo]);

  return (
    <div>
      <h1>Categoría: {tipo.toUpperCase()}</h1> {/* Convertir a mayúsculas */}
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        {userData.map((data) => (
          <div key={data.id}>
            <Link to={`/item/${data.id}`} style={{ textDecoration: "none" }}>
              <CardUser data={data} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;