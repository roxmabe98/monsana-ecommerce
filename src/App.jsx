import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './estilos/App.css';

// Páginas
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import Personalizado from './pages/Personalizado';
import SobreMonsana from './pages/SobreMonsana';
import Login from './pages/Login';
import Registro from './pages/Registro';
import IngresarProducto from './pages/IngresarProducto';
import Categorias from './pages/Categorias';
import ProductosPorCategoria from './pages/ProductosPorCategoria';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';
import Crud from './pages/Crud';
import EditarProducto from "./pages/EditarProducto";
import Gracias from "./pages/Gracias"; 
import VerPedido from "./pages/VerPedido"; 
import Restablecer from "./pages/Restablecer"; 
import Recuperar from "./pages/Recuperar";

const App = () => (
  <Router>
    {/* Contenedor de notificaciones visible en todas las rutas */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/personalizado" element={<Personalizado />} />
      <Route path="/sobre-monsana" element={<SobreMonsana />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/ingresarproducto" element={<IngresarProducto />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/categorias/:id" element={<ProductosPorCategoria />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/crud" element={<Crud />} />
      <Route path="/editar-producto/:id" element={<EditarProducto />} />
      <Route path="/gracias" element={<Gracias />} /> 
      <Route path="/ver-pedidos" element={<VerPedido />} /> 
      <Route path="/restablecer" element={<Restablecer />} /> 
      <Route path="/recuperar" element={<Recuperar />} /> 
    </Routes>
  </Router>
);

export default App;
