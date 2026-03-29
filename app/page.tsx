"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistroOC() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    sexo: "Masculino",
    edad: "",
    altura: "",
    peso: "",
    fotoUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1584&auto=format&fit=crop", // Imagen temporal estilo dark fantasy
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("¡El botón funciona y no se recarga!"); // <--- AÑADE ESTO
  setIsSubmitting(true);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/ocs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          edad: Number(formData.edad),
          altura: Number(formData.altura),
          peso: Number(formData.peso),
        }),
      });

      if (res.ok) {
        alert("¡Entidad registrada en el archivo con éxito!");
        // Aquí luego lo mandaremos a la pantalla de historial
      } else {
        alert("Hubo una perturbación al guardar los datos.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen selection:bg-red-900 selection:text-white pb-20">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-8 py-6 sticky top-0 z-50 backdrop-blur-md bg-[#131313]/90 border-b border-red-900/30 shadow-[0_10px_30px_-15px_rgba(139,0,0,0.3)]">
        <h1 className="text-2xl font-bold italic text-red-700 tracking-tighter serif">
          Digital Alchemist’s Archive
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:grid md:grid-cols-12 gap-12">
        {/* Título de Sección */}
        <section className="md:col-span-12 mb-4">
          <div className="inline-block border-t-2 border-yellow-600 w-16 mb-4"></div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-2">Registro de Entidad</h2>
          <p className="text-xs uppercase tracking-[0.4em] text-purple-300">Expediente Clasificado // Protocolo Alquímico</p>
        </section>

        {/* Formulario */}
        <div className="md:col-span-7 bg-[#1c1b1b] relative p-10 shadow-2xl border border-neutral-800">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-transparent to-yellow-600 opacity-40"></div>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-2 block">Nombre</label>
                <input required name="nombre" value={formData.nombre} onChange={handleChange} type="text" placeholder="Ej. Julius" className="w-full bg-transparent border-0 border-b border-neutral-700 py-3 focus:ring-0 focus:border-red-400 focus:bg-[#2a2a2a] transition-all text-xl text-white outline-none" />
              </div>
              <div className="relative group">
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-2 block">Apellido</label>
                <input required name="apellido" value={formData.apellido} onChange={handleChange} type="text" placeholder="Ej. Thorne" className="w-full bg-transparent border-0 border-b border-neutral-700 py-3 focus:ring-0 focus:border-red-400 focus:bg-[#2a2a2a] transition-all text-xl text-white outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="col-span-1">
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-2 block">Sexo</label>
                <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full bg-transparent border-0 border-b border-neutral-700 py-3 focus:ring-0 focus:border-red-400 focus:bg-[#2a2a2a] transition-all text-sm text-white outline-none">
                  <option className="bg-[#1c1b1b]">Masculino</option>
                  <option className="bg-[#1c1b1b]">Femenino</option>
                  <option className="bg-[#1c1b1b]">No Binario</option>
                  <option className="bg-[#1c1b1b]">Arcano</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-2 block">Edad</label>
                <input required name="edad" value={formData.edad} onChange={handleChange} type="number" placeholder="24" className="w-full bg-transparent border-0 border-b border-neutral-700 py-3 focus:ring-0 focus:border-red-400 focus:bg-[#2a2a2a] transition-all text-sm text-white outline-none" />
              </div>
              <div className="col-span-1">
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-2 block">Altura (cm)</label>
                <input required name="altura" value={formData.altura} onChange={handleChange} type="number" placeholder="185" className="w-full bg-transparent border-0 border-b border-neutral-700 py-3 focus:ring-0 focus:border-red-400 focus:bg-[#2a2a2a] transition-all text-sm text-white outline-none" />
              </div>
              <div className="col-span-1">
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-2 block">Peso (kg)</label>
                <input required name="peso" value={formData.peso} onChange={handleChange} type="number" placeholder="78" className="w-full bg-transparent border-0 border-b border-neutral-700 py-3 focus:ring-0 focus:border-red-400 focus:bg-[#2a2a2a] transition-all text-sm text-white outline-none" />
              </div>
            </div>

            <div className="pt-8">
              <button disabled={isSubmitting} type="submit" className="w-full bg-red-900 text-red-100 py-5 text-sm uppercase tracking-[0.3em] font-bold relative overflow-hidden shadow-[0_0_20px_rgba(139,0,0,0.4)] hover:bg-red-800 transition-all duration-300">
                {isSubmitting ? "Invocando..." : "Consagrar Registro"}
              </button>
            </div>
          </form>
        </div>

        {/* Previsualización Lateral */}
        <aside className="md:col-span-5 flex flex-col gap-8">
          <div className="bg-[#2a2a2a] p-8 shadow-inner border-l-4 border-red-900">
            <h3 className="text-2xl italic text-red-400 mb-6">Previsualización del Dossier</h3>
            <div className="aspect-[3/4] bg-[#0e0e0e] relative overflow-hidden shadow-2xl mb-6">
              <img src={formData.fotoUrl} alt="Preview" className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
              <div className="absolute inset-0 border-[20px] border-[#2a2a2a]/40 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 text-[10px] text-red-400 tracking-widest">SCANNING...</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-neutral-700 pb-1">
                <span className="text-[10px] uppercase text-neutral-500">Firma Biológica</span>
                <span className="italic text-lg text-white">{formData.nombre || "Pendiente..."} {formData.apellido}</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}