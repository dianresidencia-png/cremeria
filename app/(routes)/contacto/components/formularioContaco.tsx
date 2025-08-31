import { Send } from 'lucide-react';
import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      required
      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white shadow-sm focus:ring-green-500 focus:border-green-500"
    />
  </div>
);

interface TextareaFieldProps {
  label: string;
  name: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ label, name }) => (
  <div className="sm:col-span-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      rows={4}
      required
      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white shadow-sm focus:ring-green-500 focus:border-green-500"
    />
  </div>
);

const FormularioContacto: React.FC = () => (
  <form className="transition-colors border mx-2 md:mx-10 mt-6 md:mt-20 rounded-xl p-6 shadow-lg space-y-6">
    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
      Envíanos un Mensaje
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField label="Nombre" name="nombre" />
      <InputField label="Email" name="email" type="email" />
      <InputField label="Teléfono" name="telefono" />
      <TextareaField label="Mensaje" name="mensaje" />
    </div>
    <button
      type="submit"
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
    >
      <Send className="w-5 h-5" />
      Enviar
    </button>
  </form>
);

export default FormularioContacto;