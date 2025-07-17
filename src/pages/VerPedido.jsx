import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "../estilos/VerPedido.css";
import { useNavigate } from "react-router-dom";

const VerPedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Controla botón de carga
  const navigate = useNavigate();

  // Función para cargar todos los pedidos
  const fetchPedidos = async () => {
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .order("creado_en", { ascending: false });

    if (error) {
      console.error("Error al cargar pedidos:", error.message);
    } else {
      setPedidos(data);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const despacharPedido = async (pedido) => {
    if (!Array.isArray(pedido.productos)) return;

    try {
      setLoadingId(pedido.id); // Botón cargando

      for (const prod of pedido.productos) {
        if (!prod.id || !prod.cantidad) continue;

        const { data: productoActual, error: errorFetch } = await supabase
          .from("productos")
          .select("cantidad")
          .eq("id", prod.id)
          .single();

        if (errorFetch || !productoActual) {
          console.error(`Error al obtener producto ID ${prod.id}`, errorFetch?.message);
          continue;
        }

        const nuevoStock = productoActual.cantidad - prod.cantidad;
        const stockFinal = nuevoStock >= 0 ? nuevoStock : 0;

        const { error: errorUpdate } = await supabase
          .from("productos")
          .update({ cantidad: stockFinal })
          .eq("id", prod.id);

        if (errorUpdate) {
          console.error(`Error al actualizar producto ID ${prod.id}`, errorUpdate.message);
        }
      }

      const { error: errorPedido } = await supabase
        .from("pedidos")
        .update({ estado: "despachado" })
        .eq("id", pedido.id);

      if (errorPedido) {
        console.error(`Error al actualizar estado del pedido #${pedido.id}`, errorPedido.message);
      } else {
        alert(`Pedido #${pedido.id} despachado correctamente.`);
        await fetchPedidos(); // Recargar lista de pedidos
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Hubo un error al despachar el pedido.");
    } finally {
      setLoadingId(null); // Restablecer botón
    }
  };

  return (
    <div className="ver-pedidos-container">
      <header className="crud-header">
        <div className="logo-title">
          <img src="/logo.png" alt="Logo Monsana" className="logo" />
          <h1>Pedidos Registrados</h1>
        </div>
        <button className="volver-btn" onClick={() => navigate("/crud")}>
          Volver
        </button>
      </header>

      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <div className="pedidos-grid">
          {pedidos.map((pedido, index) => (
            <div key={pedido.id || index} className="pedido-card-mini">
              <h4>Pedido #{pedido.id}</h4>
              <p><strong>Fecha:</strong> {new Date(pedido.creado_en).toLocaleString()}</p>
              <p><strong>Total:</strong> ${parseFloat(pedido.total).toFixed(2)}</p>
              <p><strong>Entrega:</strong> {pedido.metodo_entrega}</p>

              {pedido.datos_envio && typeof pedido.datos_envio === "object" && (
                <div>
                  <p><strong>Nombre:</strong> {pedido.datos_envio.nombre}</p>
                  <p><strong>Teléfono:</strong> {pedido.datos_envio.telefono}</p>
                </div>
              )}

              <details>
                <summary>Ver productos</summary>
                <ul className="producto-lista-mini">
                  {Array.isArray(pedido.productos) &&
                    pedido.productos.map((prod, idx) => (
                      <li key={idx} className="producto-item-mini">
                        {prod.imagen && (
                          <img
                            src={prod.imagen}
                            alt={prod.nombre}
                            className="producto-imagen-mini"
                          />
                        )}
                        <div>
                          <p><strong>{prod.nombre}</strong> x{prod.cantidad}</p>
                          <p>${parseFloat(prod.precio).toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </details>

              {pedido.estado === "despachado" ? (
                <p className="etiqueta-despachado">✅ Pedido Despachado</p>
              ) : (
                <button
                  className="despachar-btn"
                  onClick={() => despacharPedido(pedido)}
                  disabled={loadingId === pedido.id}
                >
                  {loadingId === pedido.id ? "Procesando..." : "Despachar"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerPedido;
