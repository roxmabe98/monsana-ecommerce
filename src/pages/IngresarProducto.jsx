import React, { useState, useEffect } from "react";
import "../estilos/IngresarProducto.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const IngresarProducto = () => {
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
    const fetchCategorias = async () => {
      const { data, error } = await supabase.from("categorias").select("*");
      if (error) {
        console.error("Error al cargar las categorías:", error.message);
      } else {
        setCategorias(data);
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen || !categoria) {
      setMensaje("Por favor ingresa un nombre para la imagen y selecciona una categoría.");
      return;
    }

    if (isNaN(precio) || isNaN(cantidad)) {
      setMensaje("Por favor ingresa valores numéricos válidos para el precio y la cantidad.");
      return;
    }

    const imageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))(\?.*)?$/i;
    if (!imageUrlRegex.test(imagen)) {
      setMensaje("Por favor ingresa una URL válida de la imagen.");
      return;
    }

    try {
      const { error: errorInsertar } = await supabase.from("productos").insert([
        {
          nombre,
          precio: parseFloat(precio),
          cantidad: parseInt(cantidad),
          detalle,
          imagen,
          categoria_id: categoria,
        },
      ]).single();

      if (errorInsertar) {
        console.error("❌ Error al insertar el producto:", errorInsertar.message);
        setMensaje("Error al guardar el producto.");
        return;
      }

      setMensaje("✅ Producto ingresado exitosamente.");
      setNombre("");
      setPrecio("");
      setCantidad("");
      setDetalle("");
      setImagen("");
      setCategoria("");
    } catch (error) {
      console.error("❌ Error inesperado:", error);
      setMensaje("Ocurrió un error inesperado. Intenta nuevamente.");
    }
  };

  return (
    <div className="producto-container">
      <div className="imagen-lateral"></div>
      <form onSubmit={handleSubmit}>
        <button className="ver-stock-btn" onClick={() => navigate("/crud")} type="button">
          Ver stock disponible
        </button>
        <h2>Ingresar Producto a Tienda</h2>

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
          placeholder="URL de la imagen"
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

        <button type="submit">Guardar Producto</button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
};

export default IngresarProducto;
