
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
      // Calcola il punteggio per ogni macro categoria usando newAnswers
      const scores = new Array(macroCategories.length).fill(0);

      level1Questions.forEach((question, qIndex) => {
        const answerIndex = newAnswers[qIndex];
        if (typeof answerIndex !== 'number') return;

        const weights = question.weights[answerIndex];
        if (!weights || !Array.isArray(weights)) return;
        
        console.log(`Question ${qIndex + 1}, Answer ${answerIndex}, Weights:`, weights);
        
        weights.forEach((weight, catIndex) => {
          if (typeof weight === 'number' && catIndex < scores.length) {
            scores[catIndex] += weight;
          }
        });
      });

      console.log('Final Level 1 scores:', scores);
      console.log('Categories:', macroCategories.map(cat => cat.name));

      // Trova la categoria con il punteggio più alto
      const maxScore = Math.max(...scores);
      const maxScoreIndex = scores.indexOf(maxScore);
      const topCategory = macroCategories[maxScoreIndex];

      console.log(`Top category: ${topCategory.name} with score: ${maxScore}`);

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
      // Calcola il punteggio per le sottocategorie usando newAnswers
      if (!topMacroCategory) return;

      const questions = level2Questions[topMacroCategory.id];
      const subcategoryNames = topMacroCategory.subcategories;
      const scores = new Array(subcategoryNames.length).fill(0);

      questions.forEach((question, qIndex) => {
        const answerIndex = newAnswers[qIndex];
        if (typeof answerIndex !== 'number') return;

        const weights = question.weights[answerIndex];
        if (!weights || !Array.isArray(weights)) return;
        
        console.log(`Level 2 Question ${qIndex + 1}, Answer ${answerIndex}, Weights:`, weights);
        
        weights.forEach((weight, subcatIndex) => {
          if (typeof weight === 'number' && subcatIndex < scores.length) {
            scores[subcatIndex] += weight;
          }
        });
      });

      console.log('Final Level 2 scores:', scores);
      console.log('Subcategories:', subcategoryNames);

      // Trova la sottocategoria con il punteggio più alto
      const maxScore = Math.max(...scores);
      const maxScoreIndex = scores.indexOf(maxScore);
      const topSubcategoryId = subcategoryNames[maxScoreIndex];
      const topSubcategory = subcategoryResults[topSubcategoryId];

      console.log(`Top subcategory: ${topSubcategory.name} with score: ${maxScore}`);

      setFinalResult(topSubcategory);
      setPhase('result');
    }
  };

  const getMicroareaForCategory = (categoryId: string): string => {
    const microareas: Record<string, string[]> = {
      finance: ['Investment Banking', 'Private Equity', 'Venture Capital', 'Hedge Funds', 'Quantitative Finance', 'Asset Management'],
      consulting: ['Strategy Consulting (MBB)', 'Management Consulting (Big 4)', 'Transformation Consulting'],
      policy: ['Diplomatic Services', 'International Organizations', 'Policy Research & Think Tanks'],
      business: ['Big Tech', 'Product Management', 'Corporate Strategy', 'Marketing & Brand Management', 'Human Resources'],
      entrepreneurship: ['Startup Founder', 'Chief Financial Officer (CFO)', 'Business Development'],
      academic: ['Economic Research', 'Financial Journalism', 'Data Analysis & Research']
    };
    
    const categoryMicroareas = microareas[categoryId] || [];
    return categoryMicroareas[Math.floor(Math.random() * categoryMicroareas.length)] || 'Area specialistica';
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
                <p className="text-xs text-gray-500 mb-3">{finalResult.details}</p>
                
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Microarea consigliata:</span> {getMicroareaForCategory(topMacroCategory.id)}
                  </p>
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
  
  // Calcola il numero di domande completate (non quella attuale)
  const completedQuestions = isLevel2 ? 7 + level2Answers.length : level1Answers.length;
  const currentQuestionNumber = completedQuestions + 1;
  const progress = (completedQuestions / 10) * 100; // Barra di progresso basata sulle domande completate

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
               <span>Domanda {currentQuestionNumber} di 10</span>
            </div>
            
            {/* Barra di progresso personalizzata che si colora di navy */}
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
