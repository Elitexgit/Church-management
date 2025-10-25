import { Coffee, Sun, Moon, Clock, Utensils, CheckSquare, MessageSquare } from 'lucide-react';
import { useState } from 'react';

// Define the data interfaces for clarity
interface MealScheduleItem {
  icon: typeof Coffee; // Type for Lucide React components
  name: string;
  time: string;
  menu: string;
  color: string; // Tailwind gradient class
}

interface WeeklyMenuItem {
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
}

export default function Meals() {
    // State for a more interactive Feedback Card
    const [rating, setRating] = useState(0); 

    const mealSchedule: MealScheduleItem[] = [
      {
        icon: Coffee,
        name: 'Breakfast',
        time: '7:00 AM - 9:00 AM',
        menu: 'Bread, Tea/Coffee, Eggs, Fruits',
        color: 'from-amber-400 to-orange-500',
      },
      {
        icon: Sun,
        name: 'Lunch',
        time: '12:00 PM - 2:00 PM',
        // FIX: Corrected typo 'ad chicken' to 'and chicken'
        menu: 'Rice, beans, vegetables, and chicken', 
        color: 'from-green-500 to-teal-600',
      },
      {
        icon: Moon,
        name: 'Dinner',
        time: '6:00 PM - 8:00 PM',
        menu: 'Jollof rice, Plantain, Fish, Salad',
        color: 'from-blue-600 to-indigo-700',
      },
    ];

    const weeklyMenu: WeeklyMenuItem[] = [
      {
        day: 'Monday',
        breakfast: 'Yam & Eggs',
        lunch: 'Jollof Rice & Chicken',
        dinner: 'Eba & Egusi Soup',
      },
      {
        day: 'Tuesday',
        breakfast: 'Bread & Tea',
        lunch: 'Fried Rice & Beef',
        dinner: 'Spaghetti & Sauce',
      },
      {
        day: 'Wednesday',
        breakfast: 'Pancakes & Syrup',
        lunch: 'Beans & Plantain',
        dinner: 'Pounded Yam & Vegetable',
      },
      {
        day: 'Thursday',
        breakfast: 'Oatmeal & Fruits',
        lunch: 'Rice & Stew',
        dinner: 'Amala & Ewedu',
      },
      {
        day: 'Friday',
        breakfast: 'Akara & Pap',
        lunch: 'Coconut Rice',
        dinner: 'Semovita & Okra',
      },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="space-y-10">
                
                {/* --- Header --- */}
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 border-b-4 border-blue-600/50 pb-2 flex items-center gap-3">
                    <Utensils className="w-8 h-8 text-blue-600" />
                    Retreat Dining
                </h1>

                {/* --- Meal Schedule Cards (3-column layout) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mealSchedule.map((meal, index) => {
                        const Icon = meal.icon;
                        return (
                            <div 
                                key={index} 
                                className={`bg-gradient-to-br ${meal.color} rounded-2xl shadow-xl p-6 text-white transform hover:scale-[1.02] transition-all duration-300 border-b-4 border-white/50`}
                            >
                                <Icon className="w-10 h-10 mb-4 opacity-90" />
                                <h3 className="text-3xl font-extrabold mb-1">{meal.name}</h3>
                                
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock className="w-5 h-5 opacity-90" />
                                    <span className="text-lg font-medium">{meal.time}</span>
                                </div>
                                
                                <p className="text-white/90 text-sm border-t border-white/30 pt-3">
                                    <span className="font-semibold block mb-1">Menu Summary:</span>
                                    {meal.menu}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* --- Weekly Menu Table --- */}
                <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 border-blue-500">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-blue-600" />
                        Detailed Weekly Menu
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-3 px-4 text-sm font-extrabold text-gray-700 uppercase tracking-wider rounded-tl-xl">Day</th>
                                    <th className="text-left py-3 px-4 text-sm font-extrabold text-gray-700 uppercase tracking-wider">Breakfast</th>
                                    <th className="text-left py-3 px-4 text-sm font-extrabold text-gray-700 uppercase tracking-wider">Lunch</th>
                                    <th className="text-left py-3 px-4 text-sm font-extrabold text-gray-700 uppercase tracking-wider rounded-tr-xl">Dinner</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {weeklyMenu.map((day, index) => (
                                    <tr 
                                        key={index} 
                                        className={`transition-colors ${
                                            // Highlight today's row (using a placeholder for a real-time check)
                                            day.day === 'Monday' ? 'bg-blue-50/70 font-semibold' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        <td className="py-4 px-4 font-extrabold text-blue-800 whitespace-nowrap">{day.day}</td>
                                        <td className="py-4 px-4 text-gray-700">{day.breakfast}</td>
                                        <td className="py-4 px-4 text-gray-700">{day.lunch}</td>
                                        <td className="py-4 px-4 text-gray-700">{day.dinner}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Secondary Cards: Dietary & Feedback --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Dietary Restrictions Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 border-purple-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <CheckSquare className="w-5 h-5 text-purple-600" />
                            Dietary Restrictions
                        </h2>
                        <div className="space-y-4">
                            {[
                                { name: 'Vegetarian', desc: 'No meat or fish' },
                                { name: 'Gluten-Free', desc: 'No wheat products' },
                                { name: 'Dairy-Free', desc: 'No milk products' },
                                { name: 'Nut Allergy', desc: 'No nuts or nut products' },
                            ].map((restriction, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                    <input 
                                        type="checkbox" 
                                        className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" 
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{restriction.name}</h4>
                                        <p className="text-sm text-gray-500">{restriction.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold shadow-md">
                            Save Preferences
                        </button>
                    </div>

                    {/* Meal Feedback Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 border-green-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                            Meal Feedback
                        </h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rate Today's Meal</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`w-10 h-10 text-3xl transition-all duration-150 ${
                                                star <= rating ? 'text-yellow-400 scale-105' : 'text-gray-300 hover:text-yellow-300'
                                            }`}
                                            aria-label={`Rate ${star} star`}
                                        >
                                            ⭐
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{rating > 0 ? `You rated ${rating} star(s).` : 'Select a rating above.'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Comments (Optional)</label>
                                <textarea
                                    rows={4}
                                    placeholder="Share your feedback on taste, portion, or service..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
                                />
                            </div>
                            <button className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-md disabled:opacity-50" disabled={rating === 0}>
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}