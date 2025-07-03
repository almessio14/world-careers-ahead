
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Microarea } from '../data/careerExploration';

interface MicroareaModalProps {
  microarea: Microarea;
  onClose: () => void;
}

export default function MicroareaModal({ microarea, onClose }: MicroareaModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Modal con design Apple-like */}
      <Card className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 rounded-3xl animate-scale-in">
        <CardHeader className="pb-6 bg-gradient-to-r from-[#0A1D3A] to-[#14213d] text-white rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-3xl font-light tracking-tight pr-8">
                {microarea.name}
              </CardTitle>
              <div className="mt-2 text-blue-100 text-sm font-light">
                Specializzazione Professionale
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0 hover:bg-white/10 text-white hover:text-white rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
          {/* Descrizione principale */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#14213d] flex items-center">
              <span className="w-2 h-8 bg-[#fbbf24] rounded-full mr-3"></span>
              Panoramica
            </h4>
            <p className="text-gray-700 leading-relaxed font-light text-lg">
              {microarea.description}
            </p>
          </div>
          
          {/* Aziende note con design cards */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-4 flex items-center text-lg">
              <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
              Aziende Leader del Settore
            </h4>
            <p className="text-blue-800 font-medium text-lg leading-relaxed">
              {microarea.companies}
            </p>
          </div>
          
          {/* Stipendio con design premium */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
            <h4 className="font-semibold text-green-900 mb-4 flex items-center text-lg">
              <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
              Compenso Medio
            </h4>
            <p className="text-green-800 font-bold text-2xl">
              {microarea.salary}
            </p>
            <p className="text-green-700 text-sm mt-2 font-medium">
              *Valori indicativi per posizioni entry-level
            </p>
          </div>
          
          {/* Pulsante di chiusura elegante */}
          <div className="pt-6 border-t border-gray-100">
            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#14213d] to-[#0A1D3A] hover:from-[#0A1D3A] hover:to-[#14213d] text-white py-4 rounded-2xl text-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Chiudi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
