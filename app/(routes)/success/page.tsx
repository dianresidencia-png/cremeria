'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CheckCircle, Heart, Coffee } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fondo adaptable a tema */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-accent/30 dark:from-background dark:via-accent/10 dark:to-accent/20"></div>
      
      {/* Elementos decorativos flotantes - adaptables a tema */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 dark:bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-32 right-16 w-3 h-3 bg-primary/30 dark:bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-accent/25 dark:bg-accent/35 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-60 right-10 w-2 h-2 bg-accent/35 dark:bg-accent/45 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 text-foreground">
        
        {/* Imagen principal con efectos responsivos */}
        <div className="relative mb-6 transform hover:scale-105 transition-transform duration-300">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-card rounded-full p-2 shadow-2xl border border-border">
            <Image
              src="/gracias.webp"
              alt="Compra exitosa"
              width={150}
              height={150}
              className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover"
              priority
            />
          </div>
        </div>

        {/* Título responsivo */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in">
          ¡Gracias por tu compra!
        </h1>

        {/* Tarjeta de contenido responsiva */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-2xl border border-border transform hover:scale-102 transition-all duration-300 mb-6">
          <div className="space-y-3 text-center">
            <p className="text-sm sm:text-base leading-relaxed flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Tu pedido ha sido realizado con éxito. Recibirás un correo de confirmación.</span>
            </p>
            
            <p className="text-sm sm:text-base leading-relaxed flex items-start gap-2">
              <Heart className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">Nuestro equipo está preparando tus productos lácteos con mucho cariño.</span>
            </p>
          </div>
        </div>

        {/* Botón responsivo */}
        <Button 
          onClick={() => router.push('/')}
          size="lg"
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          <span className="flex items-center justify-center gap-2">
            Volver a la tienda
            <Coffee className="w-4 h-4" />
          </span>
        </Button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </main>
  )
}