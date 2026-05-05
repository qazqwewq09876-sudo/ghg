/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Trophy, Sparkles, AlertCircle, ChevronRight, Play, RefreshCw, Home, User } from 'lucide-react';
import { curriculumData, encouragementPhrases, retryPhrases, Game, Question } from './data/curriculum.ts';

type AppStage = 'welcome' | 'picker' | 'playing' | 'summary';

export default function App() {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'none'; explanation?: string } | null>(null);
  const [userInput, setUserInput] = useState('');

  const handleStart = (name: string) => {
    setPlayerName(name);
    setStage('picker');
  };

  const selectGame = (game: Game) => {
    setActiveGame(game);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStage('playing');
    setFeedback(null);
    setUserInput('');
  };

  const submitAnswer = (answer: string) => {
    if (!activeGame) return;
    const currentQuestion = activeGame.questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = answer.trim() === currentQuestion.correctAnswer.trim();
    if (isCorrect) {
      const phrase = encouragementPhrases[Math.floor(Math.random() * encouragementPhrases.length)];
      setFeedback({ message: phrase, type: 'success', explanation: currentQuestion.explanation });
      setScore(s => s + 1);
    } else {
      const phrase = retryPhrases[Math.floor(Math.random() * retryPhrases.length)];
      setFeedback({ message: phrase, type: 'error', explanation: currentQuestion.explanation });
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setUserInput('');
    if (activeGame && currentQuestionIndex < activeGame.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setStage('summary');
    }
  };

  const handleExit = () => {
    setPlayerName('');
    setStage('welcome');
    setActiveGame(null);
  };

  return (
    <div className="min-h-screen bg-bento-bg text-black font-sans selection:bg-green-100" dir="rtl">
      <main className="max-w-[1024px] mx-auto px-6 py-8 min-h-screen flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {stage === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex-grow flex items-center justify-center">
              <WelcomeScreen onStart={handleStart} />
            </motion.div>
          )}

          {stage === 'picker' && (
            <motion.div key="picker" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full space-y-6">
              <GamePicker playerName={playerName} onSelect={selectGame} />
            </motion.div>
          )}

          {stage === 'playing' && activeGame && (
            <motion.div key="playing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="w-full space-y-6">
              <GameSession
                game={activeGame}
                question={activeGame.questions[currentQuestionIndex]}
                index={currentQuestionIndex}
                feedback={feedback}
                userInput={userInput}
                setUserInput={setUserInput}
                onSubmit={submitAnswer}
                onNext={nextQuestion}
                onHome={() => setStage('picker')}
              />
            </motion.div>
          )}

          {stage === 'summary' && activeGame && (
            <motion.div key="summary" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex items-center justify-center py-12">
              <GameSummary
                game={activeGame}
                score={score}
                playerName={playerName}
                onRestart={() => selectGame(activeGame)}
                onHome={() => setStage('picker')}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info bar - Bento style */}
        <div className="h-[80px] bg-white border-[3px] border-black rounded-2xl px-8 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-auto">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold whitespace-nowrap">المنهج السعودي 1م</span>
            </div>
            <div className="hidden md:block w-[1px] h-8 bg-black/10"></div>
            <div className="hidden md:block font-medium text-gray-500 italic">"لغتي الخالدة"</div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="bg-black text-white px-6 py-2 rounded-xl font-bold text-sm">كفو يا بطلة!</div>
          </div>
        </div>
      </main>
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: (name: string) => void }) {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
      <div className="flex-grow bento-card p-8 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-bento-green text-white px-4 py-1 rounded-full text-sm font-bold">لغتي الخالدة</span>
          <h1 className="text-3xl font-black text-black">الصف الأول المتوسط</h1>
        </div>
        <p className="text-xl text-gray-600 leading-relaxed">حيّاكِ الله يا مبدعة! رحلتنا في جمال اللغة العربية تبدأ من هنا. شاركنا اسمك لتبدأ التحدي.</p>
      </div>

      <div className="w-full md:w-[360px] bg-bento-orange border-[3px] border-black rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6 text-3xl">👋</div>
        <p className="font-black text-xl text-black mb-4">ما هو اسمكِ يا بطلة؟</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اكتب اسمك هنا..."
          className="w-full bg-white border-[3px] border-black p-4 rounded-2xl text-center font-bold focus:ring-4 focus:ring-bento-green outline-none transition-all text-xl"
          autoFocus
        />
        <button
          onClick={() => name && onStart(name)}
          disabled={!name}
          className="w-full bento-button mt-6 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          <span>دخول</span>
          <Play className="w-6 h-6 fill-current" />
        </button>
      </div>
    </div>
  );
}

