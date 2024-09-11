import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Input validation functions
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
};

const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9_]{4,20}$/;
  return re.test(username);
};

const validatePhoneNumber = (phoneNumber) => {
  const re = /^\+?[0-9]{10,15}$/;
  return re.test(phoneNumber);
};

const sanitizeInput = (input) => {
  return input.replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[char];
  });
};

export const register = async (userData) => {
  if (!validateEmail(userData.email)) {
    throw new Error('Invalid email format');
  }
  if (!validateUsername(userData.username)) {
    throw new Error('Invalid username format');
  }
  if (!validatePhoneNumber(userData.phone_number)) {
    throw new Error('Invalid phone number format');
  }

  const sanitizedData = {
    ...userData,
    full_name: sanitizeInput(userData.full_name),
    organisation_name: sanitizeInput(userData.organisation_name),
  };

  return api.post('/register', sanitizedData);
};

export const login = async (credentials) => {
  const sanitizedCredentials = {
    login_identifier: sanitizeInput(credentials.login_identifier),
    password: credentials.password,
  };
  return api.post('/login', sanitizedCredentials);
};

export const logout = async () => {
  const token = localStorage.getItem('token');
  return api.post('/logout', null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const resetPassword = async (email) => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }
  return api.post('/reset_password', { identifier: email });
};

export const confirmReset = async (resetData) => {
  return api.post('/confirm_reset', resetData);
};

export const verify2FA = async (verificationData) => {
  return api.post('/verify', verificationData);
};

export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  return api.get('/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  const sanitizedData = {
    ...profileData,
    full_name: sanitizeInput(profileData.full_name),
    organisation_name: sanitizeInput(profileData.organisation_name),
  };
  return api.put('/profile', sanitizedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const checkPasswordStrength = async (password) => {
  return api.post('/password/strength', { password });
};