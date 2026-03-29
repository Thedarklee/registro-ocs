"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface OC {
  _id: string;
  nombre: string;
  apellido: string;
  sexo: string;
  edad: number;
  altura: number;
  peso: number;
  fotoUrl: string;
}

export default function HistorialArchivos() {
  const [personajes, setPersonajes] = useState<OC[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchOCs = async () => {
      try {
        const res = await fetch("/api/ocs");
        const data = await res.json();
        
        // Verificamos si la data es realmente una lista
        if (Array.isArray(data)) {
          setPersonajes(data);
        } else {
          console.error("La API no devolvió una lista, devolvió esto:", data);
          setPersonajes([]); // Si no es lista, la dejamos vacía para que no explote
        }
      } catch (error) {
        console.error("Error al invocar los archivos:", error);
        setPersonajes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOCs();
  }, []);
  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen font-sans selection:bg-red-900/50">
      {/* Overlay de grano sutil */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

      <div className="flex flex-col md:flex-row min-h-screen relative z-10">
        
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-[#0e0e0e] border-r border-red-900/20 p-8 sticky top-0 h-screen">
          <div className="mb-12">
            <h1 className="text-xl text-yellow-600 italic font-serif">The Archive</h1>
            <p className="text-[10px] uppercase tracking-widest text-neutral-600">Modern Grimoire v1.0</p>
          </div>
          <nav className="flex-1 space-y-6">
            <Link href="/" className="flex items-center gap-4 text-neutral-500 hover:text-red-400 transition-colors uppercase text-xs tracking-widest">
              <span>Grimoire</span>
            </Link>
            <Link href="/historial" className="flex items-center gap-4 text-yellow-500 border-l-2 border-yellow-500 pl-4 uppercase text-xs tracking-widest">
              <span>Archives</span>
            </Link>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-8 lg:p-12">
          <header className="mb-16 max-w-4xl">
            <h2 className="text-5xl lg:text-7xl mb-4 tracking-tighter font-serif text-white">Archival Dossiers</h2>
            <p className="text-xs text-purple-400 uppercase tracking-[0.3em]">Registry of Transcendent Beings • Sector IV-G</p>
            <div className="h-1 w-24 bg-gradient-to-r from-red-900 to-transparent mt-8"></div>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-neutral-800">
              <p className="text-yellow-600 animate-pulse tracking-widest uppercase text-xs">Decodificando Esencias...</p>
            </div>
          ) : personajes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-neutral-800">
              <p className="text-neutral-500 tracking-widest uppercase text-xs">No se han encontrado registros en este sector.</p>
              <Link href="/" className="mt-4 text-red-500 hover:underline text-xs uppercase tracking-widest">Iniciar nuevo ritual de registro</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {personajes.map((oc) => (
                <div key={oc._id} className="group relative bg-[#1c1b1b] border-t-2 border-yellow-900/20 shadow-2xl transition-all duration-500 hover:shadow-red-900/20 border border-neutral-900">
                  
                  {/* Imagen con estilo místico */}
                  <div className="aspect-[3/4] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img 
                      src={oc.fotoUrl} 
                      alt={oc.nombre} 
                      className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-transparent to-transparent opacity-90"></div>
                  </div>

                  {/* Info del OC */}
                  <div className="p-8 relative -mt-20 z-10 bg-[#1c1b1b]/90 backdrop-blur-sm">
                    <h3 className="text-3xl text-white font-serif">{oc.nombre} {oc.apellido}</h3>
                    <p className="text-[10px] text-yellow-600 tracking-widest uppercase mt-1 mb-4">
                      Clasificación: {oc.sexo}
                    </p>

                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase text-neutral-500 tracking-tighter">Potencia Arcana (Edad)</span>
                        <div className="w-24 h-1 bg-neutral-800 relative">
                          <div 
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-900 to-purple-900" 
                            style={{ width: `${Math.min(oc.edad, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* El Sello de Lacre (Botón de Ver) */}
                    <Link href={`/personaje/${oc._id}`}>
                      <button className="bg-red-900 hover:bg-red-700 text-white w-20 h-20 absolute -bottom-4 -right-4 flex flex-col items-center justify-center transition-all duration-300 active:scale-90 shadow-lg shadow-black/50 group-hover:rotate-12" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                        <span className="text-[10px] leading-tight text-center italic font-serif">Ver<br/>Expediente</span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}