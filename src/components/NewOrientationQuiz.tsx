
import { useQuizLogic } from '../hooks/useQuizLogic';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

interface NewOrientationQuizProps {
  onClose: () => void;
  onExploreCareer: () => void;
}

const NewOrientationQuiz = ({ onClose, onExploreCareer }: NewOrientationQuizProps) => {
  const { state, handleLevel1Answer, handleLevel2Answer, resetQuiz } = useQuizLogic();

  if (state.phase === 'result' && state.finalResult && state.topMacroCategory) {
    return (
      <QuizResult
        topMacroCategory={state.topMacroCategory}
        finalResult={state.finalResult}
        onReset={resetQuiz}
        onClose={onClose}
        onExploreCareer={onExploreCareer}
      />
    );
  }

  return (
    <QuizQuestion
      phase={state.phase}
      currentQuestion={state.currentQuestion}
      topMacroCategoryId={state.topMacroCategory?.id}
      level1AnswersCount={state.level1Answers.length}
      level2AnswersCount={state.level2Answers.length}
      onLevel1Answer={handleLevel1Answer}
      onLevel2Answer={handleLevel2Answer}
      onClose={onClose}
    />
  );
};

export default NewOrientationQuiz;
