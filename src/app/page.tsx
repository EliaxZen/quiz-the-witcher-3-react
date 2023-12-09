"use client"

import { QuizQuestion } from "@/components/QuizQuestion";
import { questions } from "@/data/questions";
import { useState } from "react";
import { Results } from '@/components/Results';



const Page = () => {

  const [answers, setAnswers] = useState<number[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false);
  const title = 'Quiz The Witcher 3';
  const wallpaper = 'images/bg.jpg'

  const loadNextQuestion = () => {
    if (questions[currentQuestion + 1]) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleAnswered = (answer: number) => {
    setAnswers([...answers, answer])
    loadNextQuestion();

  }

  const handleRestartButton = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false)
  }

  return (
    <div className='w-screen h-screen overflow-hidden flex flex-col items-center justify-center max-[500px]:items-center'>
      <img src={wallpaper} alt="" className=" absolute top-0 bottom-0 right-0 left-0 w-screen h-screen -z-10 object-cover object-center brightness-50 max-[500px]:object-right" />
      <div className="max-[500px]:w-full max-[500px]:h-full bg-white/5 rounded-xl text-white m-3">
        <h1 className="p-3 text-3xl font-bold max-[500px]:text-xl border-b-2 border-white/10">{title}</h1>
        <div>
          <div className="p-3 pb-7 border-b-2 border-white/10">
            {!showResult &&
              <QuizQuestion
                question={questions[currentQuestion]}
                count={currentQuestion + 1}
                onAnswer={handleAnswered}
              />
            }
            {showResult && <Results questions={questions} answers={answers} />}
          </div>
        </div>
        <div className="flex items-center justify-center p-5">
          {!showResult &&
            `${currentQuestion + 1} de ${questions.length} pergunta${questions.length === 1 ? '' : 's'}`
          }
          {showResult &&
            <button onClick={handleRestartButton} className="px-3 py-2 rounded-md bg-slate-600 text-white text-center">Reiniciar Quiz</button>
          }
        </div>

      </div>
    </div>
  )
}
export default Page;