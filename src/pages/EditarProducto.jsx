import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import "../estilos/EditarProducto.css";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [detalle, setDetalle] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error al obtener producto:", error.message);
        setMensaje("Error al cargar el producto.");
      } else {
        setNombre(data.nombre);
        setPrecio(data.precio);
        setCantidad(data.cantidad);
        setDetalle(data.detalle);
        setImagen(data.imagen);
        setCategoria(data.categoria_id);
      }
    };

    const fetchCategorias = async () => {
      const { data, error } = await supabase.from("categorias").select("*");
      if (error) {
        console.error("Error al cargar categorías:", error.message);
      } else {
        setCategorias(data);
      }
    };

    fetchProducto();
    fetchCategorias();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!imagen || !categoria) {
      setMensaje("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (isNaN(precio) || isNaN(cantidad)) {
      setMensaje("Precio y cantidad deben ser valores numéricos válidos.");
      return;
    }

    const imageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))(\?.*)?$/i;
    if (!imageUrlRegex.test(imagen)) {
      setMensaje("Por favor ingresa una URL válida para la imagen.");
      return;
    }

    const { error } = await supabase
      .from("productos")
      .update({
        nombre,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
        detalle,
        imagen,
        categoria_id: categoria,
      })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar producto:", error.message);
      setMensaje("No se pudo actualizar el producto.");
    } else {
      setMensaje("✅ Producto actualizado correctamente.");
      setTimeout(() => navigate("/crud"), 1500);
    }
  };

  return (
    <div className="producto-container">
      <div className="header-bar">
        <img src="/logo.png" alt="Logo" className="logo" />
        <button className="ver-stock-btn" onClick={() => navigate("/crud")}>
          Ver stock disponible
        </button>
      </div>

      <h2>Editar Producto</h2>
      <form onSubmit={handleUpdate}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Precio:</label>
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <label>Cantidad:</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />

        <label>Detalle:</label>
        <textarea
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          required
        ></textarea>

        <label>Imagen (URL):</label>
        <input
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />

        <label>Categoría:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <button type="submit">Actualizar Producto</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default EditarProducto;
