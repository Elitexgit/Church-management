import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Loader2, Mail, Lock, AlertTriangle } from 'lucide-react';

interface LoginProps {
  onSwitchToSignUp: () => void;
}

export default function Login({ onSwitchToSignUp }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    // FIX: Corrected typo from e.preventDefaault() to e.preventDefault()
    e.preventDefault(); 
    setError('');
    setLoading(true);

    // Basic client-side validation
    if (!email || !password) {
        setError('Please enter both email and password.');
        setLoading(false);
        return;
    }

    // Attempt Supabase sign in
    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      // Provide a friendlier message for common errors
      let errorMessage = signInError.message || 'Failed to sign in. Please check your credentials.';
      if (errorMessage.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please try again.';
      }

      setError(errorMessage);
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
     
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-t-8 border-blue-600 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
        
       
        <div className="p-8 pb-6 bg-blue-50">
          <div className="flex items-center gap-4">
           
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">DLCF OROZO </h1>
              <p className="text-sm text-blue-600 font-medium tracking-wide">District</p>
            </div>
          </div>
        </div>

        {/* --- Form Section --- */}
        <div className="p-8 pt-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back! 👋</h2>
          <p className="text-gray-600 mb-8">Sign in using your registered email and password.</p>

         
          {error && (
            <div className="flex items-center mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-xl transition-all duration-300 shadow-sm">
              <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your password"
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
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Switch to Sign Up */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account yet?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="text-blue-600 hover:text-blue-700 font-bold transition-colors"
                disabled={loading}
              >
                Create a New Account
              </button>
            </p>
            <button className="mt-3 text-sm text-gray-500 hover:text-blue-500 transition-colors" disabled={loading}>
                Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}