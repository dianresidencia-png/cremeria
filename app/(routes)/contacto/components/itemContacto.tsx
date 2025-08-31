import React from 'react';

interface ContactoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string; 
}

const ContactoItem: React.FC<ContactoItemProps> = ({ icon, label, value, color }) => (
  <div className="text-center">
    <div className={`bg-${color}-100 dark:bg-${color}-900/30 p-4 rounded-full w-20 h-20 mx-auto mb-4`}>
      <div className={`text-${color}-600 dark:text-${color}-400 w-10 h-10 p-3` }>
        {icon}
      </div>
    </div>
    <h3 className="font-bold text-gray-800 dark:text-white mb-1">{label}</h3>
    <p className={`text-${color}-600 dark:text-${color}-400 text-sm`}>{value}</p>
  </div>
);

export default ContactoItem;