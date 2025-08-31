import { Clock } from "lucide-react";

const HistoriaCremeria = () => (
  <div className="rounded-xl shadow-lg p-6 sm:p-8 bg-white dark:bg-neutral-800 transition-colors">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Texto */}
      <div>
        <div className="flex items-center mb-4">
          <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Nuestra Historia</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Desde 2003, somos el corazón lácteo de nuestra comunidad. Iniciamos como un negocio
          familiar con la visión de ofrecer productos lácteos frescos y seguros.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Hoy somos reconocidos por nuestros estándares excepcionales de higiene y calidad
          en cada producto que ofrecemos.
        </p>
      </div>

      {/* Números */}
      <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">En Números</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">20+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Años Sirviendo</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Productos Frescos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">1000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Clientes Fieles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Higiene Garantizada</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HistoriaCremeria;