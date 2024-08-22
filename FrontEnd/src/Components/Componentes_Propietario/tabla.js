import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
/* Añadir iconos a la libraria */
library.add(faTrash);
library.add(faPenToSquare);

const Tabla = ({ apiS }) => {
  const [currentPageMoto, setcurrentPageMoto] = useState(1);
  const [currentPageCarro, setcurrentPageCarro] = useState(1);

  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

  const recordsPerPage = 12;

  const [dataMoto, setdataMoto] = useState([]);
  const [dataCarro, setdataCarro] = useState([]);

  useEffect(() => {
    async function fetchApartamentos() {
      
      try {
        const responseMoto = await axios.get(`http://localhost:4000/${apiS}?TipoEspacio=Moto`);
        setdataMoto(responseMoto.data);
        const responseCarro = await axios.get(`http://localhost:4000/${apiS}?TipoEspacio=Carro`);
        setdataCarro(responseCarro.data);

        if ((responseMoto.data.length > 0) && (setdataCarro.data.length > 0)) {
          console.log("holle");
        } else {
          console.log("Bywe");
        }
      } catch (error) {
        console.error("Error al obtener los apartamentos:", error);
      }
    }

    fetchApartamentos();
  }, [apiS]);

  const indexOfLastRecordMoto = currentPageMoto * recordsPerPage;
  const indexOfFirstRecordMoto = indexOfLastRecordMoto - recordsPerPage;

  const indexOfLastRecordCarro = currentPageCarro * recordsPerPage;
  const indexOfFirstRecordCarro = indexOfLastRecordCarro - recordsPerPage;

  const currentRecordsMoto = dataMoto.slice(indexOfFirstRecordMoto, indexOfLastRecordMoto);
  const totalPagesMoto = Math.ceil(dataMoto.length / recordsPerPage);

  const currentRecordsCarro = dataCarro.slice(indexOfFirstRecordCarro, indexOfLastRecordCarro);
  const totalPagesCarro = Math.ceil(dataCarro.length / recordsPerPage);

  const handlePageChangeMoto = (pageNumber) => {
    setcurrentPageMoto(pageNumber);
  };

  const handlePageChangeCarro = (pageNumber) => {
    setcurrentPageCarro(pageNumber);
  };
  // Cálculo del índice de los registros actuales a mostrar
  return (
    <div className="w-100 h-100">
      <div className="card m-0 h-100">
        {apiS === "Parqueadero" ? 
          <div className="d-flex flex-row">
          <div className="px-3 w-50">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div className="d-flex flex-column border border-primary rounded-4 mt-3 justify-content-center">
              <h2 className="text-center">Moto</h2>
              <div className="d-flex flex-wrap ">
                {apiS === "Parqueadero"
                  ? currentRecordsMoto.map((record, index) => (
                      <div
                        key={index}
                        className="d-flex flex-column border border-primary rounded-4 w-25 p-2"
                      >
                        <span className="fs-3 fw-bolder">{record.NumeroEspacio}</span>
                        <button
                          type="button"
                          className="btn bg-success btn-sm p-1"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Rentar
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="card-body">
              <div
                id="example2_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <div className="row">
                  <div className="col-sm-12"></div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <div
                      className="dataTables_info"
                      id="example2_info"
                      role="status"
                      aria-live="polite"
                    >
                      Mostrando {indexOfFirstRecordMoto + 1} a{" "}
                      {indexOfLastRecordMoto > dataMoto.length
                        ? dataMoto.length
                        : indexOfLastRecordMoto}{" "}
                      de {dataMoto.length} registros
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-7">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="example2_paginate"
                    >
                      <ul className="pagination">
                        <li
                          className={`paginate_button page-item previous ${
                            currentPageMoto === 1 ? "disabled" : ""
                          }`}
                          id="example2_previous"
                        >
                          <Link
                            onClick={() => handlePageChangeMoto(currentPageMoto - 1)}
                            href="#"
                            aria-controls="example2"
                            data-dt-idx="0"
                            tabIndex="0"
                            className="page-link"
                          >
                            Anterior
                          </Link>
                        </li>
                        {[...Array(totalPagesMoto)].map((_, index) => (
                          <li
                            key={index}
                            className={`paginate_button page-item ${
                              currentPageMoto === index + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              onClick={() => handlePageChangeMoto(index + 1)}
                              className="page-link"
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`paginate_button page-item next ${
                            currentPageMoto === totalPagesMoto ? "disabled" : ""
                          }`}
                          id="example2_next"
                        >
                          <Link
                            onClick={() => handlePageChangeMoto(currentPageMoto + 1)}
                            href="#"
                            aria-controls="example2"
                            data-dt-idx="7"
                            tabIndex="0"
                            className="page-link"
                          >
                            Siguiente
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-3 w-50">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div className="d-flex flex-column border border-primary rounded-4 mt-3 justify-content-center">
              <h2 className="text-center">Carro</h2>
              <div className="d-flex flex-wrap ">
                {apiS === "Parqueadero"
                  ? currentRecordsCarro.map((record, index) => (
                      <div
                        key={index}
                        className="d-flex flex-column border border-primary rounded-4 w-25 p-2"
                      >
                        <span className="fs-3 fw-bolder">{record.NumeroEspacio}</span>
                        <button
                          type="button"
                          className="btn bg-success btn-sm p-1"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Rentar
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="card-body">
              <div
                id="example2_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <div className="row">
                  <div className="col-sm-12"></div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <div
                      className="dataTables_info"
                      id="example2_info"
                      role="status"
                      aria-live="polite"
                    >
                      Mostrando {indexOfFirstRecordCarro + 1} a{" "}
                      {indexOfLastRecordCarro > dataCarro.length
                        ? dataCarro.length
                        : indexOfLastRecordCarro}{" "}
                      de {dataCarro.length} registros
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-7">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="example2_paginate"
                    >
                      <ul className="pagination">
                        <li
                          className={`paginate_button page-item previous ${
                            currentPageCarro === 1 ? "disabled" : ""
                          }`}
                          id="example2_previous"
                        >
                          <Link
                            onClick={() => handlePageChangeCarro(currentPageCarro - 1)}
                            href="#"
                            aria-controls="example2"
                            data-dt-idx="0"
                            tabIndex="0"
                            className="page-link"
                          >
                            Anterior
                          </Link>
                        </li>
                        {[...Array(totalPagesCarro)].map((_, index) => (
                          <li
                            key={index}
                            className={`paginate_button page-item ${
                              currentPageCarro === index + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              onClick={() => handlePageChangeCarro(index + 1)}
                              className="page-link"
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`paginate_button page-item next ${
                            currentPageCarro === totalPagesCarro ? "disabled" : ""
                          }`}
                          id="example2_next"
                        >
                          <Link
                            onClick={() => handlePageChangeCarro(currentPageCarro + 1)}
                            href="#"
                            aria-controls="example2"
                            data-dt-idx="7"
                            tabIndex="0"
                            className="page-link"
                          >
                            Siguiente
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div> : 
        apiS === "SalonComunal" ? 
        meses.map((record, index) => (
          record == ["Enero", "Marzo", "Mayo","Julio","Agosto","Octubre","Diciembre"] ?
          <div key={index}>
            {record}
          </div> : <div>hola</div>
        )) :
        null
        }
      </div>
    </div>
  );
};

export default Tabla;
