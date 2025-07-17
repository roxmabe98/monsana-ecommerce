import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../estilos/Registro.css";
import { supabase } from "../supabase/supabaseClient";
import avatarUsuario from "../assets/usuario1.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const esContraseniaSegura = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-= \ [\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correoNormalizado = correo.trim().toLowerCase();

    // Validar contraseña segura
    if (!esContraseniaSegura(contrasenia)) {
      setMensaje(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo."
      );
      return;
    }

    // Registro en Supabase
    const { error: registroError } = await supabase.auth.signUp({
      email: correoNormalizado,
      password: contrasenia,
    });

    if (registroError) {
      console.error("❌ Error de registro:", registroError.message);
      setMensaje("No se pudo registrar el usuario: " + registroError.message);
      return;
    }

    // Insertar en la tabla usuarios
    const { error: insertError } = await supabase.from("usuarios").insert([
      {
        nombre,
        apellido,
        correo: correoNormalizado,
      },
    ]);

    if (insertError) {
      console.error("❌ Error al insertar en la tabla usuarios:", insertError.message);
      setMensaje("Se registró en el sistema, pero no se guardaron los datos.");
    } else {
      setMensaje("✅ Registro exitoso. Revisa tu correo para confirmar.");
    }

    // Limpiar formulario
    setNombre("");
    setApellido("");
    setCorreo("");
    setContrasenia("");
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <img src={avatarUsuario} alt="Usuario" className="imagen-usuario" />
        <h2>Registro de Usuario MONSANA</h2>
        <form onSubmit={handleSubmit} className="formulario">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <div className="campo-contrasenia">
            <input
              type={mostrarContrasenia ? "text" : "password"}
              placeholder="Contraseña"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
            />
            <span
              className="toggle-ojito"
              onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
            >
              {mostrarContrasenia ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Registrarse</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <p className="enlace-login">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
