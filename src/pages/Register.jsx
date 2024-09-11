import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    username: '',
    phone_number: '',
    organisation_name: '',
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      setSuccess('Registration successful! Please check your email for verification.');
      setTimeout(() => navigate('/verify'), 3000);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during registration');
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white";
  const iconClass = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your Biomedical IQ account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative mb-4">
              <FiUser className={iconClass} />
              <input
                name="full_name"
                type="text"
                required
                className={`${inputClass} pl-10`}
                placeholder="Full Name"
                value={userData.full_name}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4">
              <FiMail className={iconClass} />
              <input
                name="email"
                type="email"
                required
                className={`${inputClass} pl-10`}
                placeholder="Email address"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4">
              <FiUser className={iconClass} />
              <input
                name="username"
                type="text"
                required
                className={`${inputClass} pl-10`}
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4">
              <FiPhone className={iconClass} />
              <input
                name="phone_number"
                type="tel"
                required
                className={`${inputClass} pl-10`}
                placeholder="Phone Number"
                value={userData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4">
              <FiBriefcase className={iconClass} />
              <input
                name="organisation_name"
                type="text"
                required
                className={`${inputClass} pl-10`}
                placeholder="Organization Name"
                value={userData.organisation_name}
                onChange={handleChange}
              />
            </div>
            <div className="relative mb-4">
              <FiLock className={iconClass} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className={`${inputClass} pl-10 pr-10`}
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="relative mb-4">
              <FiLock className={iconClass} />
              <input
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                required
                className={`${inputClass} pl-10 pr-10`}
                placeholder="Confirm Password"
                value={userData.confirm_password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
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
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-500 hover:text-blue-400">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;