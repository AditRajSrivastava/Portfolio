// Backend API Configuration
// Automatically detects environment and uses correct API URL

// For local development (when running npm start locally)
const LOCAL_API = 'http://localhost:3000';

// For production - uses same domain (Vercel serverless functions)
// If you deploy backend separately on Railway, update this to Railway URL
// Example: 'https://portfolio-production-xxxx.up.railway.app'
const PRODUCTION_API = window.location.origin;

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
