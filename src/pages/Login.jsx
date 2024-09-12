import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [credentials, setCredentials] = useState({ login_info: '', password: '' }); // Changed login_identifier to login_info
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { token, user } = await login(credentials);

    if (user.requires2FA) {
      navigate('/2fa', { state: { message: 'Please enter your 2FA code', email: credentials.login_info } });
    } else {
      // The token is already stored in sessionStorage by the login function
      navigate('/dashboard');
    }
  } catch (error) {
    setError(error?.error || 'Invalid credentials');
  }
};

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white';
  const iconClass = 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'
    >
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
            Sign in to Biomedical IQ
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div className='relative mb-4'>
              <FiUser className={iconClass} />
              <input
                name='login_info' // Changed from login_identifier
                type='text'
                required
                className={`${inputClass} pl-10`}
                placeholder='Email or Username'
                value={credentials.login_info} // Changed to match login_info
                onChange={handleChange}
              />
            </div>
            <div className='relative mb-4'>
              <FiLock className={iconClass} />
              <input
                name='password'
                type={showPassword ? 'text' : 'password'}
                required
                className={`${inputClass} pl-10 pr-10`}
                placeholder='Password'
                value={credentials.password}
                onChange={handleChange}
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
                role='alert'
              >
                <span className='block sm:inline'>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-400'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a href='/reset-password' className='font-medium text-blue-500 hover:text-blue-400'>
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Sign in
            </button>
          </div>
        </form>
        <div className='text-center mt-4'>
          <p className='text-sm text-gray-400'>
            Don't have an account?{' '}
            <a href='/register' className='font-medium text-blue-500 hover:text-blue-400'>
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

