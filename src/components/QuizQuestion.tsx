import { Question } from "@/types/Question"
import { useState } from "react";


type Props = {
  question: Question;
  count: number;
  onAnswer: (asnwer: number) => void;
}

export const QuizQuestion = ({ question, count, onAnswer }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);


  const checkQuestion = (key: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(key)

      setTimeout(() => {
        onAnswer(key);
        setSelectedAnswer(null)
      }, 1000);

    }
  }

  return (
    <>
      <h1 className="w-full text-3xl mb-7 font-black max-[500px]:text-2xl animate-pulse">{count}.{question.question}</h1>
      {question.options.map((item, key) => (
        <p
          key={key}
          onClick={() => checkQuestion(key)}
          className={`w-full font-semibold text-lg bg-gray-200/10 p-2 rounded mb-3
         
         ${selectedAnswer !== null ? 'cursor-auto' : 'cursor-pointer hover:bg-gray-600/20'}
         ${selectedAnswer !== null && selectedAnswer === question.answer && selectedAnswer === key && 'bg-green-500/30'}
         ${selectedAnswer !== null && selectedAnswer !== question.answer && selectedAnswer === key && 'bg-red-500/30'}
         
         `}>{item}</p>
      ))}
    </>
  )
}