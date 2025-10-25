import { useState } from 'react';
import { MessageCircle, Star, Send, FileText, CheckCircle, Clock } from 'lucide-react';

// Define the component outside of the function for clarity in the final output
interface FormItem {
    title: string;
    description: string;
    responses: number;
    status: 'Active' | 'Upcoming' | 'Closed';
}

interface RecentFeedbackItem {
    name: string;
    rating: number;
    comment: string;
    time: string;
}

interface CategoryRatingItem {
    category: string;
    rating: number;
    votes: number;
}

export default function Feedback() {
    const [quickRating, setQuickRating] = useState(0);

    const forms: FormItem[] = [
        {
            title: 'Daily Program Feedback',
            description: 'Share your thoughts about today\'s programs and services.',
            responses: 234,
            status: 'Active',
        },
        {
            title: 'Meal Satisfaction Survey',
            description: 'Help us improve our breakfast, lunch, and dinner services.',
            responses: 189,
            status: 'Active',
        },
        {
            title: 'Accommodation Feedback',
            description: 'Rate your comfort and experience with your room/tent.',
            responses: 145,
            status: 'Active',
        },
        {
            title: 'Overall Retreat Evaluation',
            description: 'Comprehensive feedback on your entire retreat experience.',
            responses: 67,
            status: 'Upcoming',
        },
        // Added an extra form to balance the grid
        {
            title: 'Technical Support Review',
            description: 'Rate the help and support received from the tech team.',
            responses: 22,
            status: 'Active',
        },
        {
            title: 'Worship Team Experience',
            description: 'Provide feedback on the worship sessions and music ministry.',
            responses: 112,
            status: 'Active',
        },
    ];

    const recentFeedback: RecentFeedbackItem[] = [
        {
            name: 'Sarah J.',
            rating: 5,
            comment: 'Excellent program! Very inspiring messages and great atmosphere.',
            time: '2 hours ago',
        },
        {
            name: 'Michael O.',
            rating: 5,
            comment: 'Great organization and wonderful fellowship. Meals were fantastic!',
            time: '4 hours ago',
        },
        {
            name: 'Grace E.',
            rating: 4,
            comment: 'Good experience overall. Could improve the sound system in the main tent.',
            time: '6 hours ago',
        },
    ];

    const categoryRatings: CategoryRatingItem[] = [
        { category: 'Programs & Teaching', rating: 4.9, votes: 234 },
        { category: 'Meal Services', rating: 4.7, votes: 189 },
        { category: 'Accommodation', rating: 4.6, votes: 145 },
        { category: 'Organization & Logistics', rating: 4.8, votes: 210 },
        { category: 'Worship Experience', rating: 4.9, votes: 256 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="space-y-10">
                
                {/* --- Header --- */}
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 border-b-4 border-yellow-600/50 pb-2 flex items-center gap-3">
                    <MessageCircle className="w-8 h-8 text-yellow-600" />
                    Feedback & Forms
                </h1>
                
                {/* --- Quick Feedback Form (Prominent) --- */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 border-t-8 border-yellow-500">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500" fill='currentColor'/> 
                        Quick Daily Feedback
                    </h2>
                    <div className="space-y-8">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-3">
                                How would you rate today's overall program?
                            </label>
                            <div className="flex gap-4">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        onClick={() => setQuickRating(rating)}
                                        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-200 transform hover:scale-110 shadow-lg ${
                                            rating <= quickRating 
                                                ? 'bg-yellow-400 text-white' 
                                                : 'bg-gray-100 text-gray-400 hover:bg-yellow-200'
                                        }`}
                                    >
                                        ⭐
                                    </button>
                                ))}
                            </div>
                            <p className='mt-3 text-sm text-gray-500'>{quickRating > 0 ? `You selected ${quickRating} out of 5.` : 'Click a star to rate.'}</p>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">
                                Comments & Suggestions
                            </label>
                            <textarea
                                rows={4}
                                placeholder="What did you enjoy most, or what could be improved?"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-colors"
                            />
                        </div>

                        <button 
                            className="w-full lg:w-1/3 px-8 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors font-bold shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                            disabled={quickRating === 0}
                        >
                            <Send className="w-5 h-5" />
                            Submit Quick Feedback
                        </button>
                    </div>
                </div>

                {/* --- Available Forms --- */}
                <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-blue-500">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-blue-600" />
                            Available Forms & Surveys
                        </h2>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-md">
                            Browse Archives
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {forms.map((form, index) => (
                            <div 
                                key={index} 
                                className={`rounded-xl p-5 transition-all duration-300 ${
                                    form.status === 'Active' ? 'bg-blue-50 hover:shadow-lg border-2 border-blue-200' : 'bg-gray-100 border border-gray-200'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-800 leading-snug">{form.title}</h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                                            form.status === 'Active'
                                                ? 'bg-green-100 text-green-800 flex items-center gap-1'
                                                : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        {form.status === 'Active' && <CheckCircle className='w-3 h-3'/>}
                                        {form.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{form.description}</p>
                                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                                    <span className="text-sm text-gray-500 font-medium">{form.responses} responses</span>
                                    <button 
                                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                            form.status === 'Active' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                                        }`}
                                        disabled={form.status !== 'Active'}
                                    >
                                        {form.status === 'Active' ? 'Fill Form' : 'Coming Soon'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Recent & Category Ratings --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Recent Feedback */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-green-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-green-600" />
                            Recent Participant Comments
                        </h2>
                        <div className="space-y-4">
                            {recentFeedback.map((feedback, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-gray-800">{feedback.name}</h4>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`text-sm ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                                    ⭐
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2 italic border-l-2 pl-3 border-gray-200">{feedback.comment}</p>
                                    <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className='w-3 h-3'/> {feedback.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category Ratings */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-purple-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Star className="w-5 h-5 text-purple-600" />
                            Average Category Ratings
                        </h2>
                        <div className="space-y-6">
                            {categoryRatings.map((item, index) => {
                                const percentage = (item.rating / 5) * 100;
                                return (
                                    <div key={index}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-gray-800">{item.category}</span>
                                            <span className="text-sm text-purple-600 font-bold">{item.rating} ⭐ ({item.votes} votes)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-purple-500 h-3 rounded-full transition-all duration-700"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}