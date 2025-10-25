import { useState, useMemo } from 'react';
import { Trophy, Clock, Target, Zap, CheckCircle, XCircle, ChevronRight, Hash } from 'lucide-react';

// Define the shape of the data for better type safety
interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

interface AvailableQuiz {
    title: string;
    questions: number;
    time: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    participants: number;
}

interface LeaderboardEntry {
    rank: number;
    name: string;
    score: number;
    badge: string;
}

// Mock Bible Quiz Questions (for demonstration of random question logic)
const mockQuizQuestions: QuizQuestion[] = [
    {
        question: "Who is the author of the Book of Ruth?",
        options: ["Samuel", "Moses", "Unknown", "David"],
        answer: "Unknown", // Traditionally considered unknown or possibly Samuel
    },
    {
        question: "How many days did Jesus fast in the wilderness?",
        options: ["7 days", "14 days", "40 days", "50 days"],
        answer: "40 days",
    },
    {
        question: "Which disciple betrayed Jesus?",
        options: ["Peter", "Thomas", "Judas Iscariot", "Matthew"],
        answer: "Judas Iscariot",
    },
    {
        question: "What was the name of the garden where Jesus prayed before his arrest?",
        options: ["Eden", "Gethsemane", "Galilee", "Bethel"],
        answer: "Gethsemane",
    },
    {
        question: "In what city was Jesus born?",
        options: ["Jerusalem", "Nazareth", "Bethlehem", "Hebron"],
        answer: "Bethlehem",
    },
];

const availableQuizzes: AvailableQuiz[] = [
    {
        title: 'Old Testament Knowledge',
        questions: 20,
        time: 15,
        difficulty: 'Medium',
        participants: 156,
    },
    {
        title: 'New Testament Basics',
        questions: 15,
        time: 10,
        difficulty: 'Easy',
        participants: 234,
    },
    {
        title: 'Book of Psalms',
        questions: 25,
        time: 20,
        difficulty: 'Hard',
        participants: 89,
    },
    {
        title: 'Life of Jesus',
        questions: 18,
        time: 12,
        difficulty: 'Medium',
        participants: 178,
    },
];

const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'James Adebayo', score: 980, badge: '🥇' },
    { rank: 2, name: 'Mary Okonkwo', score: 945, badge: '🥈' },
    { rank: 3, name: 'David Eze', score: 920, badge: '🥉' },
    { rank: 4, name: 'Grace Okafor', score: 895, badge: '' },
    { rank: 5, name: 'John Udoh', score: 870, badge: '' },
];


