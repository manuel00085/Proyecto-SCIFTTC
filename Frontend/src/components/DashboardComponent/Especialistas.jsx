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
  return (
    <div className="max-w-screen-2xl  mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista de Especialistas</h2>
      <ul className="divide-y divide-gray-200">
        {specialists.map((specialist, index) => (
          <li key={index} className="py-3 flex justify-between items-center">
            <div>
              <p className="text-gray-900 font-semibold">{specialist.name}</p>
              <p className="text-gray-500 text-sm">{specialist.specialty}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialistList;
