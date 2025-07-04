
import { MacroCategory, SubcategoryResult } from '../data/newOrientationQuiz';
import { careerExplorationData } from '../data/careerExploration';

interface QuizResultProps {
  topMacroCategory: MacroCategory;
  finalResult: SubcategoryResult;
  onReset: () => void;
  onClose: () => void;
  onExploreCareer: () => void;
}

const QuizResult = ({ topMacroCategory, finalResult, onReset, onClose, onExploreCareer }: QuizResultProps) => {
  const getRecommendedMicroarea = (categoryId: string) => {
    const category = careerExplorationData.find(cat => cat.id === categoryId);
    if (!category || category.microareas.length === 0) {
      return { name: 'Area specialistica', description: 'Scopri le opportunità disponibili' };
    }
    
    const recommendedMicroarea = category.microareas[0];
    return {
      name: recommendedMicroarea.name,
      description: recommendedMicroarea.description
    };
  };

  const recommendedMicroarea = getRecommendedMicroarea(topMacroCategory.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Il tuo profilo professionale!</h2>
          
          <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 p-6 rounded-xl mb-4 border border-primary/20">
            <div className="flex items-center justify-center mb-3">
              <span className="text-3xl mr-3">{topMacroCategory.icon}</span>
              <h3 className="text-xl font-semibold text-primary">{topMacroCategory.name}</h3>
            </div>
            <p className="text-gray-700 mb-4">{topMacroCategory.description}</p>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-primary mb-2">Specializzazione consigliata:</h4>
              <h5 className="text-lg font-medium text-accent mb-2">{recommendedMicroarea.name}</h5>
              
              <div className="mt-3 p-3 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg border border-accent/30">
                <button
                  onClick={onExploreCareer}
                  className="text-sm text-primary hover:text-accent underline transition-colors duration-200 font-medium"
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
            className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-primary py-3 px-4 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-medium border border-gray-300"
          >
            Rifai il quiz
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-white py-3 px-4 rounded-lg hover:from-primary/90 hover:to-primary/80 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            Esci dal quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
