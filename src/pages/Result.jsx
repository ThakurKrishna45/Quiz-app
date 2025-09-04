import React from "react";


const Result = ({ questions, answers, score, onRestart }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-2">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl text-center">
                <h1 className="text-2xl font-bold mb-4 text-purple-700">Quiz Finished!</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Your score: <span className="font-bold text-green-600">{score}</span> / {questions.length}
                </p>
                <div className="mb-6 text-left">
                    <h2 className="text-xl font-semibold mb-2 text-purple-600">Summary</h2>
                    <ol className="space-y-4">
                        {questions.map((q, idx) => {
                            const userAnswer = answers[idx];
                            const isCorrect = userAnswer === q.correctAnswer;
                            return (
                                <li key={idx} className="p-4 rounded-lg border bg-gray-50">
                                    <div className="font-medium text-gray-800 mb-1">
                                        {`Q${idx + 1}: `}{q.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                        <span className={isCorrect ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                                            {isCorrect ? 'Correct' : 'Incorrect'}
                                        </span>
                                        <span className="text-gray-700">
                                            Your answer: <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                                                {userAnswer ? userAnswer.replace(/&quot;/g, '"').replace(/&#039;/g, "'") : <em>No answer</em>}
                                            </span>
                                        </span>
                                        {!isCorrect && (
                                            <span className="text-gray-700">
                                                Correct answer: <span className="text-green-700">
                                                    {q.correctAnswer.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
                <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition" onClick={onRestart}>Restart Quiz</button>
            </div>
        </div>
    );
};

export default Result;
