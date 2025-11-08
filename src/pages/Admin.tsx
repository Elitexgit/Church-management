import { useState } from 'react';
import {
  Users,
  UserCheck,
  CheckSquare,
  Upload,
  FileText,
  Image,
  Download,
  Trash2,
  Eye,
  FileBadge,
} from 'lucide-react';

// --- Mock Data ---

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  category: string;
  registered_at: string;
}

// Mock data for the list of registered members
const mockRegistrations: Registration[] = [
  {
    id: '1',
    full_name: 'Alice Johnson',
    email: 'alice@example.com',
    phone_number: '555-1234',
    category: 'Attendee',
    registered_at: '2025-10-20T10:00:00Z',
  },
  {
    id: '2',
    full_name: 'Bob Smith',
    email: 'bob@example.com',
    phone_number: '555-5678',
    category: 'Speaker',
    registered_at: '2025-10-19T14:30:00Z',
  },
  {
    id: '3',
    full_name: 'Carol White',
    email: 'carol@example.com',
    phone_number: '555-8765',
    category: 'Attendee',
    registered_at: '2025-10-19T11:15:00Z',
  },
  {
    id: '4',
    full_name: 'David Brown',
    email: 'david@example.com',
    phone_number: '555-4321',
    category: 'VIP',
    registered_at: '2025-10-18T09:00:00Z',
  },
  {
    id: '5',
    full_name: 'Eve Davis',
    email: 'eve@example.com',
    phone_number: '555-1122',
    category: 'Attendee',
    registered_at: '2025-10-17T17:45:00Z',
  },
];

// Mock data for stats cards
const totalMembers = mockRegistrations.length;
const totalAttended = 120; // Hardcoded mock number
const totalSpeakers = mockRegistrations.filter(
  (r) => r.category === 'Speaker'
).length;

// Mock data for uploaded files
const mockAttendanceFiles = [
  { id: 'f1', name: 'Day_1_Sign_In.xlsx', size: '1.2MB', date: '2025-11-01' },
  { id: 'f2', name: 'Day_2_Sign_In.xlsx', size: '1.3MB', date: '2025-11-02' },
  { id: 'f3', name: 'Final_Attendance_Report.pdf', size: '3.5MB', date: '2025-11-03' },
];

// Mock data for media gallery
const mockMediaFiles = [
  { id: 'm1', url: 'https://via.placeholder.com/300/007BFF/FFFFFF?text=Retreat+1', alt: 'Retreat Session 1' },
  { id: 'm2', url: 'https://via.placeholder.com/300/28A745/FFFFFF?text=Group+Photo', alt: 'Group Photo' },
  { id: 'm3', url: 'https://via.placeholder.com/300/FFC107/FFFFFF?text=Workshop', alt: 'Workshop' },
  { id: 'm4', url: 'https://via.placeholder.com/300/DC3545/FFFFFF?text=Keynote', alt: 'Keynote Speaker' },
  { id: 'm5', url: 'https://via.placeholder.com/300/17A2B8/FFFFFF?text=Networking', alt: 'Networking Event' },
  { id: 'm6', url: 'https://via.placeholder.com/300/6C757D/FFFFFF?text=Closing', alt: 'Closing Ceremony' },
];

// --- Component ---

export default function Admin() {
  const [activeTab, setActiveTab] = useState('registrations');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Stats Cards Section (Total Numbers) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-between border-l-4 border-blue-600">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Registrations</p>
            <p className="text-3xl font-bold text-gray-900">{totalMembers}</p>
          </div>
          <Users className="h-10 w-10 text-blue-600" />
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-between border-l-4 border-green-600">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Attended (Mock)</p>
            <p className="text-3xl font-bold text-gray-900">{totalAttended}</p>
          </div>
          <UserCheck className="h-10 w-10 text-green-600" />
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-between border-l-4 border-purple-600">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Speakers</p>
            <p className="text-3xl font-bold text-gray-900">{totalSpeakers}</p>
          </div>
          <CheckSquare className="h-10 w-10 text-purple-600" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {[
          { key: 'registrations', label: 'Registrations' },
          { key: 'attendance', label: 'Upload Attendance' },
          { key: 'media', label: 'Upload Media' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === tab.key
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      
      {/* Registrations Tab */}
      {activeTab === 'registrations' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Retreat Registrations ({mockRegistrations.length})
            </h2>
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              <Download size={18} />
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Phone</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800 font-medium">{reg.full_name}</td>
                    <td className="px-6 py-4 text-gray-600">{reg.email}</td>
                    <td className="px-6 py-4 text-gray-600">{reg.phone_number}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        reg.category === 'Speaker' ? 'bg-purple-100 text-purple-700' :
                        reg.category === 'VIP' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {reg.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(reg.registered_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Attendance Sheet</h2>
            <div className="flex flex-col items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-blue-600 mb-4" />
                  <p className="mb-2 text-lg font-semibold text-gray-700">Drag & drop files here</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                  <p className="mt-4 text-xs text-gray-500">Supported formats: .XLSX, .CSV, .PDF</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Uploaded Files</h2>
            <ul className="space-y-4">
              {mockAttendanceFiles.map((file) => (
                <li key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <FileBadge className="h-7 w-7 text-blue-600" />
                    <div>
                      <span className="font-medium text-gray-800">{file.name}</span>
                      <p className="text-sm text-gray-500">{file.size} - {file.date}</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
              {mockAttendanceFiles.length === 0 && (
                <div className="text-center py-12 text-gray-500">No attendance files uploaded yet.</div>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Upload Media Tab */}
      {activeTab === 'media' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Media</h2>
            <div className="flex flex-col items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Image className="w-12 h-12 text-green-600 mb-4" />
                  {/* THIS WAS THE LINE WITH THE ERROR:
                    It ended with </button> instead of </p>
                  */}
                  <p className="mb-2 text-lg font-semibold text-gray-700">Drag & drop photos or videos</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                  <p className="mt-4 text-xs text-gray-500">Supported formats: .JPG, .PNG, .MP4</p>
                </div>
                <input type="file" className="hidden" multiple />
              </label>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Media Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mockMediaFiles.map((media) => (
                <div key={media.id} className="relative group aspect-square">
                  <img
                    src={media.url}
                    alt={media.alt}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <button className="text-white p-2 rounded-full hover:bg-white/20">
                      <Eye size={20} />
                    </button>
                    <button className="text-red-500 p-2 rounded-full hover:bg-white/20">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {mockMediaFiles.length === 0 && (
                <div className="text-center py-12 text-gray-500">No media uploaded yet.</div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}