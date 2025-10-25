import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Clock, Users, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

// Define the data interfaces for type safety
interface RegistrationData {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  church_branch: string;
  age_group: string;
  accommodation: string;
  special_requirements: string;
  status: 'confirmed' | 'pending' | 'checked_in' | 'cancelled';
  created_at: string;
}

interface StatsData {
  total: number;
  confirmed: number;
  pending: number;
}

export default function Registration() {
  const { user, profile, loading: authLoading } = useAuth();
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  // Kept stats state and interface, but removed rendering
  const [stats, setStats] = useState<StatsData>({ total: 0, confirmed: 0, pending: 0 }); 
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    church_branch: '',
    age_group: '',
    accommodation: 'Not Required',
    special_requirements: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // --- Data Fetching Functions (Kept for completeness as they were called) ---

  const fetchRegistrations = useCallback(async () => {
    setDataLoading(true);
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching registrations:', error);
    } else {
      setRegistrations(data as RegistrationData[]);
    }
    setDataLoading(false);
  }, []);

  const fetchStats = useCallback(async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select('status');

    if (error) {
      console.error('Error fetching stats:', error);
      return;
    }

    const allRegistrations = data as Pick<RegistrationData, 'status'>[];
    const total = allRegistrations.length;
    const confirmed = allRegistrations.filter(r => r.status === 'confirmed' || r.status === 'checked_in').length;
    const pending = allRegistrations.filter(r => r.status === 'pending').length;

    setStats({ total, confirmed, pending });
  }, []);

  // --- Effects for Initial Data Load & Profile/User Prefill ---

  useEffect(() => {
    if (!authLoading && user) {
      fetchRegistrations();
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        full_name: profile.full_name || '',
        phone_number: profile.phone_number || '',
        church_branch: profile.church_branch || '',
        age_group: profile.age_group || '',
      }));
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || '',
      }));
    }
  }, [user]);

  // --- Form Handlers ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!user) {
      setError('You must be logged in to register. Please log in or sign up first.');
      setLoading(false);
      return;
    }

    try {
      // Check if user already registered to prevent duplicates
      const { data: existingRegistration } = await supabase
        .from('registrations')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (existingRegistration) {
        throw new Error('You have already submitted a registration.');
      }

      const { error: insertError } = await supabase.from('registrations').insert({
        user_id: user.id,
        ...formData,
        status: 'confirmed',
      });

      if (insertError) throw insertError;

      setSuccess(true);
      // Reset non-prefilled/specific fields
      setFormData((prev) => ({
        ...prev,
        accommodation: 'Not Required',
        special_requirements: '',
      }));
      
      // Refresh the displayed data and stats
      fetchRegistrations();
      fetchStats();

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // --- Render Logic ---

  if (authLoading) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <Loader2 className="animate-spin text-blue-600 mr-2" size={32} />
            <p className="text-xl text-gray-700">Loading user profile...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 border-b pb-2">Event Registration</h1>
      
      
      {/* --- ALERTS SECTION --- */}
      {success && (
        <div className="flex items-center bg-green-50 border border-green-300 text-green-800 rounded-xl p-4 mb-6 shadow-md transition-all duration-300">
          <CheckCircle className="h-6 w-6 mr-3" />
          <p className="font-semibold">Success! Your registration has been submitted and confirmed. 🎉</p>
        </div>
      )}

      {error && (
        <div className="flex items-center bg-red-50 border border-red-300 text-red-800 rounded-xl p-4 mb-6 shadow-md transition-all duration-300">
          <Clock className="h-6 w-6 mr-3" />
          <p className="font-semibold">Error: {error}</p>
        </div>
      )}

      {/* --- REGISTRATION FORM --- */}
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 mb-12 border-t-4 border-blue-600 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Registration Form</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Full Name */}
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
              <input
                id="full_name"
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john.doe@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200"
                disabled={!!user}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
              <input
                id="phone_number"
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                placeholder="+234 800 123 4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            {/* Church Branch */}
            <div>
              <label htmlFor="church_branch" className="block text-sm font-medium text-gray-700 mb-2">Church Branch <span className="text-red-500">*</span></label>
              <select
                id="church_branch"
                name="church_branch"
                value={formData.church_branch}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200 bg-white appearance-none"
              >
                <option value="" disabled>Select your branch</option>
                <option value="Lagos Headquarters">Lagos Headquarters</option>
                <option value="Abuja">Abuja</option>
                <option value="Port Harcourt">Port Harcourt</option>
                <option value="Ibadan">Ibadan</option>
                <option value="Enugu">Enugu</option>
                <option value="Other">Other/Not Listed</option>
              </select>
            </div>

            {/* Age Group */}
            <div>
              <label htmlFor="age_group" className="block text-sm font-medium text-gray-700 mb-2">Age Group <span className="text-red-500">*</span></label>
              <select
                id="age_group"
                name="age_group"
                value={formData.age_group}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200 bg-white appearance-none"
              >
                <option value="" disabled>Select your age group</option>
                <option value="18-25">18-25 (Youth)</option>
                <option value="26-35">26-35 (Young Adult)</option>
                <option value="36-45">36-45 (Middle Adult)</option>
                <option value="46-55">46-55 (Senior Adult)</option>
                <option value="56+">56+ (Elder)</option>
              </select>
            </div>

            {/* Accommodation */}
            <div>
              <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700 mb-2">Accommodation Needs <span className="text-red-500">*</span></label>
              <select
                id="accommodation"
                name="accommodation"
                value={formData.accommodation}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200 bg-white appearance-none"
              >
                <option value="Not Required">Not Required</option>
                <option value="On-site">Yes, On-site Accommodation</option>
                <option value="Off-site">Yes, Off-site Hotel/Arrangement</option>
              </select>
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <label htmlFor="special_requirements" className="block text-sm font-medium text-gray-700 mb-2">Special Requirements (Optional)</label>
            <textarea
              id="special_requirements"
              name="special_requirements"
              value={formData.special_requirements}
              onChange={handleChange}
              rows={4}
              placeholder="Any dietary restrictions, accessibility needs, or medical conditions..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !user}
            className="w-full md:w-auto px-10 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
                <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Submitting...
                </>
            ) : (
                'Confirm & Submit Registration'
            )}
          </button>
          {!user && (
            <p className="text-sm text-red-500">Note: You must be logged in to submit this form.</p>
          )}
        </form>
      </div>

      {/* --- RECENT REGISTRATIONS TABLE --- */}
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-t-4 border-gray-400 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Registrations (Last 5)</h2>
        
        {dataLoading ? (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="animate-spin text-gray-400 mr-2" size={24} />
                <p className="text-gray-500">Fetching registration data...</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="text-left py-4 px-6 font-bold text-sm text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="text-left py-4 px-6 font-bold text-sm text-gray-600 uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th className="text-left py-4 px-6 font-bold text-sm text-gray-600 uppercase tracking-wider hidden md:table-cell">Branch</th>
                    <th className="text-left py-4 px-6 font-bold text-sm text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                {registrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="py-4 px-6 text-gray-800 font-medium whitespace-nowrap">{registration.full_name}</td>
                    <td className="py-4 px-6 text-gray-500 hidden sm:table-cell whitespace-nowrap">{registration.email}</td>
                    <td className="py-4 px-6 text-gray-500 hidden md:table-cell whitespace-nowrap">{registration.church_branch}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                        <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            registration.status === 'confirmed' || registration.status === 'checked_in'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : registration.status === 'pending'
                            ? 'bg-orange-100 text-orange-700 border border-orange-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                        >
                        {registration.status.replace('_', ' ').charAt(0).toUpperCase() + registration.status.replace('_', ' ').slice(1)}
                        </span>
                    </td>
                    </tr>
                ))}
                {registrations.length === 0 && (
                    <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                        No registrations found yet.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        )}
      </div>
    </div>
  );
}