import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Edit2, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Schedule {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  created_at: string;
}

interface Meal {
  id: string;
  name: string;
  description: string;
  meal_type: string;
  date: string;
  dietary_info: string;
  created_at: string;
}

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  event: string;
  category: string;
  created_at: string;
}

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('schedules');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const [scheduleForm, setScheduleForm] = useState({
    title: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
  });

  const [mealForm, setMealForm] = useState({
    name: '',
    description: '',
    meal_type: 'breakfast',
    date: '',
    dietary_info: '',
  });

  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [editingMealId, setEditingMealId] = useState<string | null>(null);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      setIsAdmin(!!data);
      if (data) {
        await Promise.all([fetchSchedules(), fetchMeals(), fetchRegistrations()]);
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedules = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setSchedules(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const fetchMeals = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('meals_menu')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setMeals(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const fetchRegistrations = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('id, full_name, email, phone_number, event, category, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (!adminData) throw new Error('Admin not found');

      const { error: insertError } = await supabase.from('schedules').insert({
        ...scheduleForm,
        created_by: adminData.id,
      });

      if (insertError) throw insertError;

      setSuccess('Schedule added successfully!');
      setScheduleForm({
        title: '',
        description: '',
        date: '',
        start_time: '',
        end_time: '',
        location: '',
      });
      await fetchSchedules();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to add schedule');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (!adminData) throw new Error('Admin not found');

      const { error: insertError } = await supabase.from('meals_menu').insert({
        ...mealForm,
        created_by: adminData.id,
      });

      if (insertError) throw insertError;

      setSuccess('Meal added successfully!');
      setMealForm({
        name: '',
        description: '',
        meal_type: 'breakfast',
        date: '',
        dietary_info: '',
      });
      await fetchMeals();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to add meal');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteSchedule = async (id: string) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return;

    try {
      const { error } = await supabase.from('schedules').delete().eq('id', id);
      if (error) throw error;
      setSuccess('Schedule deleted successfully');
      await fetchSchedules();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteMeal = async (id: string) => {
    if (!confirm('Are you sure you want to delete this meal?')) return;

    try {
      const { error } = await supabase.from('meals_menu').delete().eq('id', id);
      if (error) throw error;
      setSuccess('Meal deleted successfully');
      await fetchMeals();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50 rounded-2xl p-8">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
          <h1 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h1>
          <p className="text-red-600">You do not have admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {success && (
        <div className="flex items-center bg-green-50 border border-green-300 text-green-800 rounded-xl p-4 mb-6">
          <CheckCircle className="h-6 w-6 mr-3" />
          <p className="font-semibold">{success}</p>
        </div>
      )}

      {error && (
        <div className="flex items-center bg-red-50 border border-red-300 text-red-800 rounded-xl p-4 mb-6">
          <AlertCircle className="h-6 w-6 mr-3" />
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {['schedules', 'meals', 'registrations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'schedules' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Schedule</h2>
            <form onSubmit={handleAddSchedule} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={scheduleForm.title}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={scheduleForm.location}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                />
                <input
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    value={scheduleForm.start_time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, start_time: e.target.value })}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  />
                  <input
                    type="time"
                    value={scheduleForm.end_time}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, end_time: e.target.value })}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  />
                </div>
              </div>
              <textarea
                placeholder="Description"
                value={scheduleForm.description}
                onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                <Plus size={20} />
                {submitting ? 'Adding...' : 'Add Schedule'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedules</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Title</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Time</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Location</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schedules.map((schedule) => (
                    <tr key={schedule.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800 font-medium">{schedule.title}</td>
                      <td className="px-6 py-4 text-gray-600">{schedule.date}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {schedule.start_time} - {schedule.end_time}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{schedule.location}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteSchedule(schedule.id)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {schedules.length === 0 && (
                <div className="text-center py-12 text-gray-500">No schedules yet</div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'meals' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-600">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Meal</h2>
            <form onSubmit={handleAddMeal} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Meal Name"
                  value={mealForm.name}
                  onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500"
                />
                <select
                  value={mealForm.meal_type}
                  onChange={(e) => setMealForm({ ...mealForm, meal_type: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
                <input
                  type="date"
                  value={mealForm.date}
                  onChange={(e) => setMealForm({ ...mealForm, date: e.target.value })}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500"
                />
                <input
                  type="text"
                  placeholder="Dietary Info (e.g., Vegetarian, Gluten-free)"
                  value={mealForm.dietary_info}
                  onChange={(e) => setMealForm({ ...mealForm, dietary_info: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500"
                />
              </div>
              <textarea
                placeholder="Description"
                value={mealForm.description}
                onChange={(e) => setMealForm({ ...mealForm, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500"
              />
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50"
              >
                <Plus size={20} />
                {submitting ? 'Adding...' : 'Add Meal'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meals Menu</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Dietary Info</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {meals.map((meal) => (
                    <tr key={meal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800 font-medium">{meal.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                          {meal.meal_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{meal.date}</td>
                      <td className="px-6 py-4 text-gray-600">{meal.dietary_info || '-'}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteMeal(meal.id)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {meals.length === 0 && (
                <div className="text-center py-12 text-gray-500">No meals yet</div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Registrations ({registrations.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Phone</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Event</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800 font-medium">{reg.full_name}</td>
                    <td className="px-6 py-4 text-gray-600">{reg.email}</td>
                    <td className="px-6 py-4 text-gray-600">{reg.phone_number}</td>
                    <td className="px-6 py-4 text-gray-600">{reg.event}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {reg.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(reg.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {registrations.length === 0 && (
              <div className="text-center py-12 text-gray-500">No registrations yet</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
