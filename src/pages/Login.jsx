import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../estilos/Login.css";
import { supabase } from "../supabase/supabaseClient";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correoNormalizado = correo.trim().toLowerCase();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: correoNormalizado,
      password: contrasenia,
    });

    if (authError) {
      console.error("❌ Error de login:", authError.message);
      setMensaje("Primero verifica tu cuenta.");
      return;
    }

    const { data: usuario, error: usuarioError } = await supabase
      .from("usuarios")
      .select("id, nombre, apellido, correo")
      .eq("correo", correoNormalizado)
      .single();

    if (usuarioError) {
      console.error("❌ Error en tabla usuarios:", usuarioError.message);
      setMensaje("Inicio de sesión incompleto. Usuario no registrado.");
      return;
    }

    localStorage.setItem("usuario", JSON.stringify(usuario));
    setMensaje("Inicio de sesión exitoso");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="Logo MONSANA" className="logo" />
        </Link>
        <nav className="nav">
          <Link to="/categorias">TIENDA</Link>
          <Link to="/personalizado">PERSONALIZADO</Link>
          <Link to="/sobre-monsana">SOBRE MONSANA</Link>
        </nav>
      </header>

      <div className="login-container">
        <div className="login-image">
          <img src="/florentina.png" alt="Usuario decorativo" />
        </div>

        <div className="login-form">
          <img src="/logo.png" alt="Logo MONSANA" className="login-logo" />
          <h2>Ingrese sus credenciales</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="correo">Correo electrónico:</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <label htmlFor="contrasenia">Contraseña:</label>
            <input
              id="contrasenia"
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
            />

            <button type="submit">Iniciar sesión</button>
          </form>

          {mensaje && <p className="mensaje">{mensaje}</p>}

          <div className="login-links">
            <Link to="/registro">Registrarse</Link>
            <Link to="/recuperar">¿Olvidé mi contraseña?</Link>
            <Link to="/admin">Soy Administrador</Link>
          </div>
        </div>
      </div>

      {/* Footer agregado aquí */}
      <footer className="footer">
        <div className="footer-contenedor">
          <div className="footer-columna">
            <h4>MONSANA</h4>
            <p>Velas artesanales hechas con amor, diseño y conciencia ambiental.</p>
          </div>

          <div className="footer-columna">
            <h4>Enlaces</h4>
            <ul>
              <li><Link to="/categorias">Tienda</Link></li>
              <li><Link to="/personalizado">Personalizado</Link></li>
              <li><Link to="/sobre-monsana">Sobre Monsana</Link></li>
            </ul>
          </div>

          <div className="footer-columna">
            <h4>Contacto</h4>
            <p>Email: monsanaelcoca@hotmail.com</p>
            <p>WhatsApp: +593 997863613</p>
            <p>Dirección: EL Coca-Orellana-Ecuador</p>
            <div className="footer-redes">
              {/* redes sociales opcionales */}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Monsana. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Login;
