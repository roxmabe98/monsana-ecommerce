// Crud.jsx
import React, { useEffect, useState } from "react";
import "../estilos/Crud.css";
import { FaPlus, FaEdit, FaTrash, FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const Crud = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*, categorias(nombre)");
      if (error) {
        console.error("Error al cargar productos:", error.message);
      } else {
        setProductos(data);
      }
    };
    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirm) return;

    const { error } = await supabase.from("productos").delete().eq("id", id);
    if (error) {
      console.error("Error al eliminar producto:", error.message);
    } else {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="crud-container">
      <header className="crud-header">
        <div className="logo-title">
          <img src="/logo.png" alt="Logo Monsana" className="logo" />
          <h1>Monsana Admin</h1>
        </div>
        <button className="logout-btn" onClick={() => navigate("/admin")}>
          Cerrar sesión
        </button>
      </header>

      <section className="crud-content">
        <div className="crud-title-bar">
          <h2>Gestión de Productos</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="add-btn" onClick={() => navigate("/IngresarProducto")}>
              <FaPlus /> Agregar Producto
            </button>
            <button className="view-orders-btn" onClick={() => navigate("/ver-pedidos")}>
              <FaListAlt /> Mostrar Pedidos
            </button>
          </div>
        </div>

        <div className="image-banner">
          <img src="/img2.png" alt="Velas artesanales" />
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.categorias?.nombre || "Sin categoría"}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/editar-producto/${producto.id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button className="delete-btn" onClick={() => eliminarProducto(producto.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Crud;
