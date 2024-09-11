import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, logout, updateUserProfile } from '../api/auth';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLogOut,
  FiEdit2,
  FiSave,
  FiActivity,
  FiSettings,
  FiHelpCircle,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetchUserProfile();
        setUserData(response.data);
        setEditedData(response.data);
      } catch (error) {
        setError('Failed to load user data');
        console.error('Error:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      setError('Logout failed');
      console.error('Error:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(editedData);
      setUserData(editedData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-red-500 text-xl'>{error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-gray-500 text-xl'>Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gray-100 p-8'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-semibold text-gray-800'>Welcome, {userData.full_name}</h1>
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 flex items-center'
          >
            <FiLogOut className='mr-2' /> Logout
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-4'>User Profile</h2>
            <div className='flex flex-col items-center'>
              <div className='w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-4'>
                <FiUser className='w-16 h-16 text-gray-600' />
              </div>
              <h2 className='text-xl font-semibold mb-2'>{userData.full_name}</h2>
              <p className='text-gray-500'>{userData.email}</p>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6 md:col-span-2'>
            <h2 className='text-xl font-semibold mb-4'>Account Information</h2>
            <div className='mb-4'>
              <div className='flex space-x-4 border-b'>
                {['profile', 'activity', 'settings'].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 px-1 ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-500 text-blue-500'
                        : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {activeTab === 'profile' && (
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <FiUser className='mr-2 text-gray-500' />
                  <input
                    name='full_name'
                    value={isEditing ? editedData.full_name : userData.full_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className='w-full p-2 border rounded-md'
                  />
                </div>
                <div className='flex items-center'>
                  <FiMail className='mr-2 text-gray-500' />
                  <input
                    name='email'
                    value={isEditing ? editedData.email : userData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className='w-full p-2 border rounded-md'
                  />
                </div>
                <div className='flex items-center'>
                  <FiPhone className='mr-2 text-gray-500' />
                  <input
                    name='phone_number'
                    value={isEditing ? editedData.phone_number : userData.phone_number || 'N/A'}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className='w-full p-2 border rounded-md'
                  />
                </div>
                <div className='flex items-center'>
                  <FiMapPin className='mr-2 text-gray-500' />
                  <input
                    name='address'
                    value={isEditing ? editedData.address : userData.address || 'N/A'}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className='w-full p-2 border rounded-md'
                  />
                </div>
                <div className='flex justify-end'>
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center'
                    >
                      <FiSave className='mr-2' /> Save
                    </button>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 flex items-center'
                    >
                      <FiEdit2 className='mr-2' /> Edit
                    </button>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'activity' && (
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Recent Activity</h3>
                <p className='text-gray-500'>No recent activity to display.</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Account Settings</h3>
                <p className='text-gray-500'>Account settings options will be available soon.</p>
              </div>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>
            <div className='space-y-2'>
              {[
                { icon: FiActivity, text: 'View Activity Log' },
                { icon: FiSettings, text: 'Account Settings' },
                { icon: FiHelpCircle, text: 'Get Help' },
              ].map(({ icon: Icon, text }, index) => (
                <button
                  key={index}
                  className='w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-300 flex items-center'
                >
                  <Icon className='mr-2' /> {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
