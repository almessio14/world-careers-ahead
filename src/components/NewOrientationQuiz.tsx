
import { useState } from 'react';
import { 
  level1Questions, 
  level2Questions, 
  macroCategories, 
  subcategoryResults,
  type NewQuizQuestion,
  type SpecificQuestion,
  type MacroCategory,
  type SubcategoryResult
} from '../data/newOrientationQuiz';

interface NewOrientationQuizProps {
  onClose: () => void;
}

const NewOrientationQuiz = ({ onClose }: NewOrientationQuizProps) => {
  const [phase, setPhase] = useState<'level1' | 'level2' | 'result'>('level1');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [level1Answers, setLevel1Answers] = useState<number[]>([]);
  const [level2Answers, setLevel2Answers] = useState<number[]>([]);
  const [topMacroCategory, setTopMacroCategory] = useState<MacroCategory | null>(null);
  const [finalResult, setFinalResult] = useState<SubcategoryResult | null>(null);

  const handleLevel1Answer = (optionIndex: number) => {
    const newAnswers = [...level1Answers, optionIndex];
    setLevel1Answers(newAnswers);

    if (currentQuestion < level1Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcola il punteggio per ogni macro categoria
      const scores = [0, 0, 0, 0, 0, 0]; // Finance, Consulting, Policy, Business, Entrepreneurship, Academic

      level1Questions.forEach((question, qIndex) => {
        const answerIndex = newAnswers[qIndex];
        const weights = question.weights[answerIndex];
        weights.forEach((weight, categoryIndex) => {
          scores[categoryIndex] += weight;
        });
      });

      console.log('Level 1 scores:', scores);

      // Trova la categoria con il punteggio più alto
      const maxScoreIndex = scores.indexOf(Math.max(...scores));
      const topCategory = macroCategories[maxScoreIndex];

      setTopMacroCategory(topCategory);
      setPhase('level2');
      setCurrentQuestion(0);
    }
  };

  const handleLevel2Answer = (optionIndex: number) => {
    const newAnswers = [...level2Answers, optionIndex];
    setLevel2Answers(newAnswers);

    if (currentQuestion < 2) { // 3 domande (0, 1, 2)
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcola il punteggio per le sottocategorie
      if (!topMacroCategory) return;

      const questions = level2Questions[topMacroCategory.id];
      const subcategoryNames = topMacroCategory.subcategories;
      const scores: number[] = new Array(subcategoryNames.length).fill(0);

      questions.forEach((question, qIndex) => {
        const answerIndex = newAnswers[qIndex];
        const weights = question.weights[answerIndex];
        weights.forEach((weight, subcatIndex) => {
          scores[subcatIndex] += weight;
        });
      });

      console.log('Level 2 scores:', scores);

      // Trova la sottocategoria con il punteggio più alto
      const maxScoreIndex = scores.indexOf(Math.max(...scores));
      const topSubcategoryId = subcategoryNames[maxScoreIndex];
      const topSubcategory = subcategoryResults[topSubcategoryId];

      setFinalResult(topSubcategory);
      setPhase('result');
    }
  };

  const resetQuiz = () => {
    setPhase('level1');
    setCurrentQuestion(0);
    setLevel1Answers([]);
    setLevel2Answers([]);
    setTopMacroCategory(null);
    setFinalResult(null);
  };

  if (phase === 'result' && finalResult && topMacroCategory) {
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
                <h5 className="text-lg font-medium text-primary mb-2">{finalResult.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{finalResult.description}</p>
                <p className="text-xs text-gray-500">{finalResult.details}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={resetQuiz}
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
  }

  const isLevel2 = phase === 'level2';
  const questions: (NewQuizQuestion | SpecificQuestion)[] = isLevel2 
    ? level2Questions[topMacroCategory!.id] 
    : level1Questions;
  const currentQuestionData = questions[currentQuestion];
  const totalQuestions = isLevel2 ? 3 : level1Questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

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
                  ? `Livello 2: ${topMacroCategory!.name}`
                  : 'Livello 1: Orientamento generale'
                }
              </span>
              <span>Domanda {currentQuestion + 1} di {totalQuestions}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
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
                  ? handleLevel2Answer(index) 
                  : handleLevel1Answer(index)
                }
                className="quiz-option w-full text-left"
              >
                <div className="flex items-start">
                  <span className="text-primary font-medium mr-3 mt-1">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrientationQuiz;
