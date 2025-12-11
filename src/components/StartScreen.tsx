import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import duck1 from 'figma:asset/24602f73b6b6bd422ad4c5da020fbf656668311b.png';

interface StartScreenProps {
  onStart: (name: string) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #FFE5E9 0%, #FFF0F2 50%, #FFE5E9 100%)' }}>
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top Image */}
          <div className="relative h-64 overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(157,34,53,0.1) 0%, rgba(214,37,42,0.1) 100%)' }} />
            <img
              src={duck1}
              alt="Character"
              className="w-full h-full object-contain p-8"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" style={{ color: '#D6252A' }} />
                <h1 style={{ 
                  background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  성격 유형 테스트
                </h1>
                <Sparkles className="w-6 h-6" style={{ color: '#9D2235' }} />
              </div>
              <p className="text-gray-600">
                12개의 질문으로 알아보는<br />나의 진짜 성격 유형
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  이름을 입력해주세요
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-colors"
                  onFocus={(e) => e.target.style.borderColor = '#D6252A'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)' }}
              >
                시작하기
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                💡 솔직하게 답변하면 더 정확한 결과를 얻을 수 있어요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}