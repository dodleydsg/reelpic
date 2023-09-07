export const BACKEND_DOMAIN = process.env.NODE_ENV === 'production' ? "https://reelpicbackend.onrender.com" : "localhost:4000"
export const AUTH_TOKEN = (token) => `Bearer ${token}`;


