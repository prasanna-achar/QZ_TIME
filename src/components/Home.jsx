import React, { useState } from "react";
import { categories } from "./Categories";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const generateURL = (difficulty, category) => {
        return `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !difficulty || !category) {
            alert("Please fill in all fields before submission!");
        } else {
            const generatedURL = generateURL(difficulty, category);
            navigate(`/quiz?name=${name}&url=${encodeURIComponent(generatedURL)}`);
        }
    };

    return (
        <div className="bg-gray-800 flex h-lvh justify-center items-center flex-col">
            <div className="bg-sky-200 rounded-lg p-8 shadow-lg max-w-sm w-full shadow-slate-950">
            <h1 className="text-center text-3xl text-white p-4 mb-2 underline">Quiz App</h1>
            <form onSubmit={handleSubmit} className="grid grid-rows-4">
                {/* Name Input */}
                <div className="mb-3">
                    <label className="block mb-1 font-medium text-sm">Name:</label>
                    <input
                        className="w-full border-2 p-2"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                {/* Difficulty Selection */}
                <div className="mb-3">
                    <label className="block mb-1 font-medium text-sm">Difficulty:</label>
                    <select 
                    className="w-full border-2 p-2"
                    value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="">-- Select --</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                {/* Category Selection */}
                <div className="mb-3">
                    <label className="block mb-1 font-medium text-sm">Category:</label>
                    <select 
                    className="w-full border-2 p-2"
                    value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">-- Select --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button 
                className="bg-blue-500 w-full h-[50%] rounded-md mt-3 hover:bg-blue-700  shadow-lg hover:shadow-blue-900 transition duration-300 delay-150 hover:delay-300"
                type="submit">Start Quiz</button>
            </form>
        </div>
        </div>
    );
}
