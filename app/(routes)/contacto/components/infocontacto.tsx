import ContactoItem from './itemContacto';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

const InfoContacto = () => (
  <section className="transition-colors rounded-xl p-6 shadow-lg">
    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
      Contacta con Nosotros
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
      <ContactoItem icon={<Phone />} label="Teléfono" value="+52 33 1234-5678" color="blue" />
      <ContactoItem icon={<MessageCircle />} label="WhatsApp" value="+52 33 1234-5678" color="green" />
      <ContactoItem icon={<Mail />} label="Email" value="contacto@lahigienica.mx" color="gray" />
      <ContactoItem icon={<MapPin />} label="Ubicación" value="Guadalajara, Jalisco" color="red" />
    </div>
  </section>
);


export default InfoContacto;