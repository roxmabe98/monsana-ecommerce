import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Categorias.css';
import { supabase } from '../supabase/supabaseClient';

const obtenerImagen = (nombreCategoria) => {
  const nombre = nombreCategoria.toLowerCase();
  if (nombre.includes('decorativa')) return '/decorativas.png';
  if (nombre.includes('aromática')) return '/aromaticas.png';
  if (nombre.includes('religiosa')) return '/religiosas.png';
  return '/default.png';
};

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const { data, error } = await supabase
          .from('categorias')
          .select('id, nombre, detalle');

        if (error) throw error;
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error.message);
      }
    };

    obtenerCategorias();
  }, []);

  return (
    <div className="main-container">
      <header className="header">
        <Link to="/">
          <img src="/logo.png" alt="Logo MONSANA" className="logo" />
        </Link>
        <nav className="nav">
          <Link to="/">PÁGINA PRINCIPAL</Link>
          <Link to="/personalizado">PERSONALIZADO</Link>
          <Link to="/sobre-monsana">SOBRE MONSANA</Link>
        </nav>
      </header>

      <div className="categorias-container">
        <h2>Categorías de Velas</h2>
        <div className="categorias-grid">
          {categorias.map((cat) => (
            <Link to={`/categorias/${cat.id}`} key={cat.id} className="categoria-card">
              <img
                src={obtenerImagen(cat.nombre)}
                alt={cat.nombre}
                className="categoria-img"
              />
              <h3 className="categoria-nombre">{cat.nombre}</h3>
              <p className="categoria-detalle" style={{ textAlign: 'justify', padding: '0 15px' }}>
                {cat.detalle}
              </p>
            </Link>
          ))}
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
    </div>
  );
};

export default Categorias;
