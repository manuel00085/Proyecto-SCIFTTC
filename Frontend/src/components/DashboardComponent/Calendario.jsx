import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const Calendario = () => {
  const localizer = dayjsLocalizer(dayjs);

  const [modalOpen, setModalOpen] = useState(false);
  const [eventData, setEventData] = useState({ title: '', start: '', time: '' });

  const handleSelectSlot = (slotInfo) => {
    const dayOfWeek = dayjs(slotInfo.start).day();
    // Evitar abrir el modal en sábados (6) y domingos (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      setEventData({
        ...eventData,
        start: dayjs(slotInfo.start).format('YYYY-MM-DD'),
        time: '', // Reseteamos la hora cuando se selecciona un nuevo día
      });
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
  };

  return (
    < >
          <Calendar 
        selectable={true}
        localizer={localizer}
        events={[]} // Aquí colocarías tus eventos
        onSelectSlot={handleSelectSlot} // Usar la función handleSelectSlot
        max={dayjs('2050-01-01T18:00:00').toDate()}
        min={dayjs('2000-01-01T08:00:00').toDate()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '70vh', width: '100%' }}
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
        }}
        className="bg-white shadow-md rounded-md relative"
        dayPropGetter={(date) => {
          const day = dayjs(date).day();
          // Si es sábado o domingo, deshabilitar el día
          if (day === 0 || day === 6) {
            return {
              className: 'bg-gray-200 text-gray-400 cursor-not-allowed',
              style: {
                pointerEvents: 'none',
              },
            };
          }
          return {};
        }}
      />

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-60">
            <h2 className="text-xl font-bold mb-4">Nueva Cita</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Título:</label>
                <input
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleEventChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  onClick={() => setModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
    </>

  );
};

export default Calendario;

