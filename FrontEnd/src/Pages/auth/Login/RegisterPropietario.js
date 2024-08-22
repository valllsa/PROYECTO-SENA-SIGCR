import React from 'react';
import { Link } from 'react-router-dom';
import './Logins.css';
import myImg from "../../../img/logo2.png";

const RegisterPropietario = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <img src={myImg} alt="Logo" className="logo" />
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">REGISTER PROPIETARIO</p>
            <form className="" action="VistaPropietario">
              <div className="mb-2">
                <input
                  type="text"
                  className="input-group form-control"
                  placeholder="Nombre"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="input-group form-control"
                  placeholder="Apellido"
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  className="input-group form-control"
                  placeholder="Numero Documento"
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  className="input-group form-control"
                  placeholder="Numero Telefonico"
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  className="input-group form-control"
                  placeholder="Correo Elecctronico"
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  className="input-group form-control"
                  placeholder="Codigo de Vivienda"
                />
              </div>
              <div>
                <p>
                  Adjuntar Foto del Contrato de Propiedad o Certificado de
                  Tradicion y Libertad
                </p>
                <input
                  type="file"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                />
              </div>

              <div>
                <div>
                  <button type="submit" className="btn btn-success btn-block">
                    Crear Cuenta
                  </button>
                </div>
              </div>
            </form>
            <hr className="hr-line" />
            <p className=" mb-0">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/LoginPropietario" className="text-center">
                Iniciar Sesion
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

export default RegisterPropietario;