export default function Quiz() {
    // State for the quick quiz
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // Logic to select a random question only once on load (or on reset)
    const currentQuestion = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * mockQuizQuestions.length);
        return mockQuizQuestions[randomIndex];
    }, []);

    const handleSubmitAnswer = () => {
        if (selectedAnswer) {
            setIsSubmitted(true);
        }
    };
    
    const isCorrect = isSubmitted && selectedAnswer === currentQuestion.answer;
    const isAnswered = selectedAnswer !== null;

    // Helper for difficulty colors
    const getDifficultyColor = (difficulty: AvailableQuiz['difficulty']) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700 border-green-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'Hard': return 'bg-red-100 text-red-700 border-red-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="space-y-10">
                
                {/* --- Header --- */}
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 border-b-4 border-yellow-600/50 pb-2 flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-600" />
                    Bible Knowledge Hub
                </h1>
                
                {/* --- Daily Quick Quiz --- */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 border-t-8 border-blue-600">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-blue-600" /> Daily Quick Quiz
                    </h2>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 lg:p-8 shadow-inner">
                        <div className="flex justify-between items-center mb-6 border-b pb-4 border-blue-200">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">Question of the Day</h3>
                                <p className="text-blue-600 font-medium flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> 2:30 remaining
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Potential Points</p>
                                <p className="text-3xl font-bold text-blue-600">100</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                            <h4 className="text-xl font-semibold text-gray-800 mb-5">
                                {currentQuestion.question}
                            </h4>
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => !isSubmitted && setSelectedAnswer(option)}
                                        className={`w-full text-left px-6 py-4 border-2 rounded-xl transition-all duration-300 font-medium flex items-center gap-3
                                            ${
                                                isSubmitted
                                                ? (option === currentQuestion.answer
                                                    ? 'bg-green-100 border-green-500 text-green-800' // Correct answer
                                                    : (option === selectedAnswer
                                                        ? 'bg-red-100 border-red-500 text-red-800' // Wrong choice
                                                        : 'bg-gray-50 border-gray-200 text-gray-700')) // Unselected
                                                : (selectedAnswer === option
                                                    ? 'bg-blue-100 border-blue-500 text-blue-800 shadow-lg' // Selected but not submitted
                                                    : 'bg-gray-50 hover:bg-blue-50 border-gray-200 hover:border-blue-300 text-gray-700')
                                            }
                                        `}
                                        disabled={isSubmitted}
                                    >
                                        <span className='font-bold text-lg'>{String.fromCharCode(65 + index)}.</span>
                                        {option}
                                        {isSubmitted && option === currentQuestion.answer && <CheckCircle className='w-5 h-5 ml-auto text-green-600' />}
                                        {isSubmitted && option === selectedAnswer && option !== currentQuestion.answer && <XCircle className='w-5 h-5 ml-auto text-red-600' />}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {isSubmitted && (
                            <div className={`p-4 rounded-lg font-semibold text-center mt-4 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {isCorrect ? "✅ Correct! Great job." : "❌ Incorrect. The correct answer was: " + currentQuestion.answer}
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50" disabled={isSubmitted}>
                                Skip Question
                            </button>
                            <button
                                onClick={handleSubmitAnswer}
                                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                                disabled={isSubmitted || !isAnswered}
                            >
                                <ChevronRight className='w-5 h-5'/>
                                {isSubmitted ? 'Next Question' : 'Submit Answer'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Available Quizzes & Leaderboard --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Available Quizzes */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-orange-500 lg:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <Target className="w-5 h-5 text-orange-600" /> Available Quizzes
                            </h2>
                            <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1">
                                View All <ChevronRight className='w-4 h-4'/>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableQuizzes.map((quiz, index) => (
                                <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-lg text-gray-800">{quiz.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(quiz.difficulty)}`}>
                                            {quiz.difficulty}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
                                        <span className='flex items-center gap-1'><Target className='w-4 h-4'/> {quiz.questions} Qs</span>
                                        <span className='flex items-center gap-1'><Clock className='w-4 h-4'/> {quiz.time} mins</span>
                                        <span className='flex items-center gap-1'><Hash className='w-4 h-4'/> {quiz.participants} takers</span>
                                    </div>
                                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                        Start Quiz
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-yellow-500">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-600" /> Leaderboard
                            </h2>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                                <option>This Week</option>
                                <option>All Time</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            {leaderboard.map((entry, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-4 p-4 rounded-xl shadow-sm border ${
                                        entry.rank <= 3 ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50 border-gray-200'
                                    }`}
                                >
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-extrabold text-gray-800 text-lg shadow-md">
                                        {entry.badge || <span className='text-gray-600'>{entry.rank}</span>}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">{entry.name}</h4>
                                        <p className="text-sm text-gray-600 font-mono">{entry.score} points</p>
                                    </div>
                                    <div className='font-bold text-xl text-yellow-600'>
                                        {entry.rank <= 3 ? 'TOP' : ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-blue-100 rounded-xl border border-blue-300">
                            <h3 className='font-bold text-lg text-blue-800 mb-2'>Your Standing</h3>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-600">Current Rank</p>
                                    <p className="text-2xl font-bold text-blue-600">#24</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Total Score</p>
                                    <p className="text-2xl font-bold text-blue-600">685</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Recent Quiz Results Table --- */}
                <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-green-600">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Target className='w-5 h-5 text-green-600'/> Recent Quiz Results
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left py-3 px-4 font-bold text-sm text-gray-700 uppercase tracking-wider rounded-tl-lg">Quiz Name</th>
                                    <th className="text-left py-3 px-4 font-bold text-sm text-gray-700 uppercase tracking-wider">Date Taken</th>
                                    <th className="text-left py-3 px-4 font-bold text-sm text-gray-700 uppercase tracking-wider">Score</th>
                                    <th className="text-left py-3 px-4 font-bold text-sm text-gray-700 uppercase tracking-wider">Time (m:s)</th>
                                    <th className="text-left py-3 px-4 font-bold text-sm text-gray-700 uppercase tracking-wider rounded-tr-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { quiz: 'Old Testament Knowledge', date: 'Dec 18, 2025', score: '85%', time: '12:30', status: 'Passed' },
                                    { quiz: 'New Testament Basics', date: 'Dec 17, 2025', score: '92%', time: '8:45', status: 'Passed' },
                                    { quiz: 'Book of Psalms', date: 'Dec 16, 2025', score: '78%', time: '18:20', status: 'Passed' },
                                    { quiz: 'Life of Jesus', date: 'Dec 15, 2025', score: '62%', time: '10:15', status: 'Failed' },
                                ].map((result, index) => (
                                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                                        <td className="py-4 px-4 font-medium text-gray-800">{result.quiz}</td>
                                        <td className="py-4 px-4 text-gray-600 text-sm">{result.date}</td>
                                        <td className="py-4 px-4">
                                            <span className={`font-semibold ${result.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>
                                                {result.score}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">{result.time}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {result.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}