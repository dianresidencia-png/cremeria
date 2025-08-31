"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

// SVG personalizado para TikTok
const TikTokIcon = ({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M41,15.3c-2.6,0-5.1-0.8-7.2-2.3v14.1c0,7.3-5.9,13.2-13.2,13.2S7.5,34.4,7.5,27.1S13.4,13.9,20.7,13.9
      c0.4,0,0.8,0,1.2,0.1v6.8c-0.4,0-0.8-0.1-1.2-0.1c-3.6,0-6.5,2.9-6.5,6.5S17.1,33.7,20.7,33.7s6.5-2.9,6.5-6.5V6h6.8
      c0,0.4,0,0.8,0.1,1.2c0.5,3.6,3.6,6.4,7.3,6.4V15.3z" />
  </svg>
);

type IconComponent = React.ElementType;

type ContactItem = { id: number; name: string; icon: IconComponent; text: string };
type QuickLink = { id: number; name: string; label: string; href: string };
type SocialLink = { id: number; name: string; icon: IconComponent; label: string; href: string };
type LegalLink = { id: number; name: string; label: string; href: string };

const contactInfo: ContactItem[] = [
  { id: 1, name: "Ubicación", icon: MapPin, text: "Guadalajara, Jalisco, México" },
  { id: 2, name: "Teléfono", icon: Phone, text: "(33) 1234 5678" },
  { id: 3, name: "Correo", icon: Mail, text: "contacto@lahigienica.com" },
];

const quickLinks: QuickLink[] = [
  { id: 1, name: "Productos", label: "Productos", href: "/productos" },
  { id: 2, name: "Categorías", label: "Categorías", href: "/categorias" },
  { id: 3, name: "Combos", label: "Combos", href: "/combos" },
  { id: 4, name: "Nosotros", label: "Nosotros", href: "/nosotros" },
  { id: 5, name: "Contacto", label: "Contacto", href: "/contacto" },
  { id: 6, name: "Mayoreo", label: "Mayoreo", href: "/mayoreo" },
];

const socialLinksLucideOnly: SocialLink[] = [
  { id: 1, name: "Facebook", icon: Facebook, label: "Facebook", href: "https://www.facebook.com/lahigienica" },
  { id: 2, name: "Instagram", icon: Instagram, label: "Instagram", href: "https://www.instagram.com/lahigienica" },
  { id: 3, name: "YouTube", icon: Youtube, label: "YouTube", href: "https://www.youtube.com/" },
];

const socialLinksWithTikTok: SocialLink[] = [
  { id: 1, name: "Facebook", icon: Facebook, label: "Facebook", href: "https://www.facebook.com/lahigienica" },
  { id: 2, name: "Instagram", icon: Instagram, label: "Instagram", href: "https://www.instagram.com/lahigienica" },
  { id: 3, name: "TikTok", icon: TikTokIcon as IconComponent, label: "TikTok", href: "https://www.tiktok.com/@lahigienica" },
];

const legalLinks: LegalLink[] = [
  { id: 1, name: "Política de Privacidad", label: "Política de Privacidad", href: "/politica-de-privacidad" },
  { id: 2, name: "Términos y Condiciones", label: "Términos y Condiciones", href: "/terminos-y-condiciones" },
  { id: 3, name: "Aviso de Cookies", label: "Aviso de Cookies", href: "/aviso-de-cookies" },
  { id: 4, name: "Aviso Legal", label: "Aviso Legal", href: "/aviso-legal" },
];

const Footer = ({ useTikTok = true }: { useTikTok?: boolean }) => {
  const socials = useTikTok ? socialLinksWithTikTok : socialLinksLucideOnly;

  return (
    <footer className="mt-8 bg-background text-foreground transition-colors">
      <div className="w-full max-w-screen-xl mx-auto px-6 py-8 ">
        {/* Encabezado */}
        <div className="sm:flex sm:items-center sm:justify-between border-b border-border pb-6 mb-6">
          <p className="text-lg">
            <span className="font-bold text-primary">La Higiénica</span> – Tradición que alimenta
          </p>
          <p className="text-sm text-muted-foreground">
            Desde 1962 ofreciendo productos frescos y de calidad
          </p>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-3">Contacto</h3>
            <ul className="space-y-2">
              {contactInfo.map(({ id, icon: Icon, text, name }) => (
                <li key={id} className="flex items-center gap-2">
                  <Icon size={18} aria-label={name} /> {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-semibold mb-3">Enlaces</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ id, label, href, name }) => (
                <li key={id}>
                  <a
                    href={href}
                    aria-label={name}
                    className="hover:underline hover:text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="font-semibold mb-3">Síguenos</h3>
            <ul className="space-y-2">
              {socials.map(({ id, icon: Icon, label, href, name }) => (
                <li key={id}>
                  <a
                    href={href}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline hover:text-primary"
                  >
                    <Icon size={18} /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legales */}
          <div>
            <h3 className="font-semibold mb-3">Legales</h3>
            <ul className="space-y-2">
              {legalLinks.map(({ id, label, href, name }) => (
                <li key={id}>
                  <a
                    href={href}
                    aria-label={name}
                    className="hover:underline hover:text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separador visual */}
        <Separator className="my-6" />

        {/* Derechos */}
        <div className="text-center text-sm text-muted-foreground">
          &copy; Diana by team 3.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
