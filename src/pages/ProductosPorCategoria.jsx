import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { toast } from "react-toastify";
import "../estilos/ProductosPorCategoria.css";

const ProductosPorCategoria = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [cantidad, setCantidad] = useState({});
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [animarCarrito, setAnimarCarrito] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      const { data: productosData, error: productosError } = await supabase
        .from("productos")
        .select("*")
        .eq("categoria_id", id);

      if (productosError)
        console.error("Error al obtener productos:", productosError.message);
      else setProductos(productosData);
    };

    const obtenerNombreCategoria = async () => {
      const { data, error } = await supabase
        .from("categorias")
        .select("nombre")
        .eq("id", id)
        .single();

      if (error)
        console.error("Error al obtener la categoría:", error.message);
      else setCategoriaNombre(data.nombre);
    };

    obtenerProductos();
    obtenerNombreCategoria();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setUsuarioAutenticado(!!usuario);
  }, [id]);

  useEffect(() => {
    const storedCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(storedCarrito);
  }, []);

  const manejarCantidad = (productoId, nuevaCantidad) => {
    setCantidad({
      ...cantidad,
      [productoId]: nuevaCantidad,
    });
  };

  const agregarAlCarrito = (producto) => {
    if (!usuarioAutenticado) {
      toast.error("Debes iniciar sesión para agregar productos al carrito.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const cantidadSeleccionada = cantidad[producto.id] || 1;
    const productoConCantidad = {
      ...producto,
      cantidad: cantidadSeleccionada,
    };

    const productoExistente = carrito.find(
      (item) => item.id === producto.id
    );

    let nuevoCarrito;

    if (productoExistente) {
      nuevoCarrito = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidadSeleccionada }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, productoConCantidad];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    toast.success(`${producto.nombre} agregado al carrito.`);

    setAnimarCarrito(true);
    setTimeout(() => setAnimarCarrito(false), 400);
  };

  const obtenerTotalProductos = () => {
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
  };

  return (
    <div className="main-container">
      <header className="header">
        <Link to="/">
          <img src="/logo.png" alt="Logo MONSANA" className="logo" />
        </Link>
        <nav className="nav">
          <Link to="/Categorias">REGRESAR A CATEGORIAS</Link>
          <Link to="/personalizado">PERSONALIZADO</Link>
          <Link to="/sobre-monsana">SOBRE MONSANA</Link>
        </nav>
        <div className="header-icons">
          <Link to="/carrito" className="cart-icon">
            <img src="/cart.png" alt="Carrito" style={{ height: "30px" }} />
            {obtenerTotalProductos() > 0 && (
              <span className={`cart-count ${animarCarrito ? "animar" : ""}`}>
                {obtenerTotalProductos()}
              </span>
            )}
          </Link>
        </div>
      </header>

      <h2>{categoriaNombre}</h2>

      <div className="productos">
        {productos.map((producto) => (
          <div key={producto.id} className="producto">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-img"
            />
            <h4 className="producto-nombre">{producto.nombre}</h4>
            <p className="producto-precio">${producto.precio.toFixed(2)}</p>

            <input
              type="number"
              min="1"
              max={producto.cantidad}
              value={cantidad[producto.id] || 1}
              onChange={(e) =>
                manejarCantidad(producto.id, Number(e.target.value))
              }
            />

            <button
              onClick={() => agregarAlCarrito(producto)}
              className="btn-agregar"
            >
              Agregar al carrito
            </button>

            <label
              onClick={() => setProductoDetalle(producto)}
              className="link-detalle"
            >
              Ver detalle
            </label>
          </div>
        ))}
      </div>

      {productoDetalle && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img
              src={productoDetalle.imagen}
              alt={productoDetalle.nombre}
              className="modal-img"
            />
            <h3>{productoDetalle.nombre}</h3>
            <p className="modal-detalle">{productoDetalle.detalle}</p>
            <button
              onClick={() => setProductoDetalle(null)}
              className="btn-cerrar"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Pie de página */}
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
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Monsana. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductosPorCategoria;
