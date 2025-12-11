import { useRef } from "react";
import { Scores, mbtiToType, OldScores } from "../App";
import { Download, Share2, RefreshCw } from "lucide-react";
import html2canvas from "html2canvas";

interface ResultScreenProps {
  userName: string;
  scores: Scores;
  onRestart: () => void;
}

interface PersonalityType {
  type: string;
  title: string;
  description: string;
  catchphrase: string;
  image: string;
  color: string;
}

// 이미지를 직접 넣으려면:
// 1. 온라인 이미지 URL을 사용하거나
// 2. image 속성에 직접 URL을 입력하세요
const personalityTypes: Record<keyof OldScores, PersonalityType> =
  {
    typeA: {
      type: "Type A",
      title: "피곤한 사교형",
      catchphrase: "사람은 참.. 피곤한데 좋다!",
      description:
        '때때로 감수성에 젖은 말을 해도 오그라들지 마.\n칭찬은 구체적으로 해줘!\n사람들이 내 단순한 호의를 관심으로 착각하지 않았으면 좋겠어..\n싫어하는 사람 앞에서도 나도 모르게 다정하고 밝은 척 하게 된다..\n놀러갈때 그냥 내가 총대 매고 계획 하는게 나아!\n다른 사람들은 오지랖이라지만 이게 내 애정이야..\n너를 진심으로 이해하기 힘들 경우 "그럴 수도 있지"하는 마음으로 넘어갈게.\n내가 한번 아니라고 하면 아닌거야.\n네 말이 틀린 것 같아도 겉으로는 맞다고 맞장구 쳐줄 수 있어.\n무례하고 융통성 없이 사사건건 따지려드는 사람은 피곤해.',
      image: "https://i.ibb.co/MkQWR75T/typeA.png",
      color: "from-rose-400 to-pink-500",
    },
    typeB: {
      type: "Type B",
      title: "행복 바이러스",
      catchphrase: "너무너무 행복해~ 너무너무 즐거워~",
      description:
        "무리중에 나보다 나대는 친구가 있으면 난 조용해져..\n적막을 못 견뎌!\n태생이 게으르지만 민폐 끼치는건 싫어!\n난 어쨌든 성공 할 것 같아!\n나를 진짜 화나게 해도 그 사람이 진심으로 미안해하거나 나한테 잘해주면 맘 약해져..\n내 말에 웃어주면 하늘나라 가.\n온 우주가 내 중심이였으면~!\n노는게 제일 좋아~\n하나에 쉽게 몰두하는 편이지만 또 쉽게 식는 편이야..\n내가 널 사랑하는 만큼만 너도 날 사랑했으면.",
      image: "https://i.ibb.co/XN6YsTL/typeB.png",
      color: "from-yellow-400 to-orange-500",
    },
    typeC: {
      type: "Type C",
      title: "스토리 중독자",
      catchphrase: "그래서 그 다음엔?",
      description:
        "모든 일은 완벽하게!\n아는 게 힘이다!\n세상에 믿을 사람은 오직 나 하나!\n시원찮은 사람한테 맡기느니 내가 다 할게.\n열등감? 그게 뭐에요?\n피해 주는 거 너~무 싫어.\n아니 이걸 왜 못해?\n억지로 해야하는거 그냥 빨리 끝내고 놀자.\n혼자있을땐 상상의 나래에 빠져있어.\n내가 자기애가 좀 강한 편이라 너무 상처 받진 마~",
      image: "https://i.ibb.co/ZzPWTBvv/typeC.png",
      color: "from-blue-400 to-cyan-500",
    },
    typeD: {
      type: "Type D",
      title: "이유 탐구자",
      catchphrase: "왜 안되는데? 이유가 뭔데? 왜?",
      description:
        "혼자서 돌아다니는게 제일 편해!\n나한테 잘해주는 사람은 두 배로 잘해주고 나한테 못 해주면 국물도 없어.\n내 의견이랑 달라? 아니 잠깐만 내 말 좀 들어봐..\n성공이면 완전 성공, 바닥을 치면 아예 방탕, 중간은 없다!\n감정기복 심한거 얼굴에서 다 티 남.\n뒷심~ 부족! 끈기~ 부족! 의지~ 부족!\n무식한 사람 진짜 이해 못 하겠다.\n정해진 틀? 갇힌 생활? 나한테 가져오지 마.\n난 다방면에 다 적당히 재능있는데 엄청 잘 하진 않아 ㅎ\n직설적으로 솔직하게 내 마음을 표현할게.",
      image: "https://i.ibb.co/0jxypC0j/typeD.png",
      color: "from-purple-400 to-indigo-500",
    },
    typeE: {
      type: "Type E",
      title: "타고난 리더",
      catchphrase: "얘들아 모여봐 내가 있잖아",
      description:
        "어우 스트레스 받아 수다 떨어야지.\n내가 경험해보지 않으면 다 못 믿어!\n계획하지 않았던 일을 겪거나 방해를 받으면 너무 스트레스!\n내 사람은 내가 챙긴다!\n다들 나한테 사회생활 잘 한대.\n싫은 사람이랑도 티 안내고 잘 지내는 척 할 수 있어.\n난 생각보다 철저하고 현실주의적이야.\n난 눈치가 굉장히 빠르지.\n술 자리 좋아 모임 좋아~\n너네가 불행하면 나도 불행 해 ㅠㅠ",
      image: "https://i.ibb.co/KzRdtrC3/typeE.png",
      color: "from-red-400 to-rose-500",
    },
    typeF: {
      type: "Type F",
      title: "모험가",
      catchphrase: "우와~ 대박, 재밌겠다",
      description:
        "다른 사람을 기쁘게 해줄 깜짝쇼 최고야~ 너무 재밌어~\n무계획 여행이 제일 신나~\n발등에 불 떨어져야 행동 해~\n흥분하기 쉽고 목소리가 커~\n혼자 있는건 싫어..\n조직생활 노! 자유로움 예스!\n돈이 있으면 써야지~\n난 정이 너무 많아..\n거절 잘 하고 싶다..\n단순하게 살자~",
      image: "https://i.ibb.co/mrcRqKJJ/typeF.png",
      color: "from-green-400 to-emerald-500",
    },
    typeG: {
      type: "Type G",
      title: "자신감 충만형",
      catchphrase: "이게 어려워? 그냥 해!",
      description:
        "남한테 관심? 없어 나 하나 밥 벌어먹기도 쉽지 않어.\n고집 쎈게 뭐 왜.\n내 시간 방해 하지 마.\n날 지적할려면 근거를 대.\n일 잘하는 사람이 제일 좋은 사람~\n일에서 인정 받을 때 살아있음을 느껴.\n하루가 48시간 아니 72시간이면 좋겠다.\n시간 약속 어기면 죽인다.\n너가 일 못하는걸 보느니 차라리 내가 다 할게.\n딱 봐도 너가 잘 못 했는데 상처받을까봐 얘기는 안 할게.",
      image: "https://i.ibb.co/HLcN2CQ9/typeG.png",
      color: "from-orange-400 to-red-500",
    },
    typeH: {
      type: "Type H",
      title: "재미 추구형",
      catchphrase: "이건 못 참지 개 꿀잼일듯?",
      description:
        '표현 아끼다 똥 돼~\n하고 싶은건 다 하고 죽어야지.\n눈치 빠르고 뒤끝 없으~\n대충 살자~\n제발 돌려말하지 좀 마.\n"또라이"라는 말이 나한테 최고 칭찬~\n눈 떠 보니 내가 모임을 주도 하고 있네.\n밖에서 사람 만나는 건 좋은데 나가기가 싫다.\n친화력 최고~\n자존감 높고 근자감 떨어서 맨날 합리화~\n액 tremend 했다 치지 뭐~',
      image: "https://i.ibb.co/JYfXGhD/typeH.png",
      color: "from-pink-400 to-fuchsia-500",
    },
    typeI: {
      type: "Type I",
      title: "감정 숨김형",
      catchphrase: "난 괜찮아 (안 괜찮아)",
      description:
        "아무것도 안 했는데 왜 이렇게 기빨리지.\n내가 좋아하는 주제로 얘기해야 말이 나와.\n관심은 받고 싶은데 나서는건 싫어.\n내 사람은 끝까지 챙긴다.\n겉으론 웃고 있어도 속에선 욕하고 있을지도.\n새로운 일, 새로운 사람 극혐!\n내가 하고 싶은건 열심히 하는 편.\n혼자 생각 정리할 시간 꼭 필요 해!\n무슨 말을 하더라도 근거를 갖고 와!\n예쁜 말 좋아 욕은 내 앞에서 하지 마.",
      image: "https://i.ibb.co/rK419vNY/typeI.png",
      color: "from-slate-400 to-gray-500",
    },
    typeJ: {
      type: "Type J",
      title: "신중파",
      catchphrase: "여기서 소리 지르면 안 되겠지..?",
      description:
        "스트레스 받으면 옛날 나쁜 기억들이 자꾸 생각나서 짜증나!\n남들이 별거 아니라고 생각하는 일에도 큰 충격과 고통을 받아.\n씻기 귀찮은데 다른 사람들이 싫어하니 씻어야지.\n작은 일에도 뭔가 미안해.\n나를 존중 해줘.\n싸우느니 내가 양보 할게.\n가끔 내가 우울한게 좀 멋있는듯.\n한번 싫은건 끝까지 싫어!\n누가 내 가치관에 뭐라 하는건 너무 싫어!\n혼자 있는 건 좋은데 외로운건 싫어.",
      image: "https://i.ibb.co/Rxy6PbV/typeJ.png",
      color: "from-teal-400 to-blue-500",
    },
    typeK: {
      type: "Type K",
      title: "질문왕",
      catchphrase: "무슨 소리야 그게? 뭐 하는데?",
      description:
        "혼자 있는거 너무 좋아.\n사람 많고 시끄러운 곳 너무 싫어.\n사실과 원리원칙이 중요하지 감정에 휘둘리는게 제일 싫어.\n해결은 해줄게 위로는 못 해.\n사람한테 정 붙이는데 오래 걸리고 끊는건 빠른편.\n할 땐 할게 근데 안 할 땐 절대 안 해.\n무신경하다는 말 너무 많이 들었어.\n근데 좋아하는 거엔 무섭게 집착하는 편.\n동물한테는 한 없이 친절해~\n인간은 어리석고 불완전한 존재일 뿐.",
      image: "https://i.ibb.co/LzxKkXzs/typeK.png",
      color: "from-violet-400 to-purple-500",
    },
    typeL: {
      type: "Type L",
      title: "효율주의자",
      catchphrase: "이 정도면 충분하지 ㅋ 귀찮아",
      description:
        "난 논리적으로 문제를 잘 해결하고 문제 해결 하는 걸 즐겨.\n좋아하는 분야에서는 내가 짱!\n능력있는 사람 너무 멋있다..\n나도 저렇게 돼야지.\n내가 원하는게 아니면 애초에 관심 없어.\n혼자 있는게 제일 편하고 ���다.\n내 말투가 원해 이래.\n어후 하기 싫어 어흑.\n아무리 친한 친구라도 별 일 없으면 연락하지 말아줘.\n무지하고 논리 없이 떠드는 사람보면 나도 모르게 주먹 날라갈 수도.",
      image: "https://i.ibb.co/twhdzFdJ/typeL.png",
      color: "from-amber-400 to-yellow-500",
    },
    typeM: {
      type: "Type M",
      title: "순응형",
      catchphrase: "나 진짜 괜찮아, 아무거나~",
      description:
        "외로움은 많이 타지만 사람들이랑 있는건 싫어.\n겉으론 무덤덤 해 보여도 속으론 온갖 생각 다 하는 중.\n나서는 건 싫은데 관심 받는건 좋아.\n나랑 한번 친구하면 오래간다.\n사람한테 기대를 많이 하니 그만큼 실망도 많이 해..\n내가 챙김 받는것보다 내가 챙겨주는게 편해.\n친한 사람 단 둘이 노는게 최고야.\n혼자 무대에서 춤추고 인기 많아지는 망상 해봤다.\n성격이 온화해 하자고 하면 거의 다 해줄게.\n인간관계는 나한테 너무 스트레스야.",
      image: "https://i.ibb.co/B2PsFWtN/typeM.png",
      color: "from-lime-400 to-green-500",
    },
    typeN: {
      type: "Type N",
      title: "무관심형",
      catchphrase: "응? 못 들었어 (아 너무 귀찮다)",
      description:
        "그냥 귀찮아 다 귀찮아..\n행동은 거북이..\n모든 일을 미룰 수 있을 때까지 미루자!\n집이 최고야 약속 취소 최고야.\n칭찬이 고파.\n사람들이랑 만나면 너무 기빨려.\n나도 논리적으로 싸우고 싶은데 자꾸 감정이 앞서네.\n나한테 부정적으로 말하지 마.\n난 안 착한데 왜 사람들은 나한테 착하다할까.\n민폐 끼치는 거 싫어 싫은 소리 하는것도 싫어.",
      image: "https://i.ibb.co/4w3RKnBS/typeN.png",
      color: "from-zinc-400 to-slate-500",
    },
    typeO: {
      type: "Type O",
      title: "진지충",
      catchphrase: "아 드립이였구나 하..하..",
      description:
        "우울할땐 우울함을 즐기자.\n공감능력 부족하다는 소리 의외로 많이 들어봤다.\n쓸데 없는 말, 아부 절대 못 해!\n갑작스러운 변화 너무너무 싫어.\n남들한테 일 시키는게 너무 어려워..\n그냥 내가 다 할게.\n남 의견? 나한텐 중요하지 않아.\n99%의 가능성보다 1%의 실패 가능성이 더 무서워.\n즉흥적인거 싫어! 무조건 계획을 세우자!\n전통과 질서는 지키라고 있는거지.\n내 얘기 하는 것도 어렵고 남 얘기 듣는 것도 어려워.",
      image: "https://i.ibb.co/jppGpLc/typeO.png",
      color: "from-sky-400 to-blue-500",
    },
    typeP: {
      type: "Type P",
      title: "독립형",
      catchphrase: "신경 꺼 내가 알아서 할게",
      description:
        "제발 요점만 말해줘.\n인스타는 무조건 비공개지.\n빈말 못하겠어 애정표현 못하겠어.\n나한테 고민 얘기 하지 마..\n공감 못 해..\n관심 있고 하고 싶은 일만 할래.\n답장 할 게 없으면 답장 안 해도 되지?\n일반적으로 조용하지만 필요에 의해서는 사교적인 척 할 수 있어.\n얘기하는거 자체로 귀찮다.\n막상 친해지면 핵인싸야.\n당연히 규칙 설명 했을 때 듣고 있었지..!\n그냥..\n딱히 관심 없었어.",
      image: "https://i.ibb.co/1GqqgMxn/typeP.png",
      color: "from-indigo-400 to-violet-500",
    },
  };

