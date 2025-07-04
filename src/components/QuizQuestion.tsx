
import { level1Questions, level2Questions, macroCategories } from '../data/newOrientationQuiz';
import { QuizPhase } from '../hooks/useQuizLogic';

interface QuizQuestionProps {
  phase: QuizPhase;
  currentQuestion: number;
  topMacroCategoryId?: string;
  level1AnswersCount: number;
  level2AnswersCount: number;
  onLevel1Answer: (index: number) => void;
  onLevel2Answer: (index: number) => void;
  onClose: () => void;
}

const QuizQuestion = ({ 
  phase, 
  currentQuestion, 
  topMacroCategoryId, 
  level1AnswersCount, 
  level2AnswersCount,
  onLevel1Answer, 
  onLevel2Answer, 
  onClose 
}: QuizQuestionProps) => {
  const isLevel2 = phase === 'level2';
  
  const questions = isLevel2 && topMacroCategoryId
    ? level2Questions[topMacroCategoryId] 
    : level1Questions;
    
  const currentQuestionData = questions[currentQuestion];
  
  if (!currentQuestionData) {
    return null;
  }

  // Calcola il progresso
  const completedQuestions = isLevel2 ? 7 + level2AnswersCount : level1AnswersCount;
  const currentQuestionNumber = completedQuestions + 1;
  const progress = (completedQuestions / 10) * 100;

  const topMacroCategory = topMacroCategoryId 
    ? macroCategories.find(cat => cat.id === topMacroCategoryId)
    : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {isLevel2 ? 'Specializzazione' : 'Quiz di Orientamento'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {isLevel2 
                   ? `Livello 2: ${topMacroCategory?.name || 'Specializzazione'}`
                   : 'Livello 1: Orientamento generale'
                 }
               </span>
               <span>Domanda {currentQuestionNumber} di 10</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full transition-all duration-500 ease-out rounded-full"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #0A1D3A 0%, #14213d 50%, #0A1D3A 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {currentQuestionData.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => isLevel2 
                  ? onLevel2Answer(index) 
                  : onLevel1Answer(index)
                }
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-300 hover:border-[#fbbf24] hover:bg-gradient-to-r hover:from-[#fbbf24]/10 hover:to-[#fbbf24]/5 hover:shadow-lg hover:shadow-[#fbbf24]/30 hover:scale-[1.02] group"
              >
                <div className="flex items-start">
                  <span className="text-primary font-medium mr-3 mt-1 group-hover:text-[#fbbf24] transition-colors duration-300">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-gray-800">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
