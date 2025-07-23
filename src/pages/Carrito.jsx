import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "../supabase/supabaseClient";
import emailjs from "@emailjs/browser";
import "../estilos/Carrito.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );
  const [metodoEntrega, setMetodoEntrega] = useState("");
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const eliminarDelCarrito = (id) => {
    const nuevosProductos = carrito.filter((producto) => producto.id !== id);
    setCarrito(nuevosProductos);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularSubtotal = () => {
    return carrito
      .reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      )
      .toFixed(2);
  };

  const calcularTotal = () => {
    const subtotal = parseFloat(calcularSubtotal());
    const envioAdicional = metodoEntrega === "envio" ? 6 : 0;
    return (subtotal + envioAdicional).toFixed(2);
  };

  const handleChangeEnvio = (e) => {
    const { name, value } = e.target;
    setDatosEnvio({ ...datosEnvio, [name]: value });
  };

  const registrarPedido = async () => {
    const total = calcularTotal();
    const envio = metodoEntrega === "envio";

    const { error } = await supabase.from("pedidos").insert([
      {
        productos: carrito,
        total: parseFloat(total),
        metodo_entrega: metodoEntrega,
        datos_envio: envio ? datosEnvio : null,
        creado_en: new Date().toISOString(),
        estado: "pendiente",
      },
    ]);

    if (error) {
      alert("Hubo un error al registrar tu pedido.");
      console.error(error);
      return;
    }

    const templateParams = {
      email: "monsanaelcoca@gmail.com",
      nombre: envio ? datosEnvio.nombre : "Cliente",
      telefono: envio ? datosEnvio.telefono : "No aplica",
      direccion: envio ? datosEnvio.direccion : "No aplica",
      total: `$${total}`,
      productos: carrito.map((p) => `${p.nombre} x${p.cantidad}`).join(", "),
      metodo:
        metodoEntrega === "envio" ? "Envío a domicilio" : "Retiro en tienda",
    };

    try {
      await emailjs.send(
        "service_monsana",
        "template_monsana",
        templateParams,
        "UVI3Nv2t16Hnj8qOc"
      );
      console.log("Correo enviado correctamente.");
    } catch (err) {
      console.error("Error al enviar el correo:", err);
    }

    localStorage.setItem(
      "ultimoPedido",
      JSON.stringify({
        productos: carrito,
        total: total,
        metodo_entrega: metodoEntrega,
        datos_envio: envio ? datosEnvio : null,
      })
    );
    setCarrito([]);
    localStorage.removeItem("carrito");
    navigate("/gracias");
  };

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

      <div className="carrito-container">
        <div style={{ marginBottom: "20px" }}>
          <Link to="/categorias" className="volver-link">
            ← Seguir comprando
          </Link>
        </div>

        <h2>Tu Carrito de Compras</h2>

        {carrito.length === 0 ? (
          <p>El carrito está vacío. Agrega algunos productos.</p>
        ) : (
          <div className="carrito-flexbox">
            <div className="productos-carrito">
              {carrito.map((producto) => (
                <div key={producto.id} className="producto-carrito">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="producto-img"
                  />
                  <div className="producto-info">
                    <h4>{producto.nombre}</h4>
                    <p>${producto.precio.toFixed(2)}</p>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>
                      Total: ${(producto.precio * producto.cantidad).toFixed(2)}
                    </p>
                    <button
                      className="eliminar-btn"
                      onClick={() => eliminarDelCarrito(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="resumen-pedido">
              <div className="metodo-entrega">
                <h4>Método de entrega:</h4>
                <label>
                  <input
                    type="radio"
                    name="entrega"
                    value="retiro"
                    checked={metodoEntrega === "retiro"}
                    onChange={() => setMetodoEntrega("retiro")}
                  />
                  Retiro en tienda
                </label>
                <label>
                  <input
                    type="radio"
                    name="entrega"
                    value="envio"
                    checked={metodoEntrega === "envio"}
                    onChange={() => setMetodoEntrega("envio")}
                  />
                  Envío a domicilio
                </label>

                {metodoEntrega === "envio" && (
                  <div className="formulario-envio">
                    <h5>Datos para el envío:</h5>
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre completo"
                      value={datosEnvio.nombre}
                      onChange={handleChangeEnvio}
                    />
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Dirección completa"
                      value={datosEnvio.direccion}
                      onChange={handleChangeEnvio}
                    />
                    <input
                      type="tel"
                      name="telefono"
                      placeholder="Teléfono de contacto"
                      value={datosEnvio.telefono}
                      onChange={handleChangeEnvio}
                    />
                  </div>
                )}
              </div>

              <div className="total-carrito">
                <div className="totales">
                  <p><strong>Subtotal:</strong> ${calcularSubtotal()}</p>
                  {metodoEntrega === "envio" && (
                    <>
                      <p><strong>Envío:</strong> $6.00</p>
                      <p><strong>Total:</strong> ${calcularTotal()}</p>
                    </>
                  )}
                  {metodoEntrega !== "envio" && (
                    <p><strong>Total:</strong> ${calcularTotal()}</p>
                  )}
                </div>

                <button className="vaciar-carrito" onClick={vaciarCarrito}>
                  🗑️ Vaciar carrito
                </button>
              </div>

              <div className="paypal-section">
                <span className="label-pago">🛒 Pagar pedido</span>
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AdOijLy_tFMbqVCHERAN-Of0aKMvsQPfYEeKdjFesawh92E8l4-mycdOHjamHFNmhXc477zttJvO1q0r",
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: "horizontal",
                      shape: "rect",
                      tagline: false,
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: calcularTotal(),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(() => {
                        registrarPedido();
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