export function ResultScreen({
  userName,
  scores,
  onRestart,
}: ResultScreenProps) {
  const resultRef = useRef<HTMLDivElement>(null);

  // MBTI 조합 계산
  const getMBTIType = (): string => {
    const mbtiType = 
      (scores.E >= scores.I ? 'E' : 'I') +
      (scores.S >= scores.N ? 'S' : 'N') +
      (scores.T >= scores.F ? 'T' : 'F') +
      (scores.J >= scores.P ? 'J' : 'P');
    return mbtiType;
  };

  const mbtiType = getMBTIType();
  const personalityKey = mbtiToType[mbtiType];
  const personality = personalityTypes[personalityKey];

  const handleSaveImage = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `${userName}_성격유형테스트_결과.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("이미지 저장 실패:", error);
      alert("이미지 저장에 실패했습니다.");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "성격 유형 테스트 결과",
      text: `${userName}님의 성격 유형은 "${personality.title}"입니다!\n${personality.catchphrase}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Web Share API를 지원하지 않는 경우
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`,
        );
        alert("링크가 클립보드에 복사되었습니다!");
      }
    } catch (error) {
      console.error("공유 실패:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12" style={{ background: 'linear-gradient(135deg, #FFE5E9 0%, #FFF0F2 50%, #FFE5E9 100%)' }}>
      <div className="max-w-4xl w-full">
        {/* Result Card */}
        <div
          ref={resultRef}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header with decorative elements */}
          <div
            className="p-8 text-white text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)' }}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute top-1/2 right-8 w-12 h-12 bg-white rounded-full"></div>
            </div>
            <h1 className="mb-2 relative z-10">🎉 테스트 완료! 🎉</h1>
            <p className="text-xl opacity-90 relative z-10">
              {userName}님의 결과
            </p>
          </div>

          {/* Main Content - Vertical Layout for better cuteness */}
          <div className="p-8">
            {/* MBTI Badge */}
            <div className="text-center mb-6">
              <div 
                className="inline-block px-8 py-3 rounded-full text-white shadow-lg mb-4 text-2xl"
                style={{ background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)' }}
              >
                {mbtiType}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  {personality.image ? (
                    <img
                      src={personality.image}
                      alt={personality.title}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '300px' }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)',
                        minHeight: '300px'
                      }}
                    >
                      <span className="text-6xl">✨</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Type Info */}
              <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 shadow-md">
                  <div className="inline-block px-4 py-2 rounded-full text-sm text-white mb-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)' }}>
                    {personality.type}
                  </div>
                  <h2 className="mb-3" style={{ 
                    background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {personality.title}
                  </h2>
                  <div className="mb-4 p-4 bg-white/70 rounded-xl shadow-sm">
                    <p className="text-lg italic" style={{ color: '#D6252A' }}>
                      "{personality.catchphrase}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 shadow-md">
              <h3 className="mb-4 text-center" style={{ 
                background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                당신의 특징
              </h3>
              <div className="bg-white/70 rounded-xl p-5 shadow-sm">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {personality.description}
                </p>
              </div>
            </div>

            {/* Scores with cute design */}
            <div className="mt-8 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 shadow-md">
              <h3 className="mb-4 text-center flex items-center justify-center gap-2" style={{ 
                background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                <span>📊</span> 세부 점수 <span>📊</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(scores)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, score]) => (
                    <div
                      key={type}
                      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">
                          {type}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)' }}>
                          {score}점
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all rounded-full"
                          style={{
                            width: `${(score / 3) * 100}%`,
                            background: 'linear-gradient(90deg, #9D2235 0%, #D6252A 100%)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleSaveImage}
            className="flex items-center justify-center gap-2 bg-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-5 h-5" style={{ color: '#D6252A' }} />
            <span style={{ color: '#D6252A' }}>이미지로 저장</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #9D2235 0%, #D6252A 100%)' }}
          >
            <Share2 className="w-5 h-5" />
            <span>SNS 공유</span>
          </button>

          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 bg-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5" style={{ color: '#9D2235' }} />
            <span style={{ color: '#9D2235' }}>다시 하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}