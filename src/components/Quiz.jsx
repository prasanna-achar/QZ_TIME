
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const url = queryParams.get("url");

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    // Fetch questions from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(url);
                const data = response.data.results;
                const formattedQuestions = data.map((q, index) => ({
                    id: index,
                    question: q.question,
                    options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5), // Shuffle options
                    correctAnswer: q.correct_answer,
                }));
                setQuestions(formattedQuestions);
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
            }
        };

        fetchQuestions();
    }, [url]);

    // Handle user answer selection
    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers({ ...answers, [questionId]: selectedOption });
    };

    // Calculate the score after submission
    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                
                correctCount++;
            }
        });
        setScore(correctCount);
    };

    return (
        <div className='bg-slate-900 min-h-lvh'>
            <div className="flex items-center flex-col pt-8 pb-10">
            <h1 className="text-yellow-50 text-2xl my-3 font-semibold mb-6 underline">Quiz for {name}</h1>
            {questions.length === 0 ? (
                <p className="text-xl">Loading questions...</p>
            ) : (
                <form className="bg-slate-400 max-w-5xl w-full py-5 px-4 rounded-lg">
                    {questions.map((q ,index) => (
                        <div 
                        className="bg-white rounded-2xl p-2 shadow-2xl"
                        key={q.id} style={{ marginBottom: "20px" }}>
                            <h3
                            className="font-medium mb-4" 
                            dangerouslySetInnerHTML={{ __html: (index+1)+ ")"+q.question }} />
                            {q.options.map((option, index) => (
                                <div 
                                className="border-b-2 border-black  m-1"
                                key={index}>
                                    <label>
                                        <input
                                            
                                            type="radio"
                                            name={`question-${q.id}`}
                                            value={option}
                                            onChange={() => handleAnswerChange(q.id, option)}
                                            checked={answers[q.id] === option}
                                        />
                                        <span dangerouslySetInnerHTML={{ __html: option }} />
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button 
                    className="bg-blue-500 w-full h-[50%] rounded-md mt-3 hover:bg-blue-700  shadow-lg hover:shadow-blue-900 transition duration-300 delay-150 hover:delay-300"
                    type="button" onClick={handleSubmit}>
                        Submit Quiz
                    </button>
                </form>
            )}
            {score !== null && (
                <div
                className="max-w-5xl w-full bg-white flex items-center flex-col pt-8 pb-10 m-10 rounded-xl shadow-2xl">
                    <h2
                    className="font-extrabold"
                    >Your Score: {score}/{questions.length}</h2>
                    <button 
                    className="bg-blue-500 max-w-28 w-full h-[50%] rounded-md mt-3 hover:bg-blue-700  shadow-lg hover:shadow-blue-900 transition duration-300 delay-150 hover:delay-300 p-3"
                    onClick={() => navigate("/")}>Play Again</button>
                </div>
            )}
        </div>
        </div>
    );
};

export default Quiz;
