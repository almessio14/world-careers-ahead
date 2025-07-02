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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card shadow-2xl">
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
        
        <CardContent className="space-y-6">
          {/* Descrizione */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Descrizione</h4>
            <p className="text-muted-foreground leading-relaxed">
              {microarea.description}
            </p>
          </div>
          
          {/* Aziende note */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Aziende note</h4>
            <p className="text-muted-foreground">
              {microarea.companies}
            </p>
          </div>
          
          {/* Stipendio medio */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Stipendio medio</h4>
            <p className="text-accent font-medium text-lg">
              {microarea.salary}
            </p>
          </div>
          
          {/* Pulsante chiudi */}
          <div className="pt-4 border-t border-border">
            <Button 
              onClick={onClose}
              className="w-full"
            >
              Chiudi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}