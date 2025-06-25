// src/common/components/contacts/Contacts.tsx
import React from 'react';


export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Información de Contacto - COM 610
      </h1>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Universidad Mayor Real y Pontificia de San Francisco Xavier de Chuquisaca
        </h2>
        <h3 className="text-xl text-center mb-6 text-gray-600">
          Facultad de Ciencias y Tecnología - Trabajando en la Nube (COM 610)
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tu información */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Cesar Alvaro Miranda Gutierrez</h3>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Carrera:</span> Ingeniería en Ciencias de la Computación
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Teléfono:</span> +591 63776985
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Correo:</span> cesar.miranda.gu@gmail.com
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Rol en el proyecto:</span> Desarrollo backend
            </p>
          </div>
        </div>

        {/* Información de tu compañero */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Rodriguez Poveda Mirko Cliver</h3>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Carrera:</span> Ingeniería en Telecomunicaciones
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Teléfono:</span> +591 65272121
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Correo:</span> mirko.rodriguez@usfx.bo
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Rol en el proyecto:</span> Desarrollador Frontend
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500">
        <p>© {new Date().getFullYear()} - Proyecto de Trabajo en la Nube</p>
        <p className="mt-2">Todos los derechos reservados</p>
      </div>
    </div>
  );
}