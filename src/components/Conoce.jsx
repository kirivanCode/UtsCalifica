import React from 'react';
import { ArrowRight, Rocket, Globe, Star } from "lucide-react";
import { Button } from "../ui/button";
import '../styles/Conoce.css';

export default function Component() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Statement Section */}
      <MissionSection />

      {/* Achievements Section */}
      <AchievementsSection />
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <BackgroundImage />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          UTS CALIFICA<span className="text-red-500">X</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-lg mx-auto">
          Revolucionando el sistema de calificaciones
        </p>
        <div className="flex justify-center">
          <Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            <ArrowRight className="h-4 w-4 mr-2" />
            Más Información
          </Button>
        </div>
      </div>
    </header>
  );
}

// Background Image Component
function BackgroundImage() {
  return (
    <div className="absolute inset-0 z-0">
      <img
        src="https://www.uts.edu.co/sitio/wp-content/uploads/2021/09/Calidad.png"
        alt="Fachada"
        className="object-cover w-full h-full opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
    </div>
  );
}

// Mission Section Component
function MissionSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestra Misión</h2>
        <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto">
          UTS CalificaX busca mejorar la calidad educativa proporcionando una plataforma donde los estudiantes puedan evaluar a sus profesores de manera justa y constructiva, fomentando la excelencia académica en las Unidades Tecnológicas de Santander.
        </p>
        <div className="flex justify-center mt-8">
          <img
            src="https://www.redttu.edu.co/es/wp-content/uploads/2015/12/30.-UTS.png"
            alt="Calidad"
            className="max-w-xs h-auto"  // Cambia esto a max-w-xs o cualquier otra clase más pequeña que necesites
          />
        </div>
      </div>
    </section>
  );
}

// Achievements Section Component
function AchievementsSection() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Logros Clave</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AchievementCard
            icon={<Rocket className="h-12 w-12 text-red-500" aria-label="Cohete Reutilizable" />}
            title="Calificaciones Detalladas"
            description="Evalúa a los profesores en múltiples aspectos como claridad, accesibilidad y metodología."
          />
          <AchievementCard
            icon={<Globe className="h-12 w-12 text-red-500" aria-label="Internet Global" />}
            title="Recomendaciones"
            description="Descubre qué profesores son más recomendados por otros estudiantes de la UTS."
          />
          <AchievementCard
            icon={<Star className="h-12 w-12 text-red-500" aria-label="Colonización de Marte" />}
            title="Búsqueda Avanzada"
            description="Encuentra fácilmente profesores por nombre, materia o facultad."
          />
        </div>
      </div>
    </section>
  );
}

// Achievement Card Component
function AchievementCard({ icon, title, description }) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:bg-gray-600">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
