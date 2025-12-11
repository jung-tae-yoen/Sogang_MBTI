import { Scores } from '../App';

interface QuestionScreenProps {
  questionNumber: number;
  onAnswer: (type: keyof Scores) => void;
}

interface Question {
  question: string;
  optionA: {
    text: string;
    type: keyof Scores;
  };
  optionB: {
    text: string;
    type: keyof Scores;
  };
}

const questions: Question[] = [
  {
    question: '주말에 나는?',
    optionA: { text: '쉬는 날이니 친구들을 만나서 재밌게 놀자!', type: 'E' },
    optionB: { text: '쉬는 날이니 집에만 있어야지', type: 'I' },
  },
  {
    question: '인생 목표를 말할 때 나는?',
    optionA: { text: '구체적이고 실현 가능한 목표를 세움', type: 'S' },
    optionB: { text: '막연하지만 큰 그림을 먼저 그려놓음', type: 'N' },
  },
  {
    question: '더 화나는 상황은?',
    optionA: { text: '좋은 마음으로 날 위해 커피를 사왔는데 내 과제에 부어버린 영희', type: 'T' },
    optionB: { text: '흑심을 품고 내 과제를 베껴간 철수', type: 'F' },
  },
  {
    question: '여행을 준비 할 때 나는?',
    optionA: { text: '오늘은 이 시간에 일어나서 이 시간동안 준비하고 뭘 타고 어딜 가서 ….', type: 'J' },
    optionB: { text: '호텔이랑 비행기표만 사면 끝~', type: 'P' },
  },
  {
    question: '새로운 관계는?',
    optionA: { text: '흥미롭고 기대된다', type: 'E' },
    optionB: { text: '조심스럽고 피곤하다', type: 'I' },
  },
  {
    question: '옷을 살 때 나는?',
    optionA: { text: '소재, 핏, 활용도를 중점으로 본다', type: 'S' },
    optionB: { text: '그 옷을 입은 나를 상상해본다', type: 'N' },
  },
  {
    question: '대화를 나눌 때 나는?',
    optionA: { text: '정확한 말과 표현이 중요하다', type: 'T' },
    optionB: { text: '의도와 맥락이 중요하다', type: 'F' },
  },
  {
    question: '나에게 스트레스를 주는건?',
    optionA: { text: '계획대로만 살아야하는 상황', type: 'P' },
    optionB: { text: '계획 없이 흘러가는 시간', type: 'J' },
  },
  {
    question: '낯선 사람에게 먼저 다가가는건',
    optionA: { text: '별로 어렵지 않다', type: 'E' },
    optionB: { text: '엄청난 용기가 필요하다', type: 'I' },
  },
  {
    question: '비행기를 탈 때 내가 하는 생각은?',
    optionA: { text: '비행기 추락 하면 어떡하지? 아 근데 추락할 확률 되게 낮지 않나? 아니 근데 혹시 그 확률이? 떨어지면 무인도에 떨어질라나? 그러면 어떻게 살아남지? 칼도 없이?', type: 'N' },
    optionB: { text: '아 ㅋㅋ 기대된다 근데 자리가 창가 쪽이 아니면 어떡하지?', type: 'S' },
  },
  {
    question: '누군가 "야, 너 열심히 안 한 것 같은데 잘했다. 재능있는데?" 라고 한다면',
    optionA: { text: '나 천azen가? 재능있다는 말에 기분 좋은데?', type: 'T' },
    optionB: { text: '너가 뭔데 내 노력을 폄하해? 나 노력했어', type: 'F' },
  },
  {
    question: '일처리를 할 때 나는?',
    optionA: { text: '마감 직전에 집중해서 몰아침', type: 'P' },
    optionB: { text: '마감 훨씬 전부터 시작하고 중간 점검함', type: 'J' },
  },
];

export function QuestionScreen({ questionNumber, onAnswer }: QuestionScreenProps) {
  const question = questions[questionNumber];
  const progress = ((questionNumber + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #FFE5E9 0%, #FFF0F2 50%, #FFE5E9 100%)' }}>
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              질문 {questionNumber + 1} / {questions.length}
            </span>
            <span className="text-sm" style={{ color: '#D6252A' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #9D2235 0%, #D6252A 100%)'
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-center mb-12" style={{ 
            background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {question.question}
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => onAnswer(question.optionA.type)}
              className="w-full p-6 rounded-2xl border-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-left shadow-md hover:shadow-xl"
              style={{
                background: 'linear-gradient(to right, #FFF5F7, #FFE5EB)',
                borderColor: '#FFCDD6'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D6252A';
                e.currentTarget.style.background = 'linear-gradient(to right, #FFE5EB, #FFD4DF)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#FFCDD6';
                e.currentTarget.style.background = 'linear-gradient(to right, #FFF5F7, #FFE5EB)';
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{ background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)' }}
                >
                  A
                </div>
                <span className="text-gray-800">{question.optionA.text}</span>
              </div>
            </button>

            <button
              onClick={() => onAnswer(question.optionB.type)}
              className="w-full p-6 rounded-2xl border-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-left shadow-md hover:shadow-xl"
              style={{
                background: 'linear-gradient(to right, #FFF5F7, #FFE5EB)',
                borderColor: '#FFCDD6'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#9D2235';
                e.currentTarget.style.background = 'linear-gradient(to right, #FFE5EB, #FFD4DF)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#FFCDD6';
                e.currentTarget.style.background = 'linear-gradient(to right, #FFF5F7, #FFE5EB)';
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{ background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)' }}
                >
                  B
                </div>
                <span className="text-gray-800">{question.optionB.text}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}