function GamePicker({ playerName, onSelect }: { playerName: string; onSelect: (game: Game) => void }) {
  const cardColors = ['bg-bento-blue', 'bg-bento-orange', 'bg-bento-light-green'];

  return (
    <div className="space-y-6">
      <div className="bento-card p-8 bg-white flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-black">أهلاً بكِ يا {playerName}! 👋</h2>
          <p className="text-gray-600 font-bold mt-1">اختر التحدي الذي تفضلينه اليوم</p>
        </div>
        <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-black" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {curriculumData.map((game, idx) => (
          <div key={game.id} className={`${cardColors[idx]} border-[3px] border-black rounded-[2.5rem] p-8 flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group`}>
            <div className="mb-6 h-16 w-16 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:rotate-6">
              {idx === 0 ? '⚖️' : idx === 1 ? '🔎' : '🧩'}
            </div>
            <h3 className="text-2xl font-black mb-3 text-black leading-tight">{game.title}</h3>
            <p className="text-black/70 mb-8 font-medium leading-relaxed">{game.description}</p>
            <div className="mt-auto">
              <button
                onClick={() => onSelect(game)}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-transform"
              >
                ابدأ اللعب الآن
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GameSession({
  game,
  question,
  index,
  feedback,
  userInput,
  setUserInput,
  onSubmit,
  onNext,
  onHome
}: {
  game: Game;
  question: Question;
  index: number;
  feedback: any;
  userInput: string;
  setUserInput: (v: string) => void;
  onSubmit: (a: string) => void;
  onNext: () => void;
  onHome: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bento-card p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onHome} className="bento-button !bg-red-600 !p-3 flex items-center gap-2 hover:!bg-red-700 transition-colors">
            <Home className="w-5 h-5" />
            <span className="text-sm font-bold">خروج</span>
          </button>
          <span className="text-2xl font-black">{game.title}</span>
        </div>
        <div className="bg-black text-white px-6 py-2 rounded-full font-bold">
          السؤال {index + 1} / {game.questions.length}
        </div>
      </div>

      <div className="relative">
        <div className="bento-card p-10 bg-white min-h-[340px] flex flex-col items-center justify-center text-center space-y-10 relative z-10 border-t-[12px] border-t-black">
          <h3 className="text-3xl font-black text-black leading-relaxed max-w-2xl">
            {question.prompt}
          </h3>

          {question.type === 'multiple-choice' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => !feedback && onSubmit(option)}
                  disabled={!!feedback}
                  className={`p-6 rounded-[2rem] border-[3px] font-black text-2xl transition-all
                    ${feedback ? (option === question.correctAnswer ? 'bg-bento-light-green border-black scale-[1.02]' : 'bg-gray-100 border-gray-300 opacity-40')
                    : 'bg-white border-black hover:bg-bento-blue hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'input-correction' && (
            <div className="w-full max-w-md space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={!!feedback}
                placeholder="اكتب الإجابة هنا..."
                className="w-full p-6 bg-gray-50 border-[3px] border-black rounded-[2rem] text-2xl text-center font-black focus:outline-none focus:ring-4 focus:ring-bento-blue transition-all"
                onKeyDown={(e) => e.key === 'Enter' && userInput && onSubmit(userInput)}
                autoFocus
              />
              {!feedback && (
                <button onClick={() => onSubmit(userInput)} disabled={!userInput} className="w-full bento-button">
                  تأكيد الإجابة
                </button>
              )}
            </div>
          )}
        </div>
        {/* Decorative layer behind question */}
        <div className="absolute inset-0 bg-black rounded-[2rem] translate-x-3 translate-y-3 -z-0"></div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`bento-card p-10 relative overflow-hidden ${feedback.type === 'success' ? 'bg-[#ECFDF5]' : 'bg-[#FFF7ED]'}`}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-right">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${feedback.type === 'success' ? 'bg-bento-green' : 'bg-red-600'}`}>
                {feedback.type === 'success' ? <Trophy className="w-12 h-12 text-white" /> : <AlertCircle className="w-12 h-12 text-white" />}
              </div>
              <div className="space-y-4 flex-1">
                <h4 className="text-4xl font-black text-black">{feedback.message}</h4>
                <div className="bg-white/50 p-6 rounded-2xl border-2 border-black/10">
                  <p className="text-xl font-bold text-gray-800 leading-relaxed">
                    <span className="text-bento-green block mb-2 underline decoration-4 underline-offset-4">قاعدة لليوم:</span>
                    {feedback.explanation}
                  </p>
                </div>
                {feedback.type === 'error' && (
                  <div className="bg-black text-white p-4 rounded-xl inline-block font-black text-lg">
                    الإجابة الصحيحة: {question.correctAnswer}
                  </div>
                )}
              </div>
              <button
                onClick={onNext}
                className="w-full md:w-auto bento-button flex items-center justify-center gap-3 self-center md:self-end"
              >
                <span className="text-xl">{index < game.questions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GameSummary({
  game,
  score,
  playerName,
  onRestart,
  onHome
}: {
  game: Game;
  score: number;
  playerName: string;
  onRestart: () => void;
  onHome: () => void;
}) {
  const percentage = (score / game.questions.length) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <div className="bento-card p-12 bg-white flex flex-col items-center justify-center text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-black italic italic pr-4">كفو يا بطلة!</h2>
          <p className="text-xl text-gray-500 font-bold">رحلة المليار ميل تبدأ بخطوة.. وأنتِ قطعتِ شوطاً رائعاً يا {playerName}</p>
        </div>

        <div className="w-48 h-48 rounded-full border-[10px] border-black flex flex-col items-center justify-center bg-bento-orange shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-6xl font-black">{score} / {game.questions.length}</span>
          <span className="font-black text-sm uppercase tracking-tighter mt-1 opacity-50">إجابات صحيحة</span>
        </div>
      </div>

      <div className="space-y-6 flex flex-col justify-center">
        <div className="bento-card p-8 bg-bento-light-green relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black/5 -translate-y-full group-hover:translate-y-0 transition-transform"></div>
          <p className="text-2xl font-black leading-relaxed relative z-10">
            {percentage === 100 ? 'أبهرتني! معرفتكِ باللغة تفوق الخيال 👑' :
             percentage >= 70 ? 'مستوى رهيب! استمري هكذا وستكونين فخر العرب 🌟' :
             percentage >= 50 ? 'محاولة جيدة.. اللغة كالبحر تحتاج صبراً لتتعلمي السباحة 💪' :
             'البدايات دائماً صعبة.. الخطأ هو أول طريق النجاح 📚'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button onClick={onRestart} className="bento-button w-full flex items-center justify-center gap-4 py-6">
            <RefreshCw className="w-7 h-7" />
            <span className="text-2xl">تحدي من جديد</span>
          </button>
          <button onClick={onHome} className="bg-white border-[3px] border-black p-6 rounded-[2rem] font-black text-2xl hover:bg-gray-50 flex items-center justify-center gap-4 transition-all">
            <Home className="w-7 h-7" />
            <span>العودة للرئيسية</span>
          </button>
        </div>
      </div>
    </div>
  );
}
