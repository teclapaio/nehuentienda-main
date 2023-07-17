import React from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from "@mui/icons-material/Instagram";
const ContactoPage = () => {
  return (
    <div>
      <h1>Contacto: </h1>
      <h2>nehuentienda@gmail.com </h2>
      <h2>
        <PhoneIcon /> 249 5801625
      </h2>
      <h2>
      <InstagramIcon /> @nehuentienda
      </h2>
      <h2> Domingo a Jueves 9 a 20.30hs, Viernes y Sábado 9 a 21hs </h2>
    </div>
  );
};

export default ContactoPage;