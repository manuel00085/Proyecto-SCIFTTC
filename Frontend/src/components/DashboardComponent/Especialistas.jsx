import React from 'react';

const specialists = [
  { name: 'Dra. Alba Montenegro', specialty: 'Psiquiatra' },
  { name: 'Dr. Jose Cedre', specialty: 'Medico Cirujano' },
  { name: 'Dra. Naiyethsy Urbina', specialty: 'Psicólogo Clínico' },
  { name: 'Dra. Alexis Barazarte', specialty: 'Fisioterapeuta' },
  { name: 'Dra. Milena Lopez', specialty: 'Medico Internista' },
  { name: 'Dra. Susana Perez', specialty: 'Psicólogo Industrial' },
  { name: 'Lic. Lisbeth Nairoby Jerez Mata', specialty: 'Enfermera' },
  { name: 'Dra. Arline Hernandez', specialty: 'Traumatología' },
  { name: 'Lic. Clayde Sabina Key Gamero', specialty: 'Foniatría' },
  { name: 'Dra. Adriana Perez', specialty: 'Fisiatra' },
  { name: 'Dr. Luis Bustamante', specialty: 'Terapeuta del Lenguaje' },
  { name: 'Dra. Nohelismar Camacho', specialty: 'Terapeuta Ocupacional' },
];

const SpecialistList = () => {


  const handleFormSubmit = (e) => {
    e.preventDefault();
    // manejar logica del evento 
    console.log('Event Data:', eventData);
    setModalOpen(false); 
    setSelectedDate(null); 
  };


  return (
    <div className="max-w-screen-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className='flex justify-between '>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista de Especialistas</h2>
      <button type="submit" className="bg-green-500 text-white p-3 rounded-md ">
                  Nuevo
                </button>
        
      </div>
      
      <ul className="divide-y divide-gray-200 p-3">
        {specialists.map((specialist, index) => (
          <li key={index} className="py-3 flex justify-between items-center group hover:bg-gray-200 p-2"> {/* Añadido 'group' aquí */}
            <div className="flex items-center">
              {/* Información del especialista */}
              <p className="text-gray-900 font-semibold mr-4">{specialist.name}</p>
              <p className="text-gray-500 text-sm">{specialist.specialty}</p>
            </div>
            <div className="hidden group-hover:flex space-x-2"> {/* Cambiado a 'group-hover' */}
              {/* Opciones de Editar y Eliminar (ocultas inicialmente) */}
              <button className="text-blue-500 hover:text-blue-700">Editar</button>
              <button className="text-red-500 hover:text-red-700">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      

    </div>

    
  );
};
export default SpecialistList;
