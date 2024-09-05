import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import './stylecalendario.css';  // Asegúrate de ajustar la ruta al archivo CSS

dayjs.locale('es');

const Calendario = () => {

  const localizer = dayjsLocalizer(dayjs);

  const [modalOpen, setModalOpen] = useState(false);
  const [eventData, setEventData] = useState({

    Name: '',
    time: '',
    Subname: '',
    start: '',
    Sex: '',
    Phone: '',
    Specialty: '',
    SpecialtyDr: '',
    Cedula: ''
  });
  const [selectedDate, setSelectedDate] = useState(null); // Estado para el día seleccionado

  const handleSelectSlot = (slotInfo) => {
    const dayOfWeek = dayjs(slotInfo.start).day();
    // Evitar abrir el modal en sábados (6) y domingos (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      setEventData({
        ...eventData,
        start: dayjs(slotInfo.start).format('YYYY-MM-DD'),
        time: '', // Reseteamos la hora cuando se selecciona un nuevo día
      });
      setSelectedDate(slotInfo.start); // Establecer el día seleccionado
      setModalOpen(true); // Abrir modal cuando se hace clic en un día
    }
  };

  const handleEventChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para agregar el evento
    console.log('Event Data:', eventData);
    setModalOpen(false); // Cerrar el modal después de enviar el formulario
    setSelectedDate(null); // Restablecer el día seleccionado al cerrar el modal
  };

  const handleNavigate = (newDate, view, action) => {
    // Bloquear navegación para evitar cambiar a la vista de semana o día
    if (action === 'DATE' && (view === 'month' || view === 'week')) {
      return;
    }
  };

  const handleDrillDown = (date, view) => {
    // Prevenir el cambio de vista al hacer clic en un día
    if (view === 'day' || view === 'week') {
      return false;
    }
  };

  const dayStyleGetter = (date) => {
    const day = dayjs(date).day();
    const isSameDate = selectedDate && dayjs(date).isSame(selectedDate, 'day');

    // Deshabilitar sábado y domingo
    if (day === 0 || day === 6) {
      return {
        className: 'bg-gray-200 bg-opacity-50 text-gray-400 cursor-not-allowed ',
        style: {
          pointerEvents: 'none',
        },
      };
    }

    // Aplicar estilo especial si el día está seleccionado o en hover
    if (isSameDate) {
      return {
        className: 'bg-blue-100 bg-opacity-50 text-blue-900',
      };
    }

    // Aplicar efecto de hover
    return {
      className: 'hover:bg-blue-200 bg-opacity-50   cursor-pointer ',
    };
  };

  return (
    <div className='flex justify-center font-medium w-full content-center h-full'>
      <Calendar
        selectable={true}
        localizer={localizer}
        events={[]} // Aquí colocarías tus eventos
        onSelectSlot={handleSelectSlot} // Usar la función handleSelectSlot
        onNavigate={handleNavigate} // Agregar la función para manejar la navegación
        onDrillDown={handleDrillDown} // Evitar drill down a vista de día o semana
        dayPropGetter={dayStyleGetter} // Añadir función para estilos de días
        max={dayjs('2050-01-01T18:00:00').toDate()}
        min={dayjs('2000-01-01T08:00:00').toDate()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh', width: '100%', padding: '7px', border: '1px solid #ccc' }}
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
        }}
        className="bg-white rounded-md shadow-2xl"
      />

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 z-60">
            <h2 className="text-xl font-bold mb-4">Agendar Cita</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-5 flex justify-between">
                <div>
                  <label className=" text-gray-700 font-semibold mb-2">Nombres:</label>
                  <input
                    type="text"
                    name="Name"
                    value={eventData.Name}
                    onChange={handleEventChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2">Apellidos:</label>
                  <input
                    type="text"
                    name="Subname"
                    value={eventData.Subname}
                    onChange={handleEventChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-5 flex justify-between">
               
               <div>
                  <label className="text-gray-700 font-semibold mb-2">Numero de Cedula:</label>
                  <input
                    type="text"
                    name="Cedula"
                    value={eventData.Cedula}
                    onChange={handleEventChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className=" text-gray-700 font-semibold mb-2">Genero:</label>
                  <select
                    name="Sex"
                    onChange={handleEventChange}
                    value={eventData.Sex}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>

                  </select>
                </div>


              </div>

              <div className="mb-5">
                <label className="text-gray-700 font-semibold mb-2 block">Especialidad de la cita:</label>
                <select
                  name="Specialty"
                  value={eventData.Specialty}
                  onChange={handleEventChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-md transition duration-150 ease-in-out"
                >
                  <option value="" disabled>Selecciona una especialidad</option>
                  <option value="Psiquiatra">Psiquiatra</option>
                  <option value="Psicologo Clinico">Psicólogo Clínico</option>
                  <option value="Psicologo Industrial">Psicólogo Industrial</option>
                  <option value="Medico Internista">Médico Internista</option>
                  <option value="Medico Cirujano Ecografista">Médico Cirujano Ecografista</option>
                  <option value="Foniatria">Foniatría</option>
                  <option value="Terapeuta del Lenguaje">Terapeuta del Lenguaje</option>
                  <option value="Enfermera">Enfermera</option>
                  <option value="Traumatologia">Traumatología</option>
                  <option value="Fisiatra">Fisiatra</option>
                  <option value="Fisioterapeuta">Fisioterapeuta</option>
                  <option value="Terapeuta Ocupacional">Terapeuta Ocupacional</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="text-gray-700 font-semibold mb-2 block">Licenciado / Doctor / Especialista:</label>
                <select
                  name="SpecialtyDr"
                  value={eventData.SpecialtyDr}
                  onChange={handleEventChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <option value="" disabled>Selecciona un especialista</option>
                  <option value="Dra. Alba Montenegro">Dra. Alba Montenegro</option>
                  <option value="Dr. Jose Cedre">Dr. Jose Cedre</option>
                  <option value="Dra. Naiyethsy Urbina">Dra. Naiyethsy Urbina</option>
                  <option value="Dra. Alexis Barazarte">Dra. Alexis Barazarte</option>
                  <option value="Dra. Milena Lopez">Dra. Milena Lopez</option>
                  <option value="Dra. Susana Perez">Dra. Susana Perez</option>
                  <option value="Lic. Lisbeth Nairoby Jerez Mata">Lic. Lisbeth Nairoby Jerez Mata</option>
                  <option value="Dra. Arline Hernandez">Dra. Arline Hernandez</option>
                  <option value="Lic. Clayde Sabina Key Gamero">Lic. Clayde Sabina Key Gamero</option>
                  <option value="Dra. Adriana Perez">Dra. Adriana Perez</option>
                  <option value="Dr. Luis Bustamante">Dr. Luis Bustamante</option>
                  <option value="Dra. Nohelismar Camacho">Dra. Nohelismar Camacho</option>
                </select>
              </div>


              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Fecha de Cita:</label>
                <input
                  type="text"
                  name="start"
                  value={eventData.start}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Hora:</label>
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleEventChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                  Agregar Evento
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedDate(null); // Restablecer el día seleccionado al cerrar el modal
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
