import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/Restablecer.css";
import { supabase } from "../supabase/supabaseClient";

const Restablecer = () => {
  const [contrasenia, setContrasenia] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contrasenia !== confirmacion) {
      setMensaje("❌ Las contraseñas no coinciden.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: contrasenia,
    });

    if (error) {
      console.error("❌ Error al actualizar contraseña:", error.message);
      setMensaje("Error al guardar la nueva contraseña.");
    } else {
      setMensaje("✅ Contraseña actualizada con éxito.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="contrasenia">Nueva contraseña:</label>
          <input
            id="contrasenia"
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            required
          />
          <label htmlFor="confirmacion">Confirmar contraseña:</label>
          <input
            id="confirmacion"
            type="password"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            required
          />
          <button type="submit">Guardar contraseña</button>
        </form>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Restablecer;
