
import { useState } from 'react';
import { macroAreaQuestions, subsectionQuestions, macroAreaResults, subsectionResults } from '../data/orientationQuiz';

interface OrientationQuizProps {
  onClose: () => void;
}

const OrientationQuiz = ({ onClose }: OrientationQuizProps) => {
  const [phase, setPhase] = useState<'macro' | 'subsection' | 'result'>('macro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [macroAnswers, setMacroAnswers] = useState<number[]>([]);
  const [subsectionAnswers, setSubsectionAnswers] = useState<number[]>([]);
  const [topMacroArea, setTopMacroArea] = useState<string | null>(null);
  const [finalResult, setFinalResult] = useState<{ macroArea: string; subsection: string } | null>(null);

  const handleMacroAnswer = (optionIndex: number) => {
    const newAnswers = [...macroAnswers, optionIndex];
    setMacroAnswers(newAnswers);

    if (currentQuestion < macroAreaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcola il risultato della macro-area
      const scores = {
        finance: 0,
        consulting: 0,
        policy: 0,
        entrepreneurship: 0,
        business: 0,
        academic: 0
      };

      macroAreaQuestions.forEach((question, qIndex) => {
        const answerIndex = newAnswers[qIndex];
        Object.entries(question.weights).forEach(([category, weight]) => {
          if (scores.hasOwnProperty(category)) {
            scores[category as keyof typeof scores] += weight;
          }
        });
      });

      console.log('Macro area scores:', scores);

      const topArea = Object.entries(scores).reduce((a, b) => 
        scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
      )[0];

      setTopMacroArea(topArea);
      setPhase('subsection');
      setCurrentQuestion(0);
    }
  };

  const handleSubsectionAnswer = (optionIndex: number) => {
    const newAnswers = [...subsectionAnswers, optionIndex];
    setSubsectionAnswers(newAnswers);

    if (currentQuestion < 2) { // 3 domande subsection (0, 1, 2)
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcola il risultato della subsection
      if (!topMacroArea) return;

      const questions = subsectionQuestions[topMacroArea];
      const scores: Record<string, number> = {};

      // Inizializza scores per tutte le possibili subsection
      questions.forEach(question => {
        Object.keys(question.weights).forEach(key => {
          scores[key] = 0;
        });
      });

      questions.forEach((question, qIndex) => {
        const answerIndex = newAnswers[qIndex];
        Object.entries(question.weights).forEach(([category, weight]) => {
          scores[category] += weight;
        });
      });

      console.log('Subsection scores:', scores);

      const topSubsection = Object.entries(scores).reduce((a, b) => 
        scores[a[0]] > scores[b[0]] ? a : b
      )[0];

      setFinalResult({
        macroArea: topMacroArea,
        subsection: topSubsection
      });
      setPhase('result');
    }
  };

  const resetQuiz = () => {
    setPhase('macro');
    setCurrentQuestion(0);
    setMacroAnswers([]);
    setSubsectionAnswers([]);
    setTopMacroArea(null);
    setFinalResult(null);
  };

  if (phase === 'result' && finalResult) {
    const macroResult = macroAreaResults[finalResult.macroArea];
    const subsectionResult = subsectionResults[finalResult.subsection];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Il tuo profilo professionale!</h2>
            
            <div className="bg-primary/10 p-6 rounded-lg mb-4">
              <div className="flex items-center justify-center mb-3">
                <span className="text-3xl mr-3">{macroResult.icon}</span>
                <h3 className="text-xl font-semibold text-primary">{macroResult.name}</h3>
              </div>
              <p className="text-gray-700 mb-4">{macroResult.description}</p>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Specializzazione consigliata:</h4>
                <h5 className="text-lg font-medium text-primary mb-2">{subsectionResult.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{subsectionResult.description}</p>
                <p className="text-xs text-gray-500">{subsectionResult.details}</p>
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

  const isSubsectionPhase = phase === 'subsection';
  const questions = isSubsectionPhase ? subsectionQuestions[topMacroArea!] : macroAreaQuestions;
  const currentQuestionData = questions[currentQuestion];
  const totalQuestions = isSubsectionPhase ? 3 : macroAreaQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {isSubsectionPhase ? 'Specializzazione' : 'Quiz di Orientamento'}
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
                {isSubsectionPhase 
                  ? `Fase 2: ${macroAreaResults[topMacroArea!].name}`
                  : 'Fase 1: Macro-area'
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
                onClick={() => isSubsectionPhase 
                  ? handleSubsectionAnswer(index) 
                  : handleMacroAnswer(index)
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

export default OrientationQuiz;
