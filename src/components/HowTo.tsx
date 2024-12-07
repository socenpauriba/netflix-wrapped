import React from 'react';
import { Chrome, PlayCircle, Download, Upload } from 'lucide-react';

export const HowTo: React.FC = () => {
  const steps = [
    {
      icon: <Chrome className="w-6 h-6" />,
      title: "Obre Netflix al navegador",
      description: "Des de l'app no pots descarregar aquestes dades"
    },
    {
      icon: <PlayCircle className="w-6 h-6" />,
      title: "Accedeix a l'historial",
      description: "Ves a netflix.com/viewingactivity",
      link: "https://netflix.com/viewingactivity"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Descarrega",
      description: "Fes clic al botó 'Descargar todo'"
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Puja el fitxer",
      description: "Carrega el CSV resultant aquí"
    }
  ];

  return (
    <div className="w-full mt-12">
      <h2 className="text-xl font-bold text-center mb-8 text-gray-800">
        Com obtenir el teu historial de Netflix?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="relative bg-gradient-to-br from-[#E50914]/5 to-[#831010]/5
                     rounded-xl p-6 border border-[#E50914]/10"
          >
            {/* Connection line for desktop */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#E50914] to-[#831010]" />
            )}
            
            {/* Connection line for mobile */}
            {index < steps.length - 1 && (
              <div className="md:hidden absolute left-1/2 -bottom-3 w-0.5 h-6 bg-gradient-to-b from-[#E50914] to-[#831010]" />
            )}
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E50914] to-[#831010]
                          flex items-center justify-center shadow-md">
                <div className="text-white">
                  {step.icon}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
                
                {step.link && (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-[#E50914] hover:text-[#831010]
                             transition-colors duration-200"
                  >
                    Visitar →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};