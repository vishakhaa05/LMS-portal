// Eventora Frontend API Service Layer
// Communicates with the Eventora Express Backend (http://localhost:5000/api)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function fetchJSON(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`API Error [${res.status}]: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[Eventora API] Failed to reach backend at ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Health
  checkHealth: () => fetchJSON('/health'),

  // Categories
  getCategories: () => fetchJSON('/categories'),
  createCategory: (data) => fetchJSON('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id, data) => fetchJSON(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id) => fetchJSON(`/categories/${id}`, { method: 'DELETE' }),

  // Vendors
  getVendors: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJSON(`/vendors${query ? `?${query}` : ''}`);
  },
  getVendorById: (id) => fetchJSON(`/vendors/${id}`),
  createVendor: (data) => fetchJSON('/vendors', { method: 'POST', body: JSON.stringify(data) }),
  updateVendor: (id, data) => fetchJSON(`/vendors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateVendorStatus: (id, status) =>
    fetchJSON(`/vendors/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  addVendorService: (vendorId, serviceData) =>
    fetchJSON(`/vendors/${vendorId}/services`, { method: 'POST', body: JSON.stringify(serviceData) }),
  deleteVendorService: (vendorId, serviceId) =>
    fetchJSON(`/vendors/${vendorId}/services/${serviceId}`, { method: 'DELETE' }),

  // Events
  getEvents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJSON(`/events${query ? `?${query}` : ''}`);
  },
  getEventById: (id) => fetchJSON(`/events/${id}`),
  createEvent: (data) => fetchJSON('/events', { method: 'POST', body: JSON.stringify(data) }),
  updateEvent: (id, data) => fetchJSON(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEvent: (id) => fetchJSON(`/events/${id}`, { method: 'DELETE' }),

  // Bookings
  getBookings: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJSON(`/bookings${query ? `?${query}` : ''}`);
  },
  createBooking: (data) => fetchJSON('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  respondToBooking: (id, status) =>
    fetchJSON(`/bookings/${id}/respond`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Users
  getUsers: () => fetchJSON('/users'),
  updateUserStatus: (id, status) =>
    fetchJSON(`/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Dashboards
  getAdminDashboard: () => fetchJSON('/dashboard/admin'),
  getVendorDashboard: (vendorId) => fetchJSON(`/dashboard/vendor/${vendorId}`),
};

export default api;

