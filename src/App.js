import React, {useState} from 'react';
import './App.css';
import Quiz from "./Quiz";
import {v4 as uuidv4} from 'uuid';
import Result from "./Result";

function App() {

  const [quiz, setQuiz] = useState([]);
  const sign = ['+', '-', '*'];
  const [result, setResult] = useState(undefined);
  const [nextToggle, setNextToggle] = useState(false);
  const quizLength = 5;

  const getRightAnswer = (firstNumber, sign, secondNumber) => {
    let answer;
    switch (sign) {
      case '-':
        answer = firstNumber - secondNumber;
        break;
      case '+':
        answer = firstNumber + secondNumber;
        break;
      case '*':
        answer = firstNumber * secondNumber;
        break;
      default:
        answer = 'error';
    }
    return answer;
  }

  const newQuestion = () => {
    const newQuiz = [...quiz, {
      serialNumber: quiz.length + 1,
      firstNumber: Math.floor(Math.random() * 10),
      sign: sign[Math.floor(Math.random() * 3)],
      secondNumber: Math.floor(Math.random() * 10),
    }]
    setQuiz(newQuiz)
    if (quiz.length > 0 && quiz.length < quizLength) {
      setNextToggle(!nextToggle);
    }
  }

  const getAnswers = (serialNumber, userAnswer) => {
    const newQuiz = quiz.map(el => {
      if (el.serialNumber === serialNumber) {
        const rightAnswer = getRightAnswer(el.firstNumber, el.sign, el.secondNumber);
        return {...el, userAnswer: +userAnswer, rightAnswer}
      }
      return el;
    })
    setQuiz(newQuiz)
    if (quiz.length > 0 && quiz.length < quizLength) {
      setNextToggle(!nextToggle);
    }
    if (quiz.length === quizLength) {
      setResultToggle(!resultToggle);
    }
  }

  const [resultToggle, setResultToggle] = useState(false)

  const getResult = () => {
    const newResult = quiz.map(el => {
      if (el.rightAnswer === el.userAnswer) {
        return 1;
      }
      return 0
    }).reduce((acc, curr) => acc + curr)
    setResult(newResult);
  }

  return (
      <div>
        <h1>Math quiz</h1>
        {quiz.length === 0 && <button onClick={newQuestion}> Start quiz </button>}

        {quiz.filter((el, i) => i === quiz.length - 1).map(el => <Quiz
            question={el}
            newQuestion={newQuestion}
            getAnswers={getAnswers}
            key={uuidv4()}
        />)}
        <div className='button'>{nextToggle && <button onClick={newQuestion}> Next </button>}</div>
        <div className='button'>{resultToggle && <button onClick={getResult}> Get results </button>}</div>
        {result >= 0 && <Result quizLength={quizLength} result={result}/>}
      </div>
  );
}

export default App;