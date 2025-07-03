
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Microarea } from '../data/careerExploration';
import { useFavorites } from '../hooks/useFavorites';
import { cn } from '../lib/utils';

interface MicroareaModalProps {
  microarea: Microarea;
  onClose: () => void;
}

export default function MicroareaModal({ microarea, onClose }: MicroareaModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isInFavorites = isFavorite(microarea.id);

  const handleFavoriteClick = () => {
    toggleFavorite({
      id: microarea.id,
      type: 'career',
      data: microarea as any
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Modal con design Apple-like ottimizzato */}
      <Card className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 rounded-3xl animate-scale-in">
        <CardHeader className="pb-4 bg-gradient-to-r from-[#0A1D3A] to-[#14213d] text-white rounded-t-3xl">
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
              onClick={handleFavoriteClick}
              className={cn(
                "shrink-0 hover:bg-white/10 text-white hover:text-white rounded-full transition-all duration-200 hover:scale-110",
                isInFavorites ? "text-[#fbbf24]" : ""
              )}
            >
              <Heart className={cn("h-5 w-5", isInFavorites ? "fill-current" : "")} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Descrizione principale */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-[#14213d] flex items-center">
              <span className="w-2 h-6 bg-[#fbbf24] rounded-full mr-3"></span>
              Panoramica
            </h4>
            <p className="text-gray-700 leading-relaxed font-light">
              {microarea.description}
            </p>
          </div>
          
          {/* Layout verticale per aziende e compenso - strisce sottili */}
          <div className="space-y-3">
            {/* Aziende leader - striscia sottile */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-blue-900 text-sm mb-1">
                    Aziende Leader
                  </h4>
                  <p className="text-blue-800 font-medium text-sm truncate">
                    {microarea.companies}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Compenso medio - striscia sottile */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-green-900 text-sm mb-1">
                    Compenso Medio
                  </h4>
                  <p className="text-green-800 font-bold text-lg">
                    {microarea.salary}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pulsante di chiusura elegante */}
          <div className="pt-4 border-t border-gray-100">
            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#14213d] to-[#0A1D3A] hover:from-[#0A1D3A] hover:to-[#14213d] text-white py-3 rounded-xl text-base font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Chiudi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
