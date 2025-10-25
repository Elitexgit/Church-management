import { Play, Download, FileText, Headphones, Video, Link, Zap, Calendar } from 'lucide-react';

// Define data interfaces for clarity
interface VideoItem {
    title: string;
    speaker: string;
    duration: string;
    date: string;
    thumbnail: string;
}

interface AudioItem {
    title: string;
    speaker: string;
    duration: string;
}

interface DocumentItem {
    title: string;
    pages: string;
    size: string;
}

export default function Media() {
  const videos: VideoItem[] = [
    {
      title: 'Opening Ceremony - Day 1',
      speaker: 'Pastor William Kumuyi',
      duration: '1:45:30',
      date: 'Dec 18, 2024',
      thumbnail: 'https://images.pexels.com/photos/8466800/pexels-photo-8466800.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Leadership Seminar',
      speaker: 'Dr. Grace Okonkwo',
      duration: '2:15:00',
      date: 'Dec 18, 2024',
      thumbnail: 'https://images.pexels.com/photos/7713175/pexels-photo-7713175.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Youth Session',
      speaker: 'Pastor David Okafor',
      duration: '1:30:00',
      date: 'Dec 18, 2024',
      thumbnail: 'https://images.pexels.com/photos/8190807/pexels-photo-8190807.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const audio: AudioItem[] = [
    { title: 'Morning Devotion - Day 1', speaker: 'Pastor John Adeboye', duration: '45:20' },
    { title: 'Worship Session', speaker: 'Praise Team', duration: '1:10:00' },
    { title: 'Teaching on Faith', speaker: 'Pastor William Kumuyi', duration: '55:30' },
  ];

  const documents: DocumentItem[] = [
    { title: 'Retreat Program Schedule', pages: '12 pages', size: '2.5 MB' },
    { title: 'Sermon Notes - Day 1', pages: '8 pages', size: '1.2 MB' },
    { title: 'Bible Study Guide', pages: '24 pages', size: '3.8 MB' },
    { title: 'Workshop Materials', pages: '15 pages', size: '2.1 MB' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="space-y-10">
        
        {/* --- Header and Navigation --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b-4 border-blue-600/50 pb-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 flex items-center gap-3">
            <Link className="w-8 h-8 text-blue-600" />
            Media Center
          </h1>
          <div className="flex gap-3 p-1 bg-gray-100 rounded-xl shadow-inner">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm transition-colors shadow-md hover:bg-blue-700">
              <Video className="w-4 h-4 mr-2 inline-block" /> Videos
            </button>
            <button className="px-4 py-2 bg-transparent text-gray-700 rounded-lg hover:bg-white transition-colors font-medium text-sm">
              <Headphones className="w-4 h-4 mr-2 inline-block" /> Audio
            </button>
            <button className="px-4 py-2 bg-transparent text-gray-700 rounded-lg hover:bg-white transition-colors font-medium text-sm">
              <FileText className="w-4 h-4 mr-2 inline-block" /> Documents
            </button>
          </div>
        </div>

        {/* --- Video Recordings Section --- */}
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-blue-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Video className="w-6 h-6 text-blue-600" />
                Video Recordings
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors flex items-center text-sm">
                View All &rarr;
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-blue-700 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-gray-200 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3"/>
                    {video.date}
                  </div>
                </div>
                <div className='p-4'>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-1 leading-tight">{video.title}</h3>
                    <p className="text-sm text-blue-600 font-medium">{video.speaker}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Audio & Documents Sections --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Audio Messages Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-purple-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Headphones className="w-6 h-6 text-purple-600" />
                Audio Messages
              </h2>
            </div>
            <div className="space-y-3">
              {audio.map((track, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors">
                    <Play className="w-5 h-5 text-purple-600 group-hover:text-white" fill="currentColor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">{track.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{track.speaker} • {track.duration}</p>
                  </div>
                  <button className="p-2 bg-white border border-gray-200 hover:bg-purple-100 rounded-full transition-colors flex-shrink-0">
                    <Download className="w-5 h-5 text-gray-600 hover:text-purple-600" />
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2 text-purple-600 font-semibold border-2 border-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-all">
                More Audio
            </button>
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-green-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-6 h-6 text-green-600" />
                Documents
              </h2>
            </div>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors border border-gray-100 group">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                    <FileText className="w-6 h-6 text-green-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">{doc.title}</h4>
                    <p className="text-sm text-gray-600">{doc.pages} • <span className='font-medium text-gray-700'>{doc.size}</span></p>
                  </div>
                  <button className="p-2 bg-white border border-gray-200 hover:bg-green-100 rounded-full transition-colors flex-shrink-0">
                    <Download className="w-5 h-5 text-gray-600 hover:text-green-600" />
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2 text-green-600 font-semibold border-2 border-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all">
                View All Documents
            </button>
          </div>
        </div>
        
        {/* --- Live Streams Section --- */}
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-t-4 border-red-600">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-red-600" />
                Live Streams & Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Live Stream Card */}
                <div className="border-4 border-red-500 rounded-xl p-5 bg-red-50 shadow-inner">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-600 font-extrabold uppercase text-lg">LIVE NOW</span>
                    </div>
                    <div className="relative aspect-video bg-gray-300 rounded-lg overflow-hidden mb-3 group cursor-pointer">
                        <img
                            src="https://images.pexels.com/photos/8466800/pexels-photo-8466800.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Live Stream"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50">
                            <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-red-600 ml-1" fill="currentColor" />
                            </div>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Power Night Service</h3>
                    <p className="text-md text-red-600 font-semibold">Pastor William Kumuyi</p>
                    <p className="text-sm text-gray-500 mt-2">1,234 viewers currently watching</p>
                </div>

                {/* Upcoming Schedule Card */}
                <div className="border border-gray-300 rounded-xl p-5 bg-white shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-blue-600" />
                        <span className="text-gray-700 font-extrabold uppercase text-lg">Upcoming Schedule</span>
                    </div>
                    <div className="space-y-3">
                        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                            <h4 className="font-bold text-gray-800 mb-1">Morning Devotion</h4>
                            <p className="text-sm text-gray-600">Tomorrow at **8:00 AM**</p>
                        </div>
                        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                            <h4 className="font-bold text-gray-800 mb-1">Teaching Session</h4>
                            <p className="text-sm text-gray-600">Tomorrow at **10:00 AM**</p>
                        </div>
                        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                            <h4 className="font-bold text-gray-800 mb-1">Evening Service</h4>
                            <p className="text-sm text-gray-600">Tomorrow at **7:00 PM**</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                        View Full Program Schedule
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}