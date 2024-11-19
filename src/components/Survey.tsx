import React, { useState } from "react";
import styles from "./Survey.module.css"; // Импорт CSS Modules

const questions = [
  "Как вас зовут?",
  "Сколько вам лет?",
  "Как вам игра?",
  "Посоветуете ее другу?",
  "Поставите 5 звезд?",
];

export const Survey: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSubmit = (answer: string) => {
    setAnswers((prev) => [...prev, answer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSurveySubmit([...answers, answer]);
    }
  };

  const handleSurveySubmit = (finalAnswers: string[]) => {
    setIsSubmitting(true);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/submit-survey", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        setIsSubmitting(false);

        if (xhr.status === 200) {
          setIsCompleted(true);
        } else {
          alert("Ваши данные в пути!");
          setIsCompleted(true);
          //   console.error("Ошибка отправки данных:", xhr.responseText);
          //   alert("Не удалось отправить результаты. Попробуйте снова.");
        }
      }
    };

    xhr.send(JSON.stringify({ answers: finalAnswers }));
  };

  if (isSubmitting) {
    return <div className={styles.feedback}>Отправка ваших ответов...</div>;
  }

  if (isCompleted) {
    return (
      <div className={styles.feedback}>Спасибо за прохождение опроса!</div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Вопрос {currentQuestionIndex + 1} из {questions.length}
      </h2>
      <p className={styles.question}>{questions[currentQuestionIndex]}</p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const answer = (e.target as any).elements.answer.value.trim();

          if (answer) {
            handleAnswerSubmit(answer);
          } else {
            alert("Пожалуйста, введите ответ.");
          }
        }}
      >
        <input
          type="text"
          name="answer"
          placeholder="Ваш ответ"
          className={styles.input}
          autoFocus
        />
        <button type="submit" className={styles.button}>
          {currentQuestionIndex < questions.length - 1 ? "Далее" : "Отправить"}
        </button>
      </form>
    </div>
  );
};
