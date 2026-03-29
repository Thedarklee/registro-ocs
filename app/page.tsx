"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#0e0e0e] text-[#e5e2e1] min-h-screen flex flex-col items-center justify-center font-body relative overflow-hidden">
      {/* Fondo con textura de pergamino oscuro y humo */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/5 blur-[120px] rounded-full z-0"></div>

      <main className="relative z-10 text-center max-w-4xl px-6">
        {/* Título Principal */}
        <header className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.6em] text-neutral-600 mb-4 block">Arcane Database System v1.0</span>
          <h1 className="text-6xl md:text-8xl font-serif italic font-bold tracking-tighter text-white">
            Digital Alchemist’s <br />
            <span className="text-red-800">Archive</span>
          </h1>
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-red-900/50 to-transparent mx-auto mt-8"></div>
        </header>

        {/* Portales de Selección */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Opción 1: Crear */}
          <Link href="/registro" className="group">
            <div className="bg-[#131313] border border-neutral-900 p-12 transition-all duration-500 hover:border-red-900/50 hover:bg-[#1c1b1b] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-900/5 rounded-full blur-2xl group-hover:bg-red-900/10 transition-colors"></div>
              
              <div className="relative z-10">
                <span className="text-3xl text-red-700 mb-6 block">✦</span>
                <h3 className="text-2xl font-serif italic mb-2 text-white">Consagrar Registro</h3>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 leading-relaxed">
                  Invocar una nueva entidad al archivo eterno.
                </p>
              </div>
              
              {/* Adorno místico */}
              <div className="absolute bottom-4 right-4 text-[10px] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                [ INIT_RITUAL ]
              </div>
            </div>
          </Link>

          {/* Opción 2: Visualizar */}
          <Link href="/historial" className="group">
            <div className="bg-[#131313] border border-neutral-900 p-12 transition-all duration-500 hover:border-yellow-700/50 hover:bg-[#1c1b1b] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-900/5 rounded-full blur-2xl group-hover:bg-yellow-900/10 transition-colors"></div>
              
              <div className="relative z-10">
                <span className="text-3xl text-yellow-600 mb-6 block">📜</span>
                <h3 className="text-2xl font-serif italic mb-2 text-white">Consultar Biblioteca</h3>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 leading-relaxed">
                  Visualizar expedientes y entidades registradas.
                </p>
              </div>

              <div className="absolute bottom-4 right-4 text-[10px] text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                [ OPEN_DOSSIERS ]
              </div>
            </div>
          </Link>

        </div>

        {/* Footer sutil */}
        <footer className="mt-24 opacity-20 hover:opacity-50 transition-opacity">
          <p className="text-[9px] uppercase tracking-[0.4em] font-serif">
            Propiedad del Consejo de Alquimia Digital • Prohibido el acceso no autorizado
          </p>
        </footer>
      </main>
    </div>
  );
}