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
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#14213d] mb-2">Il tuo profilo professionale!</h2>
          
          <div className="bg-gradient-to-br from-[#14213d] via-[#0A1D3A] to-[#14213d] p-6 rounded-xl mb-4 border border-[#14213d]/20">
            <div className="flex items-center justify-center mb-3">
              <span className="text-3xl mr-3">{topMacroCategory.icon}</span>
              <h3 className="text-xl font-semibold text-white">{topMacroCategory.name}</h3>
            </div>
            <p className="text-gray-200 mb-4">{topMacroCategory.description}</p>
            
            <h4 className="font-semibold text-white mb-2">Specializzazione consigliata:</h4>
            <h5 className="text-lg font-medium text-[#fbbf24] mb-3">{recommendedMicroarea.name}</h5>
            
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

export default QuizResult;
