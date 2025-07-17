import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/Login.css";
import { supabase } from "../supabase/supabaseClient";

const Recuperar = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correoNormalizado = correo.trim().toLowerCase();

    const { error } = await supabase.auth.resetPasswordForEmail(correoNormalizado, {
      redirectTo: "http://localhost:5173/restablecer",
    });

    if (error) {
      console.error("❌ Error al enviar correo:", error.message);
      setMensaje("Hubo un error al enviar el correo.");
    } else {
      setMensaje("📩 Revisa tu correo para restablecer la contraseña.");
      setCorreo(""); // Limpia el campo
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            id="correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <button type="submit">Enviar enlace</button>
        </form>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Recuperar;
