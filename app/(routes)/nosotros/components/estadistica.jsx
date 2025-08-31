import React from 'react';


const EstadisticasCremeria = () => (
  <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6 rounded-xl mt-4">
    <h3 className="text-xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Nuestros Números</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <div className="text-2xl md:text-4xl font-bold text-blue-600">20+</div>
        <div className="text-sm md:text-2xl text-gray-600">Años de Experiencia</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold md:text-4xl text-green-600">500+</div>
        <div className="text-sm text-gray-600 md:text-2xl">Productos</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600 md:text-4xl">1000+</div>
        <div className="text-sm text-gray-600 md:text-2xl">Clientes</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600 md:text-4xl">100%</div>
        <div className="text-sm text-gray-600 md:text-2xl">Higiene</div>
      </div>
    </div>
  </div>
);


export default EstadisticasCremeria