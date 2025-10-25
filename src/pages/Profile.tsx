import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Phone, MapPin, Users, Save, CheckCircle, AlertTriangle, Briefcase, Calendar } from 'lucide-react';

// Define the shape of the profile data for better type safety
interface ProfileData {
  full_name: string;
  phone_number: string;
  church_branch: string;
  age_group: string;
  created_at?: string; // Assuming this comes from the auth context profile
}

// Define the shape of the useAuth hook return for clarity
interface AuthContextProps {
  profile: ProfileData | null;
  updateProfile: (data: Partial<ProfileData>) => Promise<{ error: { message: string } | null }>;
  // Add other auth context properties if necessary
}

// Mock the useAuth hook return structure based on usage in the component
const useAuthMock: () => AuthContextProps = useAuth as any; 

export default function Profile() {
  const { profile, updateProfile } = useAuthMock();
  const [formData, setFormData] = useState<ProfileData>({
    full_name: '',
    phone_number: '',
    church_branch: '',
    age_group: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // 1. Initialize form data from context profile
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone_number: profile.phone_number || '',
        church_branch: profile.church_branch || '',
        age_group: profile.age_group || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Call the update function from the AuthContext
    const { error: updateError } = await updateProfile(formData);

    if (updateError) {
      setError(updateError.message || 'Failed to update profile. Please try again.');
    } else {
      setSuccess(true);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Helper to get the first letter for the avatar
  const getInitials = (name: string | undefined): string => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="space-y-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-blue-600/50 pb-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 flex items-center gap-3">
                <User className="w-8 h-8 text-blue-600" />
                My Profile
            </h1>
            <p className="text-gray-600 text-lg">Manage your personal and retreat information</p>
        </div>

        {/* --- Alert Messages --- */}
        {success && (
          <div className="flex items-center bg-green-100 border border-green-300 rounded-xl p-4 transition-all duration-300 shadow-sm">
            <CheckCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">Profile updated successfully! Changes saved.</p>
          </div>
        )}

        {error && (
          <div className="flex items-center bg-red-100 border border-red-300 rounded-xl p-4 transition-all duration-300 shadow-sm">
            <AlertTriangle className="w-6 h-6 mr-3 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* --- Profile Card and Form --- */}
        <div className='bg-white rounded-3xl shadow-2xl p-6 lg:p-10 border-t-8 border-blue-600'>
            
            {/* Profile Header (Avatar and Name) */}
            <div className="flex items-center gap-6 mb-10 pb-6 border-b border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-3xl font-extrabold">
                    {getInitials(profile?.full_name)}
                    </span>
                </div>
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">{profile?.full_name || 'Participant Name'}</h2>
                    <p className="text-blue-600 font-medium mt-1">Retreat Participant</p>
                    <p className="text-sm text-gray-500 mt-1">Account Email: **{profile?.email || 'N/A'}**</p>
                </div>
            </div>

            {/* Profile Update Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    
                    {/* Full Name */}
                    <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-600" /> Full Name
                        </label>
                        <input
                            id="full_name"
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                            placeholder="Enter your full name"
                            disabled={loading}
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-600" /> Phone Number
                        </label>
                        <input
                            id="phone_number"
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                            placeholder="e.g., +2348012345678"
                            disabled={loading}
                        />
                    </div>

                    {/* Church Branch (Select) */}
                    <div>
                        <label htmlFor="church_branch" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" /> Church Branch
                        </label>
                        <select
                            id="church_branch"
                            name="church_branch"
                            value={formData.church_branch}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                            disabled={loading}
                        >
                            <option value="">Select your branch</option>
                            <option value="Lagos Headquarters">Lagos Headquarters</option>
                            <option value="Abuja">Abuja</option>
                            <option value="Port Harcourt">Port Harcourt</option>
                            <option value="Ibadan">Ibadan</option>
                            <option value="Enugu">Enugu</option>
                            <option value="Kano">Kano</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Age Group (Select) */}
                    <div>
                        <label htmlFor="age_group" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" /> Age Group
                        </label>
                        <select
                            id="age_group"
                            name="age_group"
                            value={formData.age_group}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors"
                            disabled={loading}
                        >
                            <option value="">Select age group</option>
                            <option value="18-25">18-25 (Youth)</option>
                            <option value="26-35">26-35 (Young Adult)</option>
                            <option value="36-45">36-45 (Adult)</option>
                            <option value="46-55">46-55 (Senior Adult)</option>
                            <option value="56+">56+ (Elder)</option>
                        </select>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? 'Saving Changes...' : 'Save Profile Changes'}
                    </button>
                </div>
            </form>
        </div>

        {/* --- Supplementary Information & Actions --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Account Information Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 border-gray-400">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                    Account Overview
                </h2>
                <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400"/> Member Since</span>
                        <span className="font-semibold text-gray-800">
                            {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                        </span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-400"/> Account Status</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            Verified & Active
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 border-blue-400">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Save className="w-5 h-5 text-blue-600" />
                    Quick Actions
                </h2>
                <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-white text-gray-800 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors font-medium text-left shadow-sm">
                        View My Retreat Registrations
                    </button>
                    <button className="w-full px-4 py-3 bg-white text-gray-800 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors font-medium text-left shadow-sm">
                        Download My DP (Profile Picture)
                    </button>
                    <button className="w-full px-4 py-3 bg-white text-gray-800 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors font-medium text-left shadow-sm">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}