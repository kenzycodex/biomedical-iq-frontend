import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verify2FA } from '../api/auth';
import FormInput from '../components/FormInput';
import { FiMail, FiKey } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Verify = () => {
  const [verificationData, setVerificationData] = useState({ email: '', verification_code: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVerificationData({ ...verificationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationData.email || !verificationData.verification_code) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await verify2FA(verificationData.email, verificationData.verification_code);
      setSuccess('Account verified successfully!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'
    >
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Verify Your Account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <FormInput
              label='Email'
              name='email'
              type='email'
              value={verificationData.email}
              onChange={handleChange}
              icon={FiMail}
            />
            <FormInput
              label='Verification Code'
              name='verification_code'
              type='text'
              value={verificationData.verification_code}
              onChange={handleChange}
              icon={FiKey}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
              role='alert'
            >
              <span className='block sm:inline'>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
              role='alert'
            >
              <span className='block sm:inline'>{success}</span>
            </motion.div>
          )}

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Verify;