"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface OC {
  nombre: string;
  apellido: string;
  sexo: string;
  edad: number;
  altura: number;
  peso: number;
  fotoUrl: string;
}

export default function FichaPersonaje() {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState<OC | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonaje = async () => {
      try {
        const res = await fetch(`/api/ocs`); // Aquí podrías filtrar por ID en el backend si quisieras
        const data = await res.json();
        const encontrado = data.find((p: any) => p._id === id);
        setPersonaje(encontrado);
      } catch (error) {
        console.error("Error al leer el archivo:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPersonaje();
  }, [id]);

  if (loading) return (
    <div className="bg-[#131313] min-h-screen flex items-center justify-center">
      <p className="text-red-600 animate-pulse tracking-[0.5em] uppercase text-xs">Abriendo Expediente...</p>
    </div>
  );

  if (!personaje) return (
    <div className="bg-[#131313] min-h-screen flex flex-col items-center justify-center">
      <p className="text-white mb-4">El sujeto no existe en este plano.</p>
      <Link href="/historial" className="text-red-500 underline uppercase text-xs">Volver al Archivo</Link>
    </div>
  );

  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen font-body relative overflow-hidden">
      {/* Estética de fondo: Sangre y Grano */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] z-0"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-900/10 blur-[100px] z-0"></div>
      
      {/* Header Navegación */}
      <header className="border-b border-red-900/20 bg-[#131313]/80 backdrop-blur-md p-6 sticky top-0 z-50 flex justify-between items-center">
        <Link href="/historial" className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors">
           <span className="text-xs uppercase tracking-widest">← Volver a la Librería</span>
        </Link>
        <h1 className="italic font-serif text-red-700 text-lg">Digital Alchemist’s Archive</h1>
      </header>

      <main className="max-w-7xl mx-auto p-8 md:p-20 relative z-10">
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">Classified / Subject #{id?.slice(-4)}</span>
          <h2 className="text-6xl md:text-8xl italic font-bold tracking-tighter text-white mt-2">
            {personaje.nombre} {personaje.apellido}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Retrato */}
          <div className="lg:col-span-5">
            <div className="relative border-2 border-neutral-900 shadow-2xl">
               <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-yellow-700/50"></div>
               <img 
                 src={personaje.fotoUrl} 
                 alt={personaje.nombre} 
                 className="w-full h-auto grayscale contrast-125 opacity-80"
               />
               <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                  <p className="text-xs italic text-yellow-600">Registro Biométrico Finalizado</p>
               </div>
            </div>
          </div>

          {/* Datos del Dossier */}
          <div className="lg:col-span-7 bg-[#1c1b1b] p-10 border border-neutral-800 relative">
            <h3 className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-10 border-b border-neutral-800 pb-4">
              Physical Manifestation Data
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-red-500/70 tracking-widest">Nombre completo</label>
                <div className="text-3xl font-serif text-white">{personaje.nombre} {personaje.apellido}</div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-red-500/70 tracking-widest">Esencia / Sexo</label>
                <div className="text-2xl text-white">{personaje.sexo}</div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-red-500/70 tracking-widest">Edad Cronológica</label>
                <div className="text-2xl text-white">{personaje.edad} ciclos</div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-red-500/70 tracking-widest">Dimensiones (Alt/Peso)</label>
                <div className="text-2xl text-white">{personaje.altura}cm / {personaje.peso}kg</div>
              </div>
            </div>

            {/* Stats de Resonancia (Barras) */}
            <div className="mt-16 space-y-8">
               <h4 className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">Arcane Resonance Stats</h4>
               <div className="space-y-4">
                  <div className="flex justify-between text-xs italic font-serif">
                    <span>Soul Resonance</span>
                    <span className="text-yellow-600">LVL {Math.floor(personaje.edad / 10)}</span>
                  </div>
                  <div className="h-1 w-full bg-black">
                    <div className="h-full bg-red-900 shadow-[0_0_15px_red]" style={{ width: '85%' }}></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}