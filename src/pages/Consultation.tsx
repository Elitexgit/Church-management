import { Calendar, Clock, User, Video, MessageSquare, CheckCircle } from 'lucide-react';

export default function Consultation() {
  const counselors = [
    {
      name: 'Pastor William Kumuyi',
      role: 'Senior Pastor',
      specialty: 'Spiritual Guidance',
      image: 'https://images.pexels.com/photos/8466800/pexels-photo-8466800.jpeg?auto=compress&cs=tinysrgb&w=200',
      available: true,
    },
    {
      name: 'Dr. Grace Okonkwo',
      role: 'Marriage Counselor',
      specialty: 'Family & Relationships',
      image: 'https://images.pexels.com/photos/7713175/pexels-photo-7713175.jpeg?auto=compress&cs=tinysrgb&w=200',
      available: true,
    },
    {
      name: 'Pastor John Adeboye',
      role: 'Youth Pastor',
      specialty: 'Youth & Career',
      image: 'https://images.pexels.com/photos/8190807/pexels-photo-8190807.jpeg?auto=compress&cs=tinysrgb&w=200',
      available: false,
    },
    {
      name: 'Pastor David Okafor',
      role: 'Associate Pastor',
      specialty: 'Life Coaching',
      image: 'https://images.pexels.com/photos/8466804/pexels-photo-8466804.jpeg?auto=compress&cs=tinysrgb&w=200',
      available: true,
    },
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  ];

  const upcomingAppointments = [
    {
      counselor: 'Pastor William Kumuyi',
      date: 'Today',
      time: '3:00 PM',
      type: 'In-Person',
      topic: 'Spiritual Growth',
    },
    {
      counselor: 'Dr. Grace Okonkwo',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'Video Call',
      topic: 'Marriage Counseling',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Consultation</h1>
        <p className="text-gray-600">Book one-on-one sessions with our counselors and pastors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <Calendar className="w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">5</h3>
          <p className="text-green-100">Available Counselors</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <Clock className="w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">2</h3>
          <p className="text-blue-100">Upcoming Sessions</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <CheckCircle className="w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">8</h3>
          <p className="text-purple-100">Completed Sessions</p>
        </div>
      </div>

      {upcomingAppointments.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">{appointment.counselor}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap">
                      Join Session
                    </button>
                    <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm whitespace-nowrap">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Counselors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {counselors.map((counselor, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={counselor.image}
                    alt={counselor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{counselor.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{counselor.role}</p>
                  <p className="text-sm text-blue-600">{counselor.specialty}</p>
                  <div className="mt-2">
                    {counselor.available ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        Busy
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    counselor.available
                      ? 'bg-[#2c4f87] text-white hover:bg-[#1e3a5f]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!counselor.available}
                >
                  Book Session
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Book a Session</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Counselor</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Choose a counselor</option>
                {counselors.map((counselor, index) => (
                  <option key={index}>{counselor.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-3 border-2 border-blue-500 bg-blue-50 text-blue-700 rounded-lg font-medium flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  In-Person
                </button>
                <button className="px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Video className="w-4 h-4" />
                  Video Call
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Concern</label>
              <textarea
                rows={4}
                placeholder="Briefly describe what you'd like to discuss..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button className="w-full px-6 py-3 bg-[#2c4f87] text-white rounded-lg hover:bg-[#1e3a5f] transition-colors font-medium">
              Book Appointment
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Guidelines</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>Sessions are 45 minutes long</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>All conversations are confidential</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>Please arrive 5 minutes early</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>Reschedule at least 24 hours in advance</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>Emergency support available 24/7</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Need Immediate Help?</h3>
                <p className="text-gray-700 mb-4">
                  If you need urgent counseling or prayer, our support team is available 24/7.
                </p>
                <button className="px-6 py-2 bg-[#2c4f87] text-white rounded-lg hover:bg-[#1e3a5f] transition-colors font-medium">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Sessions</h2>
            <div className="space-y-3">
              {[
                { counselor: 'Pastor William Kumuyi', date: 'Dec 15', topic: 'Faith & Prayer' },
                { counselor: 'Dr. Grace Okonkwo', date: 'Dec 10', topic: 'Family Matters' },
              ].map((session, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-1">{session.counselor}</h4>
                  <p className="text-sm text-gray-600 mb-2">{session.topic}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{session.date}</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Notes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
