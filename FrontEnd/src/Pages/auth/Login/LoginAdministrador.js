import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Logins.css";
import myImg from "../../../img/logo2.png";
import axios from 'axios';

const LoginAdministrador = () => {
  const [formData, setFormData] = useState({
    Usuario: '',
    Contrasena: ''
  });
  const navigate = useNavigate(); 

  const enviar = async (e) => {
    e.preventDefault();

    try {
      // solicitud GET para obtener los datos del usuario
      const response = await axios.get(`http://localhost:4000/Users_Admin?Usuario=${formData.Usuario}`);
      
      if (response.data.length > 0) {
        const usuario = response.data[0];

        if (usuario.Contrasena === formData.Contrasena) {
          alert("Éxito al iniciar sesión");
          navigate('/MainAdmin');
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
    <div className="login-administrador">
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <img src={myImg} alt="Logo" className="logo" />
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">LOGIN ADMINISTRADOR</p>

              <form onSubmit={enviar}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    name="Usuario"
                    value={formData.Usuario}
                    onChange={handleChange}
                    required
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
                    name="Contrasena"
                    value={formData.Contrasena}
                    onChange={handleChange}
                    required
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
                      <label htmlFor="remember">Recuérdame</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-danger btn-block">
                      Ingresar
                    </button>
                  </div>
                </div>
              </form>

              <p className="mb-1">
                <Link to="/forgot-password">¿Has olvidado tu contraseña?</Link>
              </p>
              <p className="mb-0">
                ¿Desea ingresar como <Link to="/LoginPropietario">Propietario</Link> o{" "}
                <Link to="/LoginPortero">Portero</Link>?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdministrador;


