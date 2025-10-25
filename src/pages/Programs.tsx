import { Calendar, Clock, MapPin, User, Download, Plus, List } from 'lucide-react';
import { useState } from 'react';

// Define the data interfaces for type safety
interface ProgramItem {
  title: string;
  speaker: string;
  date: string; // e.g., 'Monday, Dec 18'
  time: string; // e.g., '8:00 AM - 10:00 AM'
  location: string;
  description: string;
  color: string; // Tailwind gradient class
}

// Define the component props
interface ProgramsProps {
  // In a real app, you might pass a list of days or categories here
}

// --- Helper Component for a single Program Card ---
interface ProgramCardProps {
    program: ProgramItem;
    // Add an isRegistered prop for real-time state
    isRegistered: boolean; 
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, isRegistered }) => {
    // Determine the border and registration button styling based on the color property
    const borderClass = program.color.replace('from-', 'border-l-4 border-').split(' ')[0];
    
    return (
        <div 
            className={`bg-white rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg ${borderClass}`}
        >
            <div className="flex flex-col lg:flex-row justify-between gap-5">
                
                {/* --- Program Details --- */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        {/* Time/Date pill */}
                        <div className={`text-xs font-semibold px-3 py-1 rounded-full ${program.color} text-white shadow-md`}>
                            {program.time.split('-')[0].trim()}
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-900">{program.title}</h3>
                    </div>
                    
                    <p className="mt-2 mb-4 text-gray-600 italic text-sm">{program.description}</p>
                    
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mt-3">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{program.speaker}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span>{program.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span>{program.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>{program.time}</span>
                        </div>
                    </div>
                </div>

                {/* --- Actions --- */}
                <div className="flex flex-row lg:flex-col gap-3 flex-shrink-0 pt-2 border-t lg:border-t-0 lg:border-l lg:pl-5 border-gray-100">
                    <button 
                        className={`w-full lg:w-32 px-4 py-2 text-white rounded-lg transition-colors font-semibold flex items-center justify-center whitespace-nowrap text-sm ${
                            isRegistered 
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isRegistered ? <><Check className="w-4 h-4 mr-1" /> Registered</> : <><Plus className="w-4 h-4 mr-1" /> Register</>}
                    </button>
                    <button 
                        className="w-full lg:w-32 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap text-sm"
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- End Helper Component ---


export default function Programs() {
  const allPrograms: ProgramItem[] = [
    {
      title: 'Opening Ceremony',
      speaker: 'Pastor William Kumuyi',
      date: 'Monday, Dec 18',
      time: '8:00 AM - 10:00 AM',
      location: 'Main Auditorium',
      description: 'Welcome address, visionary leadership teaching, and overview of retreat activities.',
      color: 'from-blue-600 to-blue-700',
    },
    {
      title: 'Morning Devotion',
      speaker: 'Pastor John Adeboye',
      date: 'Tuesday, Dec 19',
      time: '10:00 AM - 11:30 AM',
      location: 'Main Auditorium',
      description: 'Daily worship, deep biblical teaching, and focused prayer session.',
      color: 'from-green-600 to-green-700',
    },
    {
      title: 'Leadership Seminar',
      speaker: 'Dr. Grace Okonkwo',
      date: 'Monday, Dec 18',
      time: '1:00 PM - 3:00 PM',
      location: 'Conference Hall A',
      description: 'Practical training on developing servant-leadership for tomorrow\'s challenges.',
      color: 'from-purple-600 to-purple-700',
    },
    {
      title: 'Youth Session',
      speaker: 'Pastor David Okafor',
      date: 'Tuesday, Dec 19',
      time: '3:30 PM - 5:00 PM',
      location: 'Youth Center',
      description: 'Special program designed for young people focusing on faith and career.',
      color: 'from-orange-600 to-orange-700',
    },
    {
      title: 'Power Night',
      speaker: 'Pastor William Kumuyi',
      date: 'Monday, Dec 18',
      time: '7:00 PM - 9:00 PM',
      location: 'Main Auditorium',
      description: 'An evening of powerful worship, intense prayer, and spiritual upliftment.',
      color: 'from-red-600 to-red-700',
    },
  ];

  // State to manage the active day filter
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [selectedDay, setSelectedDay] = useState('Monday'); // Default to Monday

  // Placeholder for registered program IDs (for the ProgramCard state)
  const [registeredPrograms] = useState(['Opening Ceremony', 'Leadership Seminar', 'Power Night']);

  // Filtering Logic
  const filteredPrograms = selectedDay === 'All Days' 
    ? allPrograms
    : allPrograms.filter(p => p.date.includes(selectedDay));
  
  // Custom Registration Status Card Data (Placeholder for categories)
  const categories = [
    { name: 'Worship & Prayer', count: 15, color: 'bg-blue-100 text-blue-800 border-blue-500' },
    { name: 'Teaching & Seminars', count: 12, color: 'bg-green-100 text-green-800 border-green-500' },
    { name: 'Youth Programs', count: 8, color: 'bg-orange-100 text-orange-800 border-orange-500' },
    { name: 'Special Sessions', count: 5, color: 'bg-purple-100 text-purple-800 border-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      
      {/* --- Header and Actions --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b pb-4">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">Program Schedule</h1>
        
        <div className="flex gap-3">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center shadow-md">
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
          {/* Replaced dropdown with a primary action button for registration */}
          <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-semibold flex items-center shadow-md">
            <List className="w-5 h-5 mr-2" />
            My Programs
          </button>
        </div>
      </div>

      {/* --- Day Filter Tabs --- */}
      <div className="bg-white rounded-2xl shadow-xl p-4 mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-3">Select Day</h2>
        <div className="flex gap-3 overflow-x-auto pb-1 -m-4 p-4">
          {['All Days', ...days].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-2 rounded-full transition-all duration-200 font-semibold whitespace-nowrap text-sm ${
                selectedDay === day
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* --- Program List --- */}
      <div className="space-y-6">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program, index) => (
            <ProgramCard 
              key={index} 
              program={program} 
              isRegistered={registeredPrograms.includes(program.title)}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md border-t-4 border-gray-400">
            <Calendar className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-xl font-semibold text-gray-700">No Programs Scheduled</p>
            <p className="text-gray-500">Check back later or select a different day.</p>
          </div>
        )}
      </div>

      {/* --- Secondary Information Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        
        {/* Program Categories Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <List className="w-6 h-6 mr-2 text-purple-600" />
            Program Categories
          </h2>
          <div className="space-y-3">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-4 rounded-xl border-l-4 ${category.color} transition-shadow hover:shadow-md`}
              >
                <span className="font-semibold text-gray-800">{category.name}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${category.color.replace('-100', '-500')} ${category.color.replace('-100', '-500').replace('bg-', 'text-')}`}>
                  {category.count} events
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* My Registered Programs Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Check className="w-6 h-6 mr-2 text-green-600" />
            My Registered Programs
          </h2>
          <div className="space-y-3">
            {registeredPrograms.length > 0 ? registeredPrograms.map((name, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-l-4 border-green-400 shadow-sm">
                <div>
                  <p className="font-semibold text-green-800">{name}</p>
                  <p className="text-sm text-gray-600">
                      {/* Placeholder time lookup - in a real app, this would come from state/API */}
                      {allPrograms.find(p => p.title === name)?.time}
                  </p>
                </div>
                <button className="text-red-600 hover:text-red-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-red-50 transition-colors">
                  Cancel
                </button>
              </div>
            )) : (
              <div className="text-center py-6 text-gray-500">
                You are not registered for any optional programs yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}