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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      {/* Modal */}
      <Card className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto bg-white shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl font-bold text-foreground pr-8">
              {microarea.name}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0 hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Descrizione */}
          <div>
            <p className="text-gray-700 leading-relaxed text-sm">
              {microarea.description}
            </p>
          </div>
          
          {/* Aziende note */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2 text-sm">Aziende note</h4>
            <p className="text-blue-700 text-sm">
              {microarea.companies}
            </p>
          </div>
          
          {/* Stipendio medio */}
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2 text-sm">Stipendio medio</h4>
            <p className="text-green-700 font-medium text-sm">
              {microarea.salary}
            </p>
          </div>
          
          {/* Pulsante chiudi */}
          <div className="pt-3 border-t border-gray-200">
            <Button 
              onClick={onClose}
              className="w-full text-sm"
            >
              Chiudi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}