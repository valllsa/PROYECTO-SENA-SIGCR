import React, { useState, useEffect } from 'react';
import './Calendario.css';
import axios from 'axios';

const Calendario = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    numeroDocumento: '',
    telefono: '',
    codigoVivienda: '',
    horaInicio: '',
    horaFin: '',
    motivo: ''
  });
  const [reservas, setReservas] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState({});

  useEffect(() => {
    const fetchPropietario = async () => {
      try {
        const propietarioId = localStorage.getItem('propietarioId');
        if (propietarioId) {
          const response = await axios.get(`http://localhost:4000/Propietarios/${propietarioId}`);
          setUsuarioActual(response.data);
          setFormData({
            nombre: response.data.Nombre,
            numeroDocumento: response.data.NumeroDocumento,
            telefono: response.data.Teléfono,
            codigoVivienda: response.data.CodigoVivienda,
            horaInicio: '',
            horaFin: '',
            motivo: ''
          });
        }
      } catch (error) {
        console.error('Error al obtener los datos del propietario', error);
      }
    };
    fetchPropietario();
  }, []);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/ReservaSalon');
        const formattedReservas = response.data.map(res => ({
          ...res,
          Fecha: new Date(res.Fecha).toISOString().split('T')[0]
        }));
        setReservas(formattedReservas);
      } catch (error) {
        console.error('Error al obtener las reservas', error);
      }
    };
    fetchReservas();
  }, [currentMonth, currentYear]);

  const handleDayClick = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const existingReservation = reservas.some(res => res.Fecha === selectedDate);

    if (existingReservation) {
      alert('Este día ya está reservado.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/ReservaSalon', {
        ...formData,
        Fecha: selectedDate,
        NumeroDocumento: usuarioActual.NumeroDocumento
      });

      setReservas(prevReservas => [...prevReservas, {
        ...response.data,
        Fecha: new Date(response.data.Fecha).toISOString().split('T')[0]
      }]);

      handleModalClose();
      alert('Reserva realizada con éxito!');
    } catch (error) {
      console.error('Error detallado:', error);
      alert(`Error al realizar la reserva: ${error.response?.data.message || 'Por favor, intente de nuevo.'}`);
    }
  };

  const getDayStatus = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const reservasEnFecha = reservas.filter(res => res.Fecha === dateStr);
    if (reservasEnFecha.length > 0) {
      return reservasEnFecha.some(res => res.NumeroDocumento === usuarioActual.NumeroDocumento) ? 'green' : 'red';
    }
    return 'default';
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const generateDaysArray = (month, year) => Array.from({ length: daysInMonth(month, year) }, (_, i) => i + 1);

  const days = generateDaysArray(currentMonth, currentYear);
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="calendario-container">
      <div className="calendario-nav">
        <button onClick={() => setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1))}>
          Anterior
        </button>
        <h3 className="calendario-header">{meses[currentMonth]} {currentYear}</h3>
        <button onClick={() => setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1))}>
          Siguiente
        </button>
      </div>
      <div className="calendario-grid">
        {days.map(day => (
          <div
            key={day}
            className={`calendario-day ${getDayStatus(day)}`}
            onClick={() => getDayStatus(day) !== 'red' && handleDayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="calendario-modal-overlay">
          <div className="calendario-modal-content">
            <h2>Reservar para el {selectedDate}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="numeroDocumento">Número de Documento:</label>
                <input type="text" id="numeroDocumento" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="codigoVivienda">Código de Vivienda:</label>
                <input type="text" id="codigoVivienda" name="codigoVivienda" value={formData.codigoVivienda} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="horaInicio">Hora de Inicio:</label>
                <input type="time" id="horaInicio" name="horaInicio" value={formData.horaInicio} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="horaFin">Hora de Fin:</label>
                <input type="time" id="horaFin" name="horaFin" value={formData.horaFin} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="motivo">Motivo de la Reserva:</label>
                <textarea id="motivo" name="motivo" rows="3" value={formData.motivo} onChange={handleChange} required />
              </div>

              <div className="modal-buttons">
                <button type="submit">Reservar</button>
                <button type="button" onClick={handleModalClose}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
