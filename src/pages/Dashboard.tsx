import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Clock, Radio, Calendar, Utensils, CheckCircle, ImagePlus, Loader2 } from 'lucide-react';

// Define the data interfaces for type safety
interface DashboardProps {
  userName: string;
}

interface LiveStream {
  id: string;
  title: string;
  description: string;
  youtube_video_id: string;
  speaker: string;
  is_live: boolean;
}

// --- ScheduleItem Component for cleaner code ---
interface ScheduleItemProps {
  time: string;
  activity: string;
  isCurrent: boolean;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ time, activity, isCurrent }) => (
  <div className={`flex items-start gap-4 py-3 px-4 rounded-lg transition-all duration-300 ${isCurrent ? 'bg-blue-50 border-l-4 border-blue-600 font-semibold' : 'hover:bg-gray-50'}`}>
    <Clock size={20} className={`mt-1 ${isCurrent ? 'text-blue-600' : 'text-gray-400'}`} />
    <div className="flex flex-col">
      <span className={`text-sm font-medium ${isCurrent ? 'text-blue-700' : 'text-gray-500'}`}>{time}</span>
      <span className={`text-lg ${isCurrent ? 'text-gray-900' : 'text-gray-700'}`}>{activity}</span>
    </div>
  </div>
);


export default function Dashboard({ userName }: DashboardProps) {
  const [liveStream, setLiveStream] = useState<LiveStream | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Live Stream Fetching Logic ---
  useEffect(() => {
    fetchLiveStream();
  }, []);

  const fetchLiveStream = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('live_streams')
        .select('*')
        .eq('is_live', true)
        .maybeSingle();

      if (error) throw error;
      setLiveStream(data);
    } catch (error) {
      console.error('Error fetching live stream:', error);
      setLiveStream(null);
    } finally {
      setLoading(false);
    }
  };

  // --- Static Data ---
  const schedule = [
    { time: '8:00 AM', activity: 'Opening Ceremony' },
    { time: '10:00 AM', activity: 'Sermon: The Power of Faith' },
    { time: '1:00 PM', activity: 'Lunch Break & Fellowship' },
    { time: '2:30 PM', activity: 'Seminar: Leadership in the Digital Age' },
    { time: '4:00 PM', activity: 'Power Night & Testimonies' },
    { time: '7:00 PM', activity: 'Closing Prayer' },
  ];

  const currentHour = new Date().getHours();
  // Simple heuristic to highlight the current activity based on time
  const getCurrentScheduleIndex = () => {
    if (currentHour < 10) return 0; // before 10 AM
    if (currentHour < 13) return 1; // before 1 PM
    if (currentHour < 14) return 2; // before 2 PM
    if (currentHour < 16) return 3; // before 4 PM
    if (currentHour < 19) return 4; // before 7 PM
    return -1; // End of day
  };
  const currentActivityIndex = getCurrentScheduleIndex();

  // Fix: The iframe needs to be conditionally rendered and use the youtube_video_id
  const getEmbedUrl = (videoId: string) => `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">
        Welcome Back, <span className="text-blue-600">{userName}!</span>
      </h1>

      {/* Main Content Grid: Live Stream / Schedule */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">

        {/* --- 1. Live Stream Card (Takes 2/3 width on large screens) --- */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-6 lg:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                        <Radio size={28} className="text-blue-600 mr-3" />
                        Event Live Stream
                    </h2>
                    {liveStream?.is_live && (
                        <div className="px-3 py-1 bg-red-600 text-white rounded-full flex items-center gap-2 shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="font-bold text-sm uppercase">LIVE NOW</span>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="relative aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                        <Loader2 className="animate-spin text-gray-500 mr-2" size={32} />
                        <p className="text-gray-600">Checking for live broadcast...</p>
                    </div>
                ) : liveStream ? (
                    <>
                        {/* Correct YouTube Embed */}
                        <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-4 shadow-xl">
                            <iframe 
                                className="w-full h-full"
                                src={getEmbedUrl(liveStream.youtube_video_id)} 
                                title={liveStream.title} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen
                            ></iframe>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{liveStream.title}</h3>
                        <p className="text-md text-blue-600 mt-1 font-medium">Speaker: {liveStream.speaker || 'TBD'}</p>
                        <p className="text-gray-600 mt-2">{liveStream.description || 'Tune in for this powerful session!'}</p>
                    </>
                ) : (
                    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex flex-col items-center justify-center p-4 border-dashed border-2 border-gray-300">
                        <Radio size={48} className="text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium text-lg">No Live Stream Currently Available</p>
                        <p className="text-sm text-gray-500 mt-1">Check the schedule for the next session time.</p>
                    </div>
                )}
            </div>
        </div>

        {/* --- 2. Today's Schedule Card (Takes 1/3 width) --- */}
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Calendar size={24} className="text-red-500 mr-3" />
            Today's Schedule
          </h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {schedule.map((item, index) => (
              <ScheduleItem 
                key={index} 
                time={item.time} 
                activity={item.activity} 
                isCurrent={index === currentActivityIndex}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Secondary Content Grid: Meal, Quiz, DP Generator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- 3. Meal of the Day --- */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border-t-4 border-yellow-500">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Utensils size={20} className="text-yellow-600 mr-2" />
            Meal of the Day
          </h2>
          <p className="text-lg text-gray-700 font-medium">
            **Rice**, **Beans**, **Vegetables**, and **Grilled Chicken**
          </p>
          <p className="text-sm text-gray-500 mt-1">
            (Available at the main dining hall from 1:00 PM)
          </p>
        </div>

        {/* --- 4. Quick Quiz --- */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border-t-4 border-green-500">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <CheckCircle size={20} className="text-green-600 mr-2" />
            Quick Quiz
          </h2>
          <p className="text-gray-700 mb-4 font-medium">Who is the author of the **Book of Ruth**?</p>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-800 text-sm font-medium rounded-full transition-colors border border-green-200">
              Samuel
            </button>
            <button className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-800 text-sm font-medium rounded-full transition-colors border border-green-200">
              Moses
            </button>
            <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-full transition-colors shadow-md">
              Unknown (Correct!)
            </button>
          </div>
        </div>
        
        {/* --- 5. Generate DP/Flyer --- */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border-t-4 border-purple-500 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <ImagePlus size={20} className="text-purple-600 mr-2" />
                    Event DP Generator
                </h2>
                <p className="text-gray-600">
                    Create your personalized **Profile Picture** or event **Flyer** instantly.
                </p>
            </div>
            <button className="w-full mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-lg">
                Generate My DP Now
            </button>
        </div>
      </div>
    </div>
  );
}