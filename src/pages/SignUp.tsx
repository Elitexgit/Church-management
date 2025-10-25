import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Loader2, User, Mail, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

interface SignUpProps {
  onSwitchToLogin: () => void;
}

export default function SignUp({ onSwitchToLogin }: SignUpProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Client-side validation
    if (!fullName || !email || !password || !confirmPassword) {
        setError('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Attempt Supabase sign up
    const { error: signUpError } = await signUp(email, password, fullName);

    if (signUpError) {
      let errorMessage = signUpError.message || 'Failed to create account. Please try again.';
      if (errorMessage.includes('User already exists')) {
        errorMessage = 'This email is already registered. Please try signing in.';
      }

      setError(errorMessage);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  // --- Success State UI ---
  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-t-8 border-green-600 overflow-hidden p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Registration Complete! 🎉</h2>
            <p className="text-gray-600 mb-8">
              Your account has been successfully created. You can now sign in to access the retreat dashboard.
            </p>
            <button
              onClick={onSwitchToLogin}
              className="w-full py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Sign Up Form UI ---
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container Card with strong shadows and defined borders */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-t-8 border-blue-600 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
        
        {/* --- Branding Section --- */}
        <div className="p-8 pb-6 bg-blue-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">DLCF OROZO</h1>
              <p className="text-sm text-red-600 font-medium tracking-wide">District</p>
            </div>
          </div>
        </div>

      
        <div className="p-8 pt-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600 mb-8">Sign up now to register for the retreat.</p>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-xl transition-all duration-300 shadow-sm">
              <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200"
                  placeholder="John Adebayo"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password (Min 6 chars)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Create a strong password"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Re-enter password"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 font-bold transition-colors"
                disabled={loading}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}