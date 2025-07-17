import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Tienda.css';

const productos = [
  { id: 1, nombre: 'VELA+FLORES SECAS', precio: 6.5, imagen: '/flores-secas.png' },
  { id: 2, nombre: 'BAMBU+FLORES', precio: 8.0, imagen: '/vela-bambu.png' },
  { id: 3, nombre: 'VELA FLORENTINA', precio: 7.5, imagen: '/florentina.png' },
  { id: 4, nombre: 'VASO+FLOR', precio: 6.5, imagen: '/vela-flor.png' },
  { id: 5, nombre: 'VASO+OSOS', precio: 6.5, imagen: '/vela-oso.png' },
  { id: 6, nombre: 'PERRITO+BASE', precio: 7.5, imagen: '/perrito-base.png' }
];

const Tienda = () => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    fetch('http://localhost/monsana-api/agregar_carrito.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    })
      .then(() => {
        setCarrito([...carrito, producto]);
        alert('Producto agregado al carrito');
      })
      .catch(err => console.error('Error al agregar al carrito:', err));
  };

  return (
    <div className="main-container">
      <header className="header">
        <img src="/logo.png" alt="Logo MONSANA" className="logo" />
        <nav className="nav">
          <Link to="/">PAGINA PRINCIPAL</Link>
          <Link to="/personalizado">PERSONALIZADO</Link>
          <Link to="/sobre-monsana">SOBRE MONSANA</Link>
        </nav>
        <div className="header-icons">
          <Link to="/login" className="login-icon">LOGIN</Link>
          <Link to="/carrito" className="cart-icon">
            <img src="/cart.png" alt="Carrito" />
          </Link>
        </div>
      </header>

      <section className="tienda">
        <div className="productos">
          {productos.map(p => (
            <div key={p.id} className="producto">
              <img src={p.imagen} alt={p.nombre} className="producto-img" />
              <h4 className="producto-nombre">{p.nombre}</h4>
              <p className="producto-precio">${p.precio.toFixed(2)}</p>
              <button onClick={() => agregarAlCarrito(p)} className="btn-carrito">
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tienda;
