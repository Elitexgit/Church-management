import { Bell, Mail, MessageSquare, Send } from 'lucide-react';

export default function Communication() {
  const announcements = [
    {
      title: 'Welcome to December Retreat 2024',
      content: 'We are excited to have you here. Please check your schedule and register for programs.',
      time: '2 hours ago',
      priority: 'high',
    },
    {
      title: 'Power Night Tonight',
      content: 'Join us at 7:00 PM in the Main Auditorium for a powerful night of worship and prayer.',
      time: '4 hours ago',
      priority: 'high',
    },
    {
      title: 'Lunch Menu Update',
      content: 'Today\'s lunch will be served from 12:00 PM - 2:00 PM at the dining hall.',
      time: '6 hours ago',
      priority: 'medium',
    },
    {
      title: 'Lost and Found',
      content: 'If you have lost any item, please visit the registration desk.',
      time: '1 day ago',
      priority: 'low',
    },
  ];

  const messages = [
    {
      sender: 'Retreat Admin',
      subject: 'Welcome Package',
      preview: 'Your welcome package is ready for collection...',
      time: '1 hour ago',
      unread: true,
    },
    {
      sender: 'Program Coordinator',
      subject: 'Schedule Update',
      preview: 'There has been a slight change to tomorrow\'s schedule...',
      time: '3 hours ago',
      unread: true,
    },
    {
      sender: 'Pastor William Kumuyi',
      subject: 'Encouragement',
      preview: 'May the Lord bless you abundantly during this retreat...',
      time: '1 day ago',
      unread: false,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Communication</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <Bell className="w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">12</h3>
          <p className="text-blue-100">New Announcements</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <Mail className="w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">5</h3>
          <p className="text-green-100">Unread Messages</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
          <MessageSquare className="w-12 h-12 mb-4" />
          <h3 className="text-3xl font-bold mb-2">8</h3>
          <p className="text-orange-100">Active Conversations</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
            Mark all as read
          </button>
        </div>
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg hover:bg-blue-100 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">{announcement.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    announcement.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : announcement.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {announcement.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-700 mb-2">{announcement.content}</p>
              <span className="text-sm text-gray-500">{announcement.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
            <button className="px-4 py-2 bg-[#2c4f87] text-white rounded-lg hover:bg-[#1e3a5f] transition-colors font-medium text-sm">
              Compose
            </button>
          </div>
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  message.unread ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{message.sender}</h4>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="font-medium text-gray-800 mb-1">{message.subject}</p>
                <p className="text-sm text-gray-600">{message.preview}</p>
                {message.unread && (
                  <span className="inline-block mt-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select recipient</option>
                <option>Retreat Admin</option>
                <option>Program Coordinator</option>
                <option>Meal Services</option>
                <option>Technical Support</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={6}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="w-full px-6 py-3 bg-[#2c4f87] text-white rounded-lg hover:bg-[#1e3a5f] transition-colors font-medium flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Prayer Requests</h2>
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">Anonymous</h4>
              <span className="text-xs text-gray-500">30 mins ago</span>
            </div>
            <p className="text-gray-700">Please pray for my family's peace and unity during this season.</p>
            <button className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Add to prayer list
            </button>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">John D.</h4>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <p className="text-gray-700">Requesting prayers for healing and strength.</p>
            <button className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Add to prayer list
            </button>
          </div>
        </div>
        <button className="w-full mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
          Submit Prayer Request
        </button>
      </div>
    </div>
  );
}
