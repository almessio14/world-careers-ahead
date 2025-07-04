
import { MacroCategory, SubcategoryResult } from '../data/newOrientationQuiz';
import { careerExplorationData } from '../data/careerExploration';

interface QuizResultProps {
  topMacroCategory: MacroCategory;
  finalResult: SubcategoryResult;
  onReset: () => void;
  onClose: () => void;
}

const QuizResult = ({ topMacroCategory, finalResult, onReset, onClose }: QuizResultProps) => {
  const getRecommendedMicroarea = (categoryId: string) => {
    const category = careerExplorationData.find(cat => cat.id === categoryId);
    if (!category || category.microareas.length === 0) {
      return { name: 'Area specialistica', description: 'Scopri le opportunità disponibili' };
    }
    
    // Prendi la prima microarea come raccomandazione principale
    const recommendedMicroarea = category.microareas[0];
    return {
      name: recommendedMicroarea.name,
      description: recommendedMicroarea.description
    };
  };

  const recommendedMicroarea = getRecommendedMicroarea(topMacroCategory.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Il tuo profilo professionale!</h2>
          
          <div className="bg-primary/10 p-6 rounded-lg mb-4">
            <div className="flex items-center justify-center mb-3">
              <span className="text-3xl mr-3">{topMacroCategory.icon}</span>
              <h3 className="text-xl font-semibold text-primary">{topMacroCategory.name}</h3>
            </div>
            <p className="text-gray-700 mb-4">{topMacroCategory.description}</p>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Specializzazione consigliata:</h4>
              <h5 className="text-lg font-medium text-primary mb-2">{recommendedMicroarea.name}</h5>
              
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <button
                  onClick={onClose}
                  className="text-sm text-primary hover:text-primary/80 underline"
                >
                  → Vai a vedere i dettagli nella schermata scopri le carriere
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onReset}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Rifai il quiz
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Esplora le carriere
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
