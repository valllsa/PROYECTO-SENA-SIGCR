import { useState, useEffect } from "react";
import axios from "axios"
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Logins.css";
import myImg from "../../../img/logo2.png";
import { NavBar } from "../../../Components/Componentes_Propietario/navBar";

const LoginPropietario = () => {
  const [formData, setFormData] = useState({
    User: '',
    Pass: ''
  });

  const navigate = useNavigate(); 

  const enviar = async (e) => {
    e.preventDefault();

  try {
    // solicitud GET para obtener los datos del usuario
    const response = await axios.get(`http://localhost:4000/Propietarios?User=${formData.User}`);
    
    if (response.data.length > 0) {
      const usuario = response.data[0];

      if (usuario.Pass === formData.Pass) {
        alert("Éxito al iniciar sesión");
         navigate('/MainPropietario')
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Usuario no encontrado");
    }
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al intentar iniciar sesión");
  }
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <img src={myImg} alt="Logo" className="logo" />
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">LOGIN PROPIETARIO</p>

            <form onSubmit={enviar}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario"
                  name="User"
                  required
                  value={formData.User}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="Pass"
                  required
                  value={formData.Pass}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Recuerdame</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-success btn-block">
                    Ingresar
                  </button>
                </div>
              </div>
            </form>

            <p className="mb-1">
              <Link to="/forgot-password">¿Has olvidado tu contraseña?</Link>
            </p>
            <hr className="hr-line" />
            <p className="mb-0">
              ¿No tienes una cuenta?{" "}
              <Link to="/RegisterPropieterio" className="text-center">
                Crear cuenta
              </Link>
            </p>
            <p className="mb-0">
              ¿Desea ingresar como <Link to="/LoginPortero">Portero</Link> o{" "}
              <Link to="/LoginAdministrador">Administrador</Link>?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPropietario;
