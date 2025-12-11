import { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultScreen } from './components/ResultScreen';

export type Screen = 'start' | 'question' | 'result';

export interface Scores {
  E: number; // Extroversion
  I: number; // Introversion
  S: number; // Sensing
  N: number; // Intuition
  T: number; // Thinking
  F: number; // Feeling
  J: number; // Judging
  P: number; // Perceiving
}

// MBTI 조합을 typeA~typeP로 매핑
export const mbtiToType: Record<string, keyof OldScores> = {
  ENFJ: 'typeA',
  ENFP: 'typeB',
  ENTJ: 'typeC',
  ENTP: 'typeD',
  ESFJ: 'typeE',
  ESFP: 'typeF',
  ESTJ: 'typeG',
  ESTP: 'typeH',
  INFJ: 'typeI',
  INFP: 'typeJ',
  INTJ: 'typeK',
  INTP: 'typeL',
  ISFJ: 'typeM',
  ISFP: 'typeN',
  ISTJ: 'typeO',
  ISTP: 'typeP',
};

export interface OldScores {
  typeA: number;
  typeB: number;
  typeC: number;
  typeD: number;
  typeE: number;
  typeF: number;
  typeG: number;
  typeH: number;
  typeI: number;
  typeJ: number;
  typeK: number;
  typeL: number;
  typeM: number;
  typeN: number;
  typeO: number;
  typeP: number;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [userName, setUserName] = useState('');
  const [scores, setScores] = useState<Scores>({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStart = (name: string) => {
    setUserName(name);
    setCurrentScreen('question');
  };

  const handleAnswer = (type: keyof Scores) => {
    setScores((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    if (currentQuestion < 11) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 마지막 질문 후 웹훅 호출
      const finalScores = {
        ...scores,
        [type]: scores[type] + 1,
      };
      callWebhook(userName, finalScores);
      setCurrentScreen('result');
    }
  };

  const callWebhook = async (name: string, finalScores: Scores) => {
    // MBTI 조합 계산
    const mbtiType = 
      (finalScores.E >= finalScores.I ? 'E' : 'I') +
      (finalScores.S >= finalScores.N ? 'S' : 'N') +
      (finalScores.T >= finalScores.F ? 'T' : 'F') +
      (finalScores.J >= finalScores.P ? 'J' : 'P');
    
    // 웹훅 URL을 여기에 설정하세요
    const webhookUrl = 'YOUR_MAKE_WEBHOOK_URL_HERE';
    
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: name,
          mbtiType: mbtiType,
          E: finalScores.E,
          I: finalScores.I,
          S: finalScores.S,
          N: finalScores.N,
          T: finalScores.T,
          F: finalScores.F,
          J: finalScores.J,
          P: finalScores.P,
        }),
      });
      console.log('웹훅 호출 성공');
    } catch (error) {
      console.error('웹훅 호출 실패:', error);
    }
  };

  const handleRestart = () => {
    setCurrentScreen('start');
    setUserName('');
    setScores({
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    });
    setCurrentQuestion(0);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #FFF5F7, #FFE5EB)' }}>
      {currentScreen === 'start' && <StartScreen onStart={handleStart} />}
      {currentScreen === 'question' && (
        <QuestionScreen
          questionNumber={currentQuestion}
          onAnswer={handleAnswer}
        />
      )}
      {currentScreen === 'result' && (
        <ResultScreen
          userName={userName}
          scores={scores}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;