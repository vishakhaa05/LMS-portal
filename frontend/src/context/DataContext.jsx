import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialCategories,
  initialVendors,
  initialEvents,
  initialBookings,
  initialUsers,
  recentActivities,
  initialNotifications,
  monthlyBookingsData,
  eventsByTypeData,
  topVendorsChartData,
  vendorMonthlyEarnings,
  vendorTransactions
} from '../data/mockData';
import { useToast } from './ToastContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { addToast } = useToast();

  const loadFromStorage = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`eventora_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [categories, setCategories] = useState(() => loadFromStorage('categories', initialCategories));
  const [vendors, setVendors] = useState(() => loadFromStorage('vendors', initialVendors));
  const [events, setEvents] = useState(() => loadFromStorage('events', initialEvents));
  const [bookings, setBookings] = useState(() => loadFromStorage('bookings', initialBookings));
  const [users, setUsers] = useState(() => loadFromStorage('users', initialUsers));
  const [notifications, setNotifications] = useState(() => loadFromStorage('notifications', initialNotifications));
  const [activities, setActivities] = useState(() => loadFromStorage('activities', recentActivities));

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('eventora_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('eventora_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('eventora_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventora_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('eventora_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('eventora_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('eventora_activities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (text, type = 'general') => {
    const newAct = {
      id: 'act-' + Date.now(),
      text,
      time: 'Just now',
      type
    };
    setActivities(prev => [newAct, ...prev]);
  };

  // Vendor actions
  const approveVendor = (vendorId) => {
    setVendors(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, status: 'Approved', verified: true } : v))
    );
    const target = vendors.find(v => v.id === vendorId);
    addActivity(`Vendor "${target?.name || vendorId}" approved by Admin`, 'vendor');
    addToast({
      type: 'success',
      title: 'Vendor Approved',
      message: `${target?.name || 'Vendor'} is now live and listed in Eventora directory.`
    });
  };

  const rejectVendor = (vendorId) => {
    setVendors(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, status: 'Rejected', verified: false } : v))
    );
    const target = vendors.find(v => v.id === vendorId);
    addActivity(`Vendor "${target?.name || vendorId}" application rejected`, 'vendor');
    addToast({
      type: 'warning',
      title: 'Vendor Rejected',
      message: `Application for ${target?.name || 'vendor'} was rejected.`
    });
  };

  const blockVendor = (vendorId) => {
    setVendors(prev =>
      prev.map(v => {
        if (v.id === vendorId) {
          const nextStatus = v.status === 'Suspended' ? 'Approved' : 'Suspended';
          return { ...v, status: nextStatus };
        }
        return v;
      })
    );
    const target = vendors.find(v => v.id === vendorId);
    const isNowSuspended = target?.status !== 'Suspended';
    addActivity(`Vendor "${target?.name || vendorId}" status set to ${isNowSuspended ? 'Suspended' : 'Approved'}`, 'vendor');
    addToast({
      type: isNowSuspended ? 'error' : 'success',
      title: isNowSuspended ? 'Vendor Suspended' : 'Vendor Reactivated',
      message: `${target?.name} is now ${isNowSuspended ? 'temporarily suspended' : 'active'}.`
    });
  };

  const updateVendorProfile = (vendorId, updatedData) => {
    setVendors(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, ...updatedData } : v))
    );
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your vendor details and settings were saved successfully.'
    });
  };

  // Services actions
  const addService = (vendorId, serviceData) => {
    const newService = {
      ...serviceData,
      id: 'srv-' + Date.now(),
      features: serviceData.features || ['Premium Support', 'Dedicated Coordination']
    };
    setVendors(prev =>
      prev.map(v => {
        if (v.id === vendorId) {
          return { ...v, services: [...(v.services || []), newService] };
        }
        return v;
      })
    );
    addToast({
      type: 'success',
      title: 'Service Created',
      message: `"${serviceData.title}" has been published to your storefront.`
    });
  };

  const updateService = (vendorId, serviceId, updatedData) => {
    setVendors(prev =>
      prev.map(v => {
        if (v.id === vendorId) {
          return {
            ...v,
            services: (v.services || []).map(s => (s.id === serviceId ? { ...s, ...updatedData } : s))
          };
        }
        return v;
      })
    );
    addToast({
      type: 'success',
      title: 'Service Updated',
      message: 'Package details were modified successfully.'
    });
  };

  const deleteService = (vendorId, serviceId) => {
    setVendors(prev =>
      prev.map(v => {
        if (v.id === vendorId) {
          return {
            ...v,
            services: (v.services || []).filter(s => s.id !== serviceId)
          };
        }
        return v;
      })
    );
    addToast({
      type: 'info',
      title: 'Service Removed',
      message: 'Service package was removed from your profile.'
    });
  };

  // Events actions
  const createEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: 'evt-' + Date.now(),
      status: 'Planning',
      progress: 25,
      bookedVendors: eventData.bookedVendors || [],
    };
    setEvents(prev => [newEvent, ...prev]);
    addActivity(`New event created: "${eventData.title}"`, 'event');
    addToast({
      type: 'success',
      title: 'Event Created Successfully!',
      message: `"${eventData.title}" is ready. Now you can browse & book top vendors.`
    });
    return newEvent;
  };

  const updateEvent = (eventId, updatedData) => {
    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, ...updatedData } : e))
    );
    addToast({
      type: 'success',
      title: 'Event Updated',
      message: 'Your event timeline and requirements were saved.'
    });
  };

  // Booking actions
  const bookVendor = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: 'bkg-' + Date.now(),
      status: 'Pending',
      paymentStatus: 'Deposit Paid',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);

    // Also update event bookedVendors
    setEvents(prev =>
      prev.map(e => {
        if (e.id === bookingData.eventId) {
          const updatedVendors = [
            ...(e.bookedVendors || []),
            {
              vendorId: bookingData.vendorId,
              vendorName: bookingData.vendorName,
              service: bookingData.serviceTitle,
              amount: bookingData.amount,
              status: 'Pending'
            }
          ];
          return {
            ...e,
            bookedVendors: updatedVendors,
            progress: Math.min(100, (e.progress || 30) + 20)
          };
        }
        return e;
      })
    );

    addActivity(`New booking request sent to "${bookingData.vendorName}"`, 'booking');
    addToast({
      type: 'success',
      title: 'Booking Request Sent!',
      message: `Your booking for ${bookingData.vendorName} is pending vendor confirmation.`
    });
    return newBooking;
  };

  const respondToBooking = (bookingId, responseStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: responseStatus } : b))
    );
    const target = bookings.find(b => b.id === bookingId);
    
    // Also update status in corresponding event
    if (target) {
      setEvents(prevEvents =>
        prevEvents.map(e => {
          if (e.id === target.eventId) {
            const updatedVendors = (e.bookedVendors || []).map(v =>
              v.vendorId === target.vendorId ? { ...v, status: responseStatus } : v
            );
            return { ...e, bookedVendors: updatedVendors };
          }
          return e;
        })
      );
    }

    const isAccepted = responseStatus === 'Confirmed';
    addActivity(`Booking #${bookingId} was ${isAccepted ? 'accepted' : 'declined'} by vendor`, 'booking');
    addToast({
      type: isAccepted ? 'success' : 'warning',
      title: isAccepted ? 'Booking Accepted!' : 'Booking Declined',
      message: `The client has been notified of your response.`
    });
  };

  // User actions
  const toggleBlockUser = (userId) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const next = u.status === 'Blocked' ? 'Active' : 'Blocked';
          return { ...u, status: next };
        }
        return u;
      })
    );
    const target = users.find(u => u.id === userId);
    const isBlocked = target?.status !== 'Blocked';
    addToast({
      type: isBlocked ? 'error' : 'success',
      title: isBlocked ? 'User Blocked' : 'User Unblocked',
      message: `${target?.name} status changed to ${isBlocked ? 'Blocked' : 'Active'}.`
    });
  };

  // Category actions
  const addCategory = (catData) => {
    const newCat = {
      ...catData,
      id: 'cat-' + Date.now(),
      count: 0,
      slug: catData.name.toLowerCase().replace(/\s+/g, '-'),
      color: catData.color || 'from-violet-500 to-indigo-600',
      icon: catData.icon || 'Sparkles'
    };
    setCategories(prev => [...prev, newCat]);
    addToast({
      type: 'success',
      title: 'Category Added',
      message: `Category "${catData.name}" has been created.`
    });
  };

  const updateCategory = (catId, updatedData) => {
    setCategories(prev =>
      prev.map(c => (c.id === catId ? { ...c, ...updatedData } : c))
    );
    addToast({
      type: 'success',
      title: 'Category Updated',
      message: 'Category details have been saved.'
    });
  };

  const deleteCategory = (catId) => {
    setCategories(prev => prev.filter(c => c.id !== catId));
    addToast({
      type: 'info',
      title: 'Category Deleted',
      message: 'The category was successfully removed.'
    });
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <DataContext.Provider
      value={{
        categories,
        vendors,
        events,
        bookings,
        users,
        notifications,
        activities,
        monthlyBookingsData,
        eventsByTypeData,
        topVendorsChartData,
        vendorMonthlyEarnings,
        vendorTransactions,
        approveVendor,
        rejectVendor,
        blockVendor,
        updateVendorProfile,
        addService,
        updateService,
        deleteService,
        createEvent,
        updateEvent,
        bookVendor,
        respondToBooking,
        toggleBlockUser,
        addCategory,
        updateCategory,
        deleteCategory,
        markNotificationRead,
        clearAllNotifications
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

