import React from "react";
import { Link } from "react-router-dom";

const Gracias = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>✅ ¡Gracias por tu compra!</h2>
      <p>Tu pedido ha sido procesado correctamente.</p>
       <p>Nos contactaremos con usted al numero proporcionado.</p>
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
        ← Volver al inicio
      </Link>
    </div>
  );
};

export default Gracias;
