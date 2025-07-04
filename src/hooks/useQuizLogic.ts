
import { useState } from 'react';
import { 
  level1Questions, 
  level2Questions, 
  macroCategories, 
  subcategoryResults,
  type MacroCategory,
  type SubcategoryResult
} from '../data/newOrientationQuiz';

export type QuizPhase = 'level1' | 'level2' | 'result';

export interface QuizState {
  phase: QuizPhase;
  currentQuestion: number;
  level1Answers: number[];
  level2Answers: number[];
  topMacroCategory: MacroCategory | null;
  finalResult: SubcategoryResult | null;
}

export const useQuizLogic = () => {
  const [state, setState] = useState<QuizState>({
    phase: 'level1',
    currentQuestion: 0,
    level1Answers: [],
    level2Answers: [],
    topMacroCategory: null,
    finalResult: null
  });

  const calculateLevel1Result = (answers: number[]): MacroCategory => {
    const scores = new Array(macroCategories.length).fill(0);

    answers.forEach((answerIndex, questionIndex) => {
      const question = level1Questions[questionIndex];
      if (!question) return;

      const weights = question.weights[answerIndex];
      if (!Array.isArray(weights)) return;

      weights.forEach((weight, categoryIndex) => {
        if (typeof weight === 'number' && categoryIndex < scores.length) {
          scores[categoryIndex] += weight;
        }
      });
    });

    console.log('Level 1 Final Scores:', scores);
    console.log('Categories:', macroCategories.map(cat => cat.name));

    const maxScoreIndex = scores.indexOf(Math.max(...scores));
    const topCategory = macroCategories[maxScoreIndex];
    
    console.log(`Top category: ${topCategory.name} with score: ${scores[maxScoreIndex]}`);
    
    return topCategory;
  };

  const calculateLevel2Result = (answers: number[], macroCategory: MacroCategory): SubcategoryResult => {
    const questions = level2Questions[macroCategory.id];
    const subcategoryNames = macroCategory.subcategories;
    const scores = new Array(subcategoryNames.length).fill(0);

    answers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      if (!question) return;

      const weights = question.weights[answerIndex];
      if (!Array.isArray(weights)) return;

      weights.forEach((weight, subcategoryIndex) => {
        if (typeof weight === 'number' && subcategoryIndex < scores.length) {
          scores[subcategoryIndex] += weight;
        }
      });
    });

    console.log('Level 2 Final Scores:', scores);
    console.log('Subcategories:', subcategoryNames);

    const maxScoreIndex = scores.indexOf(Math.max(...scores));
    const topSubcategoryId = subcategoryNames[maxScoreIndex];
    const topSubcategory = subcategoryResults[topSubcategoryId];

    console.log(`Top subcategory: ${topSubcategory.name} with score: ${scores[maxScoreIndex]}`);

    return topSubcategory;
  };

  const handleLevel1Answer = (optionIndex: number) => {
    const newAnswers = [...state.level1Answers, optionIndex];
    
    if (state.currentQuestion < level1Questions.length - 1) {
      setState(prev => ({
        ...prev,
        level1Answers: newAnswers,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      const topCategory = calculateLevel1Result(newAnswers);
      
      setState(prev => ({
        ...prev,
        level1Answers: newAnswers,
        topMacroCategory: topCategory,
        phase: 'level2',
        currentQuestion: 0
      }));
    }
  };

  const handleLevel2Answer = (optionIndex: number) => {
    const newAnswers = [...state.level2Answers, optionIndex];
    
    if (state.currentQuestion < 2) { // 3 domande (0, 1, 2)
      setState(prev => ({
        ...prev,
        level2Answers: newAnswers,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      if (!state.topMacroCategory) return;
      
      const finalResult = calculateLevel2Result(newAnswers, state.topMacroCategory);
      
      setState(prev => ({
        ...prev,
        level2Answers: newAnswers,
        finalResult,
        phase: 'result'
      }));
    }
  };

  const resetQuiz = () => {
    setState({
      phase: 'level1',
      currentQuestion: 0,
      level1Answers: [],
      level2Answers: [],
      topMacroCategory: null,
      finalResult: null
    });
  };

  return {
    state,
    handleLevel1Answer,
    handleLevel2Answer,
    resetQuiz
  };
};
