import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Twitter, Mail, ExternalLink, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';

// --- KONFIGURASI DATA (Ubah di sini) ---
const PERSONAL_INFO = {
  name: "NAMA ANDA", // Ganti dengan nama Anda
  role: "Ilustrator & Desainer Karakter",
  bio: "Halo! Saya adalah seorang ilustrator lepas yang berbasis di Indonesia. Saya memiliki hasrat yang besar dalam menciptakan karakter yang hidup, penuh warna, dan dinamis. Terinspirasi oleh budaya pop, anime, dan streetwear.",
  email: "hello@emailanda.com",
  socials: {
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  }
};

const WORKS = [
  { id: 1, title: "Neon Dreams", category: "Character Design", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Cyberpunk City", category: "Illustration", img: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Virtual Idol", category: "Concept Art", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Streetwear Brand", category: "Commercial", img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Summer Vibes", category: "Personal", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Mecha Girl", category: "Character Design", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80" },
];

// --- KOMPONEN ANIMASI REVEAL ---
const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const sliderRef = useRef(null);

  // Intro Loader Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Navbar Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 450 : 320;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h1 className="text-white font-black tracking-[0.2em] animate-pulse uppercase">Memuat Portofolio</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden">
      
      {/* Custom Global CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}} />

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button onClick={() => scrollToSection('home')} className="text-2xl font-black tracking-tighter hover:text-pink-500 transition-colors uppercase">
            {PERSONAL_INFO.name}
          </button>
          <div className="hidden md:flex gap-10 font-bold text-xs tracking-[0.2em] uppercase">
            {['works', 'about', 'contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className="hover:text-pink-500 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>
          <button onClick={() => scrollToSection('contact')} className="md:hidden text-xs font-black uppercase bg-zinc-900 text-white px-4 py-2 rounded-full">Hire Me</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <div className="absolute inset-0 -z-10">
           <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-cyan-50 opacity-100"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        </div>
        
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold tracking-widest uppercase mb-6">Tersedia untuk Komisi</span>
          <h2 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.85] mb-8">
            <span className="block text-zinc-900">CREATIVE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              VISIONARY.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 mb-10 max-w-xl mx-auto font-medium">
            {PERSONAL_INFO.role} fokus pada estetika modern dan warna yang dinamis.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('works')}
              className="bg-zinc-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-200"
            >
              Eksplorasi Karya
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="text-zinc-300 w-8 h-8" />
        </div>
      </section>

      {/* WORKS SLIDER */}
      <section id="works" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">Galeri</h3>
                <p className="text-zinc-400 font-medium">Geser untuk melihat proyek pilihan terbaru.</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => slide('left')} className="p-5 rounded-full border border-zinc-100 hover:bg-zinc-900 hover:text-white transition-all">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button onClick={() => slide('right')} className="p-5 rounded-full border border-zinc-100 hover:bg-zinc-900 hover:text-white transition-all">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div 
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 md:px-12 pb-10"
        >
          {WORKS.map((work, idx) => (
            <div 
              key={work.id} 
              className="snap-center shrink-0 w-[85vw] md:w-[450px] lg:w-[550px] group relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-100 shadow-2xl"
            >
              <img 
                src={work.img} 
                alt={work.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                <span className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-2">{work.category}</span>
                <h4 className="text-white text-3xl font-black">{work.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all"></div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" alt="Profil" className="w-full h-full object-cover" />
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div>
                <h3 className="text-5xl font-black tracking-tighter uppercase mb-10">Tentang Saya</h3>
                <p className="text-xl text-zinc-600 leading-relaxed mb-10">
                  {PERSONAL_INFO.bio}
                </p>
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-100">
                    <h5 className="font-black uppercase text-xs tracking-widest text-pink-500 mb-3">Layanan Kami</h5>
                    <p className="text-zinc-800 font-bold">Ilustrasi Komersial, Karakter Game, & Desain Sampul Album.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-zinc-950 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-10">Let's Create<br/>Something Big.</h3>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="group relative inline-flex items-center gap-4 text-2xl md:text-4xl font-bold hover:text-pink-500 transition-colors mb-24">
              {PERSONAL_INFO.email}
              <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
            </a>
          </Reveal>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-800 pt-16">
            <p className="text-zinc-500 font-medium">© {new Date().getFullYear()} {PERSONAL_INFO.name}</p>
            <div className="flex gap-8">
              {['Instagram', 'Twitter', 'Dribbble'].map(soc => (
                <a key={soc} href="#" className="text-sm font-bold uppercase tracking-widest hover:text-pink-500 transition-colors">{soc}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
