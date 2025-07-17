import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../estilos/Home.css";

const Home = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrito"); // ✅ Vacía el carrito al cerrar sesión
    setUsuario(null);
    navigate("/login");
  };

  return (
    <div className="main-container">
      <header className="header">
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="Logo MONSANA" className="logo" />
        </Link>

        <nav className="nav">
          <Link to="/categorias">TIENDA</Link>
          <Link to="/personalizado">PERSONALIZADO</Link>
          <Link to="/sobre-monsana">SOBRE MONSANA</Link>
        </nav>

        <div className="header-icons">
          {usuario ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontWeight: "bold", color: "#333", fontSize: "14px" }}>
                Bienvenid@, <strong>{usuario.nombre}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="logout-btn"
                title="Cerrar sesión"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <img
                  src="/salir.png"
                  alt="Cerrar sesión"
                  style={{ height: "24px" }}
                />
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-icon">
              <img src="/inicio.png" alt="Login" className="login-icon-img" />
              INICIAR SESIÓN
              </Link>

          )}
        </div>
      </header>

      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={4000}>
        <div className="carousel-slide">
          <img src="/img1.png" alt="Velas 1" className="carousel-img" />
          <div className="overlay">
            <h1>Velas</h1>
            <h2>Personalizadas</h2>
            <Link to="/categorias">
              <button>VER VELAS</button>
            </Link>
          </div>
        </div>
        <div className="carousel-slide">
          <img src="/img2.png" alt="Velas 2" className="carousel-img" />
          <div className="overlay">
            <h1>Velas</h1>
            <h2>Para Regalar</h2>
            <Link to="/categorias">
              <button>VER VELAS</button>
            </Link>
          </div>
        </div>
      </Carousel>

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
            <p>Email:  monsanaelcoca@hotmail.com</p>
            <p>WhatsApp: +593 997863613</p>
            <p>Dirección: EL Coca-Orellana-Ecuador</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Monsana. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
