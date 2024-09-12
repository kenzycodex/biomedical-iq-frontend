import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => sessionStorage.getItem('access_token');
const getRefreshToken = () => sessionStorage.getItem('refresh_token');

const refreshToken = async () => {
  try {
    const refresh_token = getRefreshToken();
    if (!refresh_token) {
      throw new Error('Refresh token is missing. Redirecting to login...');
    }

    const response = await fetch(`${API_URL}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token }),
    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem('access_token', data.access_token);
      console.log("Access token refreshed successfully");
      return data.access_token;
    } else {
      throw new Error(data.error || "Token refresh failed");
    }
  } catch (error) {
    console.error("Error occurred while refreshing token:", error);
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    window.location.href = "/login";
  }
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token, redirecting to login...");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    const { token, user } = response.data;

    // Blacklist all former tokens
    sessionStorage.clear();

    // Store the new token
    sessionStorage.setItem('access_token', token);

    return { token, user };
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response?.data || { error: 'Login failed' };
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error.response?.data || { error: 'Failed to fetch user profile' };
  }
};

// Example API Call: Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/update_profile', profileData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      throw new Error('Unauthorized access. Please log in again.');
    }
    throw error.response?.data || { error: 'Failed to update user profile' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Registration failed' };
  }
};

export const verify2FA = async (email, verificationCode) => {
  try {
    const response = await api.post('/verify', { email, verification_code: verificationCode });
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: '2FA verification failed' };
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
};

export const resetPassword = async (identifier) => {
  try {
    const response = await api.post('/reset_password', { identifier });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Password reset request failed' };
  }
};

export const confirmReset = async (resetData) => {
  try {
    const response = await api.post('/confirm_reset', resetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Password reset confirmation failed' };
  }
};

export const toggleMFA = async (enableMFA) => {
  try {
    const response = await api.post('/mfa/toggle', { enable_mfa: enableMFA });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to toggle MFA' };
  }
};

export const getUserActivity = async () => {
  try {
    const response = await api.get('/activity');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch user activity' };
  }
};

export const checkPasswordStrength = async (password) => {
  try {
    const response = await api.post('/password/strength', { password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to check password strength' };
  }
};

export default api;