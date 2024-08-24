import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

/* Añadir iconos a la libreria */
library.add(faTrash, faPenToSquare);

const Tabla = ({ apiS }) => {
  const [currentPageMoto, setCurrentPageMoto] = useState(1);
  const [currentPageCarro, setCurrentPageCarro] = useState(1);

  const recordsPerPage = 12;

  const [dataMoto, setDataMoto] = useState([]);
  const [dataCarro, setDataCarro] = useState([]);

  useEffect(() => {
    async function fetchApartamentos() {
      try {
        const responseMoto = await axios.get(`http://localhost:4000/${apiS}?TipoEspacio=Moto`);
        setDataMoto(responseMoto.data);
        const responseCarro = await axios.get(`http://localhost:4000/${apiS}?TipoEspacio=Carro`);
        setDataCarro(responseCarro.data);

        if (responseMoto.data.length > 0 && responseCarro.data.length > 0) {
          console.log("Datos cargados");
        } else {
          console.log("No se encontraron datos");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    fetchApartamentos();
  }, [apiS]);

  const indexOfLastRecordMoto = currentPageMoto * recordsPerPage;
  const indexOfFirstRecordMoto = indexOfLastRecordMoto - recordsPerPage;

  const indexOfLastRecordCarro = currentPageCarro * recordsPerPage;
  const indexOfFirstRecordCarro = indexOfLastRecordCarro - recordsPerPage;

  const currentRecordsMoto = dataMoto.filter(record => record.Estado === 'Disponible')
    .slice(indexOfFirstRecordMoto, indexOfLastRecordMoto);
  const totalPagesMoto = Math.ceil(dataMoto.filter(record => record.Estado === 'Disponible').length / recordsPerPage);

  const currentRecordsCarro = dataCarro.filter(record => record.Estado === 'Disponible')
    .slice(indexOfFirstRecordCarro, indexOfLastRecordCarro);
  const totalPagesCarro = Math.ceil(dataCarro.filter(record => record.Estado === 'Disponible').length / recordsPerPage);

  const handlePageChangeMoto = (pageNumber) => {
    setCurrentPageMoto(pageNumber);
  };

  const handlePageChangeCarro = (pageNumber) => {
    setCurrentPageCarro(pageNumber);
  };

  const rentSpace = async (spaceId, tipoEspacio) => {
    try {
      // solicitud path para actualizacion de el estado 
      await axios.patch(`http://localhost:4000/${apiS}/${spaceId}`, { Estado: 'Ocupado' });
  
  
      if (tipoEspacio === 'Moto') {
        setDataMoto(prevData => prevData.map(item => 
          item.id === spaceId ? { ...item, Estado: 'Ocupado' } : item
        ));
      } else {
        setDataCarro(prevData => prevData.map(item => 
          item.id === spaceId ? { ...item, Estado: 'Ocupado' } : item
        ));
      }
  
      
      alert("Usted rentó un espacio de parqueadero exitosamente");
    } catch (error) {
      console.error("Error al rentar el espacio:", error);
    }
  };
  
  return (
    <div className="w-100 h-100">
      <div className="card m-0 h-100">
        {apiS === "Parqueadero" ? (
          <div className="d-flex flex-row">
            <div className="px-3 w-50">
              {/* Moto */}
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Buscar"
                />
                <button className="btn btn-outline-success" type="submit">
                  Buscar
                </button>
              </form>
              <h2 className="text-center">Moto</h2>
              <div className="d-flex flex-wrap mt-3">
                {currentRecordsMoto.map((record, index) => (
                  <div key={index} className="d-flex flex-column border border-primary rounded-4 w-25 p-2">
                    <span className="fs-3 fw-bolder">{record.NumeroEspacio}</span>
                    <button
                      type="button"
                      className="btn bg-success btn-sm p-1"
                      onClick={() => rentSpace(record.id, 'Moto')}
                    >
                      Rentar
                    </button>
                  </div>
                ))}
              </div>
              <div className="card-body">
                <div className="dataTables_wrapper dt-bootstrap4">
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div
                        className="dataTables_info"
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
                      <div className="dataTables_paginate paging_simple_numbers">
                        <ul className="pagination">
                          <li className={`paginate_button page-item previous ${currentPageMoto === 1 ? "disabled" : ""}`}>
                            <Link onClick={() => handlePageChangeMoto(currentPageMoto - 1)} href="#" className="page-link">
                              Anterior
                            </Link>
                          </li>
                          {[...Array(totalPagesMoto)].map((_, index) => (
                            <li key={index} className={`paginate_button page-item ${currentPageMoto === index + 1 ? "active" : ""}`}>
                              <button onClick={() => handlePageChangeMoto(index + 1)} className="page-link">
                                {index + 1}
                              </button>
                            </li>
                          ))}
                          <li className={`paginate_button page-item next ${currentPageMoto === totalPagesMoto ? "disabled" : ""}`}>
                            <Link onClick={() => handlePageChangeMoto(currentPageMoto + 1)} href="#" className="page-link">
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
              {/* Carro */}
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Buscar"
                />
                <button className="btn btn-outline-success" type="submit">
                  Buscar
                </button>
              </form>
              <h2 className="text-center mt-3">Carro</h2>
              <div className="d-flex flex-wrap">
                {currentRecordsCarro.map((record, index) => (
                  <div key={index} className="d-flex flex-column border border-primary rounded-4 w-25 p-2">
                    <span className="fs-3 fw-bolder">{record.NumeroEspacio}</span>
                    <button
                      type="button"
                      className="btn bg-success btn-sm p-1"
                      onClick={() => rentSpace(record.id, 'Carro')}
                    >
                      Rentar
                    </button>
                  </div>
                ))}
              </div>
              <div className="card-body">
                <div className="dataTables_wrapper dt-bootstrap4">
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div
                        className="dataTables_info"
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
                      <div className="dataTables_paginate paging_simple_numbers">
                        <ul className="pagination">
                          <li className={`paginate_button page-item previous ${currentPageCarro === 1 ? "disabled" : ""}`}>
                            <Link onClick={() => handlePageChangeCarro(currentPageCarro - 1)} href="#" className="page-link">
                              Anterior
                            </Link>
                          </li>
                          {[...Array(totalPagesCarro)].map((_, index) => (
                            <li key={index} className={`paginate_button page-item ${currentPageCarro === index + 1 ? "active" : ""}`}>
                              <button onClick={() => handlePageChangeCarro(index + 1)} className="page-link">
                                {index + 1}
                              </button>
                            </li>
                          ))}
                          <li className={`paginate_button page-item next ${currentPageCarro === totalPagesCarro ? "disabled" : ""}`}>
                            <Link onClick={() => handlePageChangeCarro(currentPageCarro + 1)} href="#" className="page-link">
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
          </div>
        ) : (
          <div>Componente no compatible</div>
        )}
      </div>
    </div>
  );
};

export default Tabla;
