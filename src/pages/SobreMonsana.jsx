import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/SobreMonsana.css';

const SobreMonsana = () => {
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

      <section className="sobre-monsana">
        <div className="contenedor">
          <h2 className="titulo">CONOCE NUESTRA HISTORIA DE MONSANA</h2>

          <div className="banner">
            <img
              src="/img3.jpg"
              alt="Velas artesanales"
              className="imagen-banner"
            />
          </div>

          <div className="contenido">
            <div className="bloque">
              <h3 className="subtitulo">MISIÓN</h3>
              <p>
                Crear velas artesanales de alta calidad que transmitan calidez, armonía y bienestar,
                fusionando diseño, aroma y sostenibilidad. Nos comprometemos a ofrecer productos
                únicos, hechos a mano con pasión y cuidado, para acompañar momentos especiales y
                transformar ambientes.
              </p>
            </div>

            <div className="vision">
              <h3 className="subtitulo">VISIÓN</h3>
              <p>
                Ser un referente nacional e internacional en la elaboración de velas artesanales,
                destacándonos por nuestra creatividad, responsabilidad ambiental y excelencia en
                diseño. Apuntamos a ser reconocidos por nuestras creaciones únicas y la esencia de
                Monsana: la más higiénica, natural y refinada experiencia, autoridad y compromiso con
                la excelencia.
              </p>
            </div>

            <div className="bloque">
              <h3 className="subtitulo">NUESTRA HISTORIA</h3>
              <p>
                Monsana es un emprendimiento de velas artesanales que nació a inicios del año 2023,
                fruto de la creatividad y el amor por el diseño de Ana Vélez. Inspirada por el deseo
                de crear momentos especiales, Ana comenzó haciendo velas como un pasatiempo, pero
                pronto su amor por los aromas y el arte de lo hecho a mano la llevó a emprender con
                propósito.
                <br /><br />
                Con el compromiso de ofrecer un producto de identidad propia, su vocación y pasión
                dieron vida al sueño de crear velas únicas, especiales como su creadora, con un
                expertise en aroma y estilo artesanal.
              </p>
            </div>
          </div>
        </div>
      </section>

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

export default SobreMonsana;
