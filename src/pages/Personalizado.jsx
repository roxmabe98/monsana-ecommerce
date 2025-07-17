import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Personalizado.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Personalizado = () => {
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

      <div className="personalizado-container">
        <h2>Conoce más sobre nuestros productos de MONSANA</h2>
        <p className="descripcion">
          Productos hechos con amor. Escríbenos o mira más en nuestras redes.
        </p>

        {/* Galería de productos personalizada */}
        <div className="galeria-productos">
          <img src="/personalizado1.png" alt="Producto 1" />
          <img src="/personalizado2.png" alt="Producto 2" />
          <img src="/personalizado3.png" alt="Producto 3" />
          <img src="/personalizado4.png" alt="Producto 4" />
        </div>

        {/* Botones de redes sociales */}
        <div className="botones-redes">
          <a
            href="https://wa.me/593997863613"
            className="btn-red"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="icono-red" />
            Escríbenos por WhatsApp
          </a>
          <a
            href="https://www.instagram.com/monsana.ec?igsh=MXJqd2ZreDc5bzRieg=="
            className="btn-red"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/instagram.png" alt="Instagram" className="icono-red" />
            Síguenos en Instagram
          </a>
        </div>
      </div>

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
            <div className="footer-redes">
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

export default Personalizado;
