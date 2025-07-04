
import { careerExplorationData } from '../data/careerExploration';

interface SimpleQuizResultProps {
  selectedCategory: string;
  finalMicroCategory: string;
  mainScores: Record<string, number>;
  specificScores: Record<string, number>;
  categoryMapping: Record<string, string>;
  onReset: () => void;
  onClose: () => void;
  onExploreCareer: () => void;
}

const SimpleQuizResult = ({ 
  selectedCategory, 
  finalMicroCategory, 
  mainScores,
  specificScores,
  categoryMapping,
  onReset, 
  onClose, 
  onExploreCareer 
}: SimpleQuizResultProps) => {
  
  const getMacroCategory = (categoryName: string) => {
    const categoryMap: Record<string, any> = {
      Finance: {
        id: 'finance',
        name: 'FINANCE',
        description: 'Il mondo della finanza è fatto per chi ama l\'analisi, la strategia e l\'impatto concreto. Che tu voglia lavorare in banca d\'investimento, in fondi di private equity o nelle startup del futuro, troverai ambienti competitivi, ritmi alti e grandi opportunità di crescita (e guadagno).'
      },
      Consulting: {
        id: 'consulting',
        name: 'CONSULTING',
        description: 'Se ti piace risolvere problemi, lavorare in team e affrontare sfide sempre nuove, la consulenza è la tua palestra ideale. Dai bilanci alla strategia, ti confronterai con clienti reali, in progetti che cambiano di continuo e accelerano il tuo sviluppo professionale.'
      },
      Policy: {
        id: 'policy',
        name: 'POLICY & PUBLIC AFFAIRS',
        description: 'Vuoi contribuire al bene pubblico, influenzare decisioni politiche o rappresentare il tuo Paese? In questa area lavori in contesti internazionali, istituzionali e multilaterali, con un impatto diretto su società, economia e ambiente.'
      },
      Business: {
        id: 'business',
        name: 'BUSINESS & INDUSTRIES',
        description: 'Grandi aziende e industrie innovative cercano menti brillanti per ruoli di gestione, analisi e operatività. Se vuoi vedere il risultato concreto del tuo lavoro e contribuire allo sviluppo di prodotti e servizi globali, questo è il tuo spazio.'
      },
      Entrepreneurship: {
        id: 'entrepreneurship',
        name: 'ENTREPRENEURSHIP',
        description: 'Hai spirito di iniziativa, vuoi costruire qualcosa di tuo o guidare la crescita di un\'impresa? Dal lanciare una start-up al gestire le finanze aziendali, l\'imprenditorialità richiede visione, coraggio e capacità manageriali.'
      },
      Academic: {
        id: 'academic',
        name: 'ACADEMIC & MEDIA',
        description: 'Se ti appassiona il sapere, la ricerca o il racconto dei fatti, puoi seguire la via dell\'accademia o del giornalismo. Due mondi diversi, ma uniti dalla voglia di capire, spiegare e generare impatto culturale e sociale.'
      }
    };
    
    return categoryMap[categoryName] || categoryMap.Finance;
  };

  const getRecommendedMicroarea = (categoryId: string, microCategoryId: string) => {
    const category = careerExplorationData.find(cat => cat.id === categoryId);
    if (!category || category.microareas.length === 0) {
      return { name: finalMicroCategory, description: 'Scopri le opportunità disponibili' };
    }
    
    // Try to find the specific microarea by matching the ID
    const microarea = category.microareas.find(m => m.id === microCategoryId) || category.microareas[0];
    return {
      name: microarea.name,
      description: microarea.description
    };
  };

  const topMacroCategory = getMacroCategory(selectedCategory);
  const recommendedMicroarea = getRecommendedMicroarea(topMacroCategory.id, finalMicroCategory);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#14213d] mb-2">Il tuo profilo professionale!</h2>
          
          <div className="bg-gradient-to-br from-[#14213d] via-[#0A1D3A] to-[#14213d] p-6 rounded-xl mb-4 border border-[#14213d]/20">
            <div className="flex items-center justify-center mb-3">
              <h3 className="text-xl font-semibold text-[#fbbf24]">{topMacroCategory.name}</h3>
            </div>
            <p className="text-gray-200 mb-4">{topMacroCategory.description}</p>
            
            <h4 className="font-semibold text-white mb-2">Specializzazione consigliata:</h4>
            <h5 className="text-lg font-medium text-[#fbbf24] mb-3">{recommendedMicroarea.name.toUpperCase()}</h5>
            
            <button
              onClick={onExploreCareer}
              className="text-sm text-white hover:text-[#fbbf24] underline transition-colors duration-200 font-medium"
            >
              → Vai a vedere i dettagli nella schermata scopri le carriere
            </button>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onReset}
            className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-[#14213d] py-3 px-4 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-medium border border-gray-300 hover:border-[#fbbf24]"
          >
            Rifai il quiz
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-[#14213d] to-[#0A1D3A] text-white py-3 px-4 rounded-lg hover:from-[#0A1D3A] hover:to-[#14213d] transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-[#fbbf24]/20"
          >
            Esci dal quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleQuizResult;
