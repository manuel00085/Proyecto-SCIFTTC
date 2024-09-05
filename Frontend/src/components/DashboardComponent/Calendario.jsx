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
  const [eventData, setEventData] = useState({  Name: '', time: '', Subname: '', start: '', Sex: '', Phone: '', Specialty: '' });
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
        className: 'bg-gray-200 text-gray-400 cursor-not-allowed',
        style: {
          pointerEvents: 'none',
        },
      };
    }

    // Aplicar estilo especial si el día está seleccionado o en hover
    if (isSameDate) {
      return {
        className: 'bg-blue-100 text-blue-900',
      };
    }

    // Aplicar efecto de hover
    return {
      className: 'hover:bg-blue-200 cursor-pointer',
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
          style={{ height: '80vh', width: '100%', padding: '7px',  border: '1px solid #ccc',  }}
          messages={{
            next: 'Siguiente',
            previous: 'Anterior',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',

          }}
          className="bg-white rounded-md  shadow-2xl "
        />

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 z-60">
              <h2 className="text-xl font-bold mb-4">Agendar Cita</h2>
              <form onSubmit={handleFormSubmit}>

                <div className="mb-5 flex justify-between	">
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

                <div className="mb-5 flex justify-between	">
                  <div>
                  <label className=" text-gray-700 font-semibold mb-2">Genero:</label>
                 <select 
                    name="Sex" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={eventData.Sex="Masculino"}>Masculino</option>
                      <option value={eventData.Sex="Femenino"}>Femenino</option>

                 </select>
                  </div>

                  <div>
                  <label className="text-gray-700 font-semibold mb-2">Numero de Telefono:</label>
                  <input
                    type="phone"
                    name="Phone"
                    value={eventData.Phone}
                    onChange={handleEventChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  </div>
         
                </div>

                <div className='mb-5'>
                  <label className=" text-gray-700 font-semibold mb-2">Especialidad de la cita:</label>
                 <select 
                    name="Specialty" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={eventData.Specialty="Psiquiatra"}>Psiquiatra</option>
                      <option value={eventData.Specialty="Psicologo Clinico"}>Psicologo Clinico</option>
                      <option value={eventData.Specialty="Psicologo Industrial"}>Psicologo Industrial</option>
                      <option value={eventData.Specialty="Medico Internista"}>Medico Internista</option>
                      <option value={eventData.Specialty="Medico Cirujano Ecografista"}>Medico Cirujano Ecografista</option>
                      <option value={eventData.Specialty="Foniatria"}>Foniatria</option>
                      <option value={eventData.Specialty="Terapeuta del Lenguaje"}>Terapeuta del Lenguaje</option>
                      <option value={eventData.Specialty="Enfermera"}>Enfermera</option>
                      <option value={eventData.Specialty="Traumatologia"}>Traumatologia</option>
                      <option value={eventData.Specialty="Fisiatra"}>Fisiatra</option>
                      <option value={eventData.Specialty="Fisioterapeuta"}>Fisioterapeuta</option>
                      <option value={eventData.Specialty="Terapeuta Ocupacional"}>Terapeuta Ocupacional</option>
                     

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
