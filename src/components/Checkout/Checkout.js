import React, { useContext, useState } from 'react';
import { CartContext } from "../../Context/CartContext";
import { useForm } from 'react-hook-form';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import './Checkout.css'; 

const Checkout = () => {
  const [pedidoId, setPedidoId] = useState("");

  const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors } // Agrega esta línea para obtener información sobre los errores
  } = useForm();

  const comprar = (data) => {
    const pedido = {
      cliente: data,
      productos: carrito,
      total: precioTotal()
    }
    console.log(pedido);

    const pedidosRef = collection(db, "pedidos");

    addDoc(pedidosRef, pedido)
      .then((doc) => {
        setPedidoId(doc.id);
        vaciarCarrito();
      })
  }

  if (pedidoId) {
    return (
      <div className="container">
        <h1 className="main-title">Muchas gracias por tu compra</h1>
        <p>Tu número de pedido es: {pedidoId}</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="main-title">Finalizar compra</h1>
      <form className="formulario" onSubmit={handleSubmit(comprar)}>
        <input type="text" placeholder="Ingresá tu nombre" {...register("nombre", { required: true })} />
        {errors.nombre && <p className="error-message">El nombre es obligatorio.</p>}

        <input type="email" placeholder="Ingresá tu e-mail" {...register("email", { required: true })} />
        {errors.email && <p className="error-message">El correo electrónico es obligatorio.</p>}

        <input type="phone" placeholder="Ingresá tu teléfono" {...register("telefono")} />

        <button className="enviar" type="submit">Comprar</button>
      </form>
    </div>
  )
}

export default Checkout;