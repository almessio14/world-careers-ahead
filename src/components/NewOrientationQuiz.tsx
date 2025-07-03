
import { useState, useEffect } from 'react';
import { Progress } from './ui/progress';
import { fetchInitialQuestions, fetchSecondaryQuestions } from '../services/quizService';
import { 
  macroCategories, 
  subcategoryResults,
  type MacroCategory,
  type SubcategoryResult
} from '../data/newOrientationQuiz';

interface NewOrientationQuizProps {
  onClose: () => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  weights: Record<string, any>;
}

const NewOrientationQuiz = ({ onClose }: NewOrientationQuizProps) => {
  const [phase, setPhase] = useState<'level1' | 'level2' | 'result' | 'loading'>('loading');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [level1Questions, setLevel1Questions] = useState<QuizQuestion[]>([]);
  const [level2Questions, setLevel2Questions] = useState<QuizQuestion[]>([]);
  const [level1Answers, setLevel1Answers] = useState<string[]>([]);
  const [level2Answers, setLevel2Answers] = useState<string[]>([]);
  const [topMacroCategory, setTopMacroCategory] = useState<MacroCategory | null>(null);
  const [finalResult, setFinalResult] = useState<SubcategoryResult | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchInitialQuestions();
        setLevel1Questions(questions);
        setPhase('level1');
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };
    loadQuestions();
  }, []);

  const handleLevel1Answer = async (optionIndex: number) => {
    const selectedOption = String.fromCharCode(65 + optionIndex); // A, B, C, D
    const newAnswers = [...level1Answers, selectedOption];
    setLevel1Answers(newAnswers);

    if (currentQuestion < level1Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcola il punteggio per ogni macro categoria
      const scores = {
        finance: 0,
        consulting: 0,
        policy: 0,
        business: 0,
        entrepreneurship: 0,
        academic: 0
      };

      level1Questions.forEach((question, qIndex) => {
        const selectedAnswer = newAnswers[qIndex];
        const weights = question.weights[selectedAnswer];
        if (weights) {
          scores.finance += weights.finance || 0;
          scores.consulting += weights.consulting || 0;
          scores.policy += weights.policy || 0;
          scores.business += weights.business || 0;
          scores.entrepreneurship += weights.entrepreneurship || 0;
          scores.academic += weights.academic || 0;
        }
      });

      console.log('Level 1 scores:', scores);

      // Trova la categoria con il punteggio più alto
      const maxCategory = Object.keys(scores).reduce((a, b) => 
        scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b
      );
      
      const topCategory = macroCategories.find(cat => cat.id === maxCategory);
      
      if (topCategory) {
        setTopMacroCategory(topCategory);
        
        // Carica le domande secondarie
        try {
          const secondaryQuestions = await fetchSecondaryQuestions(maxCategory);
          setLevel2Questions(secondaryQuestions);
          setPhase('level2');
          setCurrentQuestion(0);
        } catch (error) {
          console.error('Error loading secondary questions:', error);
        }
      }
    }
  };

  const handleLevel2Answer = (optionIndex: number) => {
    const selectedOption = String.fromCharCode(65 + optionIndex);
    const newAnswers = [...level2Answers, selectedOption];
    setLevel2Answers(newAnswers);

    if (currentQuestion < level2Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcola il punteggio per le sottocategorie
      if (!topMacroCategory) return;

      const subcategoryNames = topMacroCategory.subcategories;
      const scores: Record<string, number> = {};
      
      // Inizializza tutti i punteggi
      subcategoryNames.forEach(subcat => {
        scores[subcat] = 0;
      });

      level2Questions.forEach((question, qIndex) => {
        const selectedAnswer = newAnswers[qIndex];
        const weights = question.weights[selectedAnswer];
        if (weights) {
          Object.keys(weights).forEach(key => {
            if (scores.hasOwnProperty(key)) {
              scores[key] += weights[key] || 0;
            }
          });
        }
      });

      console.log('Level 2 scores:', scores);

      // Trova la sottocategoria con il punteggio più alto
      const maxSubcategory = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
      );
      
      const topSubcategory = subcategoryResults[maxSubcategory];
      
      if (topSubcategory) {
        setFinalResult(topSubcategory);
        setPhase('result');
      }
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

  if (phase === 'loading') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full text-center">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Caricamento Quiz...</h2>
          <p className="text-gray-600">Stiamo preparando le domande per te</p>
        </div>
      </div>
    );
  }

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
  const questions = isLevel2 ? level2Questions : level1Questions;
  
  if (!questions || questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Errore caricamento</h2>
          <p className="text-gray-600 mb-4">Non è stato possibile caricare le domande</p>
          <button
            onClick={onClose}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const totalQuestions = isLevel2 ? level2Questions.length : level1Questions.length;
  const completedLevel1 = level1Questions.length;
  const currentQuestionNumber = isLevel2 ? completedLevel1 + currentQuestion + 1 : currentQuestion + 1;
  const totalAllQuestions = level1Questions.length + (isLevel2 ? level2Questions.length : 3);
  const progress = (currentQuestionNumber / totalAllQuestions) * 100;

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
               <span>Domanda {currentQuestionNumber} di {totalAllQuestions}</span>
            </div>
            <Progress value={progress} className="w-full" />
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
