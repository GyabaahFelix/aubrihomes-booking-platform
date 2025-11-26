import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/authContext';
import { supabase } from '../lib/supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth(); // used to refresh context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Update context and redirect
      await login(email); 
      
      // Fetch role to redirect correctly
      const { data: { session } } = await supabase.auth.getSession();
      if(session?.user) {
         // We need to fetch the profile to know the role for redirection
         // This assumes the context updates fast enough or we manually fetch here
         const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
         if (profile) {
           navigate(`/dashboard/${profile.role}`);
         } else {
           navigate('/');
         }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-brand-500">AubriHomes</Link>
          <h2 className="text-xl font-bold mt-6 text-gray-900">Welcome back</h2>
          <p className="text-gray-500 text-sm mt-1">Login to access your account</p>
        </div>

        {error && <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email address</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
             <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
             <input 
               type="password"
               required
               className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition placeholder-gray-400"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="••••••••"
             />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-lg transition-all shadow-md active:scale-95"
          >
            {loading ? 'Signing in...' : 'Continue'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-brand-600 font-bold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;