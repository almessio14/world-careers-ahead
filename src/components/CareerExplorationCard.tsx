import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Macrocategory, Microarea } from '../data/careerExploration';
import { cn } from '../lib/utils';

interface CareerExplorationCardProps {
  category: Macrocategory;
  onMicroareaClick: (microarea: Microarea) => void;
}

export default function CareerExplorationCard({ category, onMicroareaClick }: CareerExplorationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="h-80 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 h-full flex flex-col">
        <h3 className="text-xl font-bold mb-4 text-foreground">{category.name}</h3>
        
        <div className="flex-1 overflow-hidden">
          {!isHovered ? (
            <p className="text-muted-foreground leading-relaxed animate-fadeIn">
              {category.description}
            </p>
          ) : (
            <div className="space-y-3 animate-fadeIn">
              <p className="text-sm font-medium text-foreground mb-4">Aree specialistiche:</p>
              {category.microareas.map((microarea) => (
                <button
                  key={microarea.id}
                  onClick={() => onMicroareaClick(microarea)}
                  className={cn(
                    "w-full p-3 text-left rounded-lg border transition-all duration-200",
                    "border-border hover:border-accent hover:bg-accent/5",
                    "text-foreground hover:text-accent-foreground"
                  )}
                >
                  <span className="font-medium">{microarea.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}