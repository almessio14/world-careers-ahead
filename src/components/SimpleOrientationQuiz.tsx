
import { useSimpleQuizLogic } from '../hooks/useSimpleQuizLogic';
import SimpleQuizQuestion from './SimpleQuizQuestion';
import SimpleQuizResult from './SimpleQuizResult';

interface SimpleOrientationQuizProps {
  onClose: () => void;
  onExploreCareer: () => void;
}

const SimpleOrientationQuiz = ({ onClose, onExploreCareer }: SimpleOrientationQuizProps) => {
  const {
    state,
    selectMainAnswer,
    selectSpecificAnswer,
    restartQuiz,
    getCurrentQuestion,
    getTotalQuestions,
    getCurrentQuestionNumber,
    getProgress,
    categoryMapping
  } = useSimpleQuizLogic();

  if (state.phase === 'result') {
    return (
      <SimpleQuizResult
        selectedCategory={state.selectedCategory}
        finalMicroCategory={state.finalMicroCategory}
        mainScores={state.mainScores}
        specificScores={state.specificScores}
        categoryMapping={categoryMapping}
        onReset={restartQuiz}
        onClose={onClose}
        onExploreCareer={onExploreCareer}
      />
    );
  }

  return (
    <SimpleQuizQuestion
      phase={state.phase}
      currentQuestion={getCurrentQuestion()}
      currentQuestionNumber={getCurrentQuestionNumber()}
      totalQuestions={getTotalQuestions()}
      progress={getProgress()}
      selectedCategory={state.selectedCategory}
      onMainAnswer={selectMainAnswer}
      onSpecificAnswer={selectSpecificAnswer}
      onClose={onClose}
    />
  );
};

export default SimpleOrientationQuiz;
