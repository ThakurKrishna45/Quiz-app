import React, { useState, useEffect } from "react";


const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        
        const fetchQuestions = async () => {
            const response = await fetch(
                "https://opentdb.com/api.php?amount=5&type=multiple"
            );
            const data = await response.json();
            const formattedQuestions = data.results.map((q) => ({
                question: q.question,
                options: [...q.incorrect_answers, q.correct_answer],
                correctAnswer: q.correct_answer,
            }));
            setQuestions(formattedQuestions);
        };

        fetchQuestions();
    }, []);

    const handleNext = () => {
        if (selectedAnswer !== null) {
            setAnswers({ ...answers, [currentQuestionIndex]: selectedAnswer });
            setSelectedAnswer(null);
            setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
        } else {
            alert("Please select an answer before proceeding.");
        }
    };

    const handlePrevious = () => {
        setSelectedAnswer(answers[currentQuestionIndex - 1] || null);
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            setAnswers({ ...answers, [currentQuestionIndex]: selectedAnswer });
            setIsFinished(true);
        } else {
            alert("Please select an answer before submitting.");
        }
    };

    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-lg font-semibold text-gray-700 animate-pulse">Loading questions...</div>
            </div>
        );
    }

    if (isFinished) {
        const score = Object.keys(answers).reduce((acc, key) => {
            const questionIndex = parseInt(key);
            if (answers[questionIndex] === questions[questionIndex].correctAnswer) {
                return acc + 1;
            }
            return acc;
        }, 0);

        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4 text-purple-700">Quiz Finished!</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Your score: <span className="font-bold text-green-600">{score}</span> / {questions.length}
                    </p>
                    <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition" onClick={() => window.location.reload()}>Restart Quiz</button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-2">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-purple-700 mb-4 text-center">Quiz App</h1>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    <p className="text-base text-gray-700 mb-4">
                        {currentQuestion.question}
                    </p>
                    <div className="flex flex-col gap-3">
                        {currentQuestion.options.map((option, index) => (
                            <label
                                key={index}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
                                    ${selectedAnswer === option ? 'bg-purple-100 border-purple-400' : 'bg-gray-50 border-gray-200 hover:border-purple-300'}
                                `}
                            >
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={() => setSelectedAnswer(option)}
                                    className="accent-purple-600 w-5 h-5"
                                />
                                <span className="text-gray-800">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 justify-between mt-4">
                    {currentQuestionIndex > 0 && (
                        <button
                            onClick={handlePrevious}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                            Previous
                        </button>
                    )}
                    {currentQuestionIndex < questions.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                        >
                            Next
                        </button>
                    )}
                    {currentQuestionIndex === questions.length - 1 && (
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;