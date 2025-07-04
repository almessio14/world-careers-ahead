
interface SimpleQuizQuestionProps {
  phase: 'main' | 'result';
  currentQuestion: any;
  currentQuestionNumber: number;
  totalQuestions: number;
  progress: number;
  selectedCategory: string;
  onMainAnswer: (index: number) => void;
  onClose: () => void;
}

const SimpleQuizQuestion = ({ 
  currentQuestion,
  currentQuestionNumber,
  totalQuestions,
  progress,
  onMainAnswer, 
  onClose 
}: SimpleQuizQuestionProps) => {
  
  if (!currentQuestion) {
    return null;
  }

  // Calcola il progresso: 0% fino alla domanda 6, poi 100% alla domanda 7
  const actualProgress = currentQuestionNumber < 7 ? 0 : 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Quiz di Orientamento
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
              <span>Analisi in corso</span>
              <span>Domanda {currentQuestionNumber} di {totalQuestions}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full transition-all duration-500 ease-out rounded-full"
                style={{ 
                  width: `${actualProgress}%`,
                  background: 'linear-gradient(90deg, #0A1D3A 0%, #14213d 50%, #0A1D3A 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="animate-fadeIn">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option: any, index: number) => (
              <button
                key={index}
                onClick={() => onMainAnswer(index)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 cursor-pointer transition-all duration-300 hover:border-[#fbbf24] hover:bg-gradient-to-r hover:from-[#fbbf24]/10 hover:to-[#fbbf24]/5 hover:shadow-lg hover:shadow-[#fbbf24]/30 hover:scale-[1.02] group"
              >
                <div className="flex items-start">
                  <span className="text-primary font-medium mr-3 mt-1 group-hover:text-[#fbbf24] transition-colors duration-300">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-gray-800">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleQuizQuestion;
