// Backend API Configuration
// Update this URL when you deploy your backend

// For local development (when running npm start locally)
const LOCAL_API = 'http://localhost:3000';

// For production (update with your deployed backend URL)
// Example: 'https://your-app.railway.app' or 'https://your-backend.vercel.app'
const PRODUCTION_API = window.location.origin; // Uses same domain by default

// Automatically use correct API based on environment
const API_URL = window.location.hostname === 'localhost' ? LOCAL_API : PRODUCTION_API;

// Export for use in script.js
window.API_CONFIG = {
    baseURL: API_URL,
    endpoints: {
        contact: `${API_URL}/api/contact`,
        contacts: `${API_URL}/api/contacts`,
        health: `${API_URL}/api/health`
    }
};

console.log('API Configuration:', window.API_CONFIG);
