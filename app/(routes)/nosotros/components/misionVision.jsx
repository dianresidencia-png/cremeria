import React from "react";
import { Heart, Award } from "lucide-react";

const Mision = () => {
  return (
    <div className="space-y-6 mt-6 md:mt-14">
      {/* Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Misión */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg transition-colors">
          <div className="flex items-center mb-4">
            <Heart className="w-8 h-8 text-red-500 dark:text-red-400 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Nuestra Misión</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Proporcionar a nuestros clientes productos lácteos de la más alta calidad,
            manteniendo estándares excepcionales de higiene y frescura. Nos comprometemos
            a ser un aliado confiable para las familias, ofreciendo productos nutritivos
            y seguros para su consumo diario.
          </p>
        </div>

        {/* Visión */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg transition-colors">
          <div className="flex items-center mb-4">
            <Award className="w-8 h-8 text-blue-500 dark:text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Nuestra Visión</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Ser la cremería líder en la región, reconocida por nuestros estándares
            excepcionales de higiene, calidad y servicio al cliente. Aspiramos a
            expandir nuestra presencia manteniendo siempre nuestros valores familiares
            y el compromiso con la seguridad alimentaria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mision;