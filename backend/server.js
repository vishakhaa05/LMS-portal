import express from "express";
import cors from "cors";
import {
  seedCategories,
  seedVendors,
  seedEvents,
  seedBookings,
  seedUsers
} from "./data/seedData.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// In-Memory Data Store (Initialized with rich seed data)
let categories = [...seedCategories];
let vendors = [...seedVendors];
let events = [...seedEvents];
let bookings = [...seedBookings];
let users = [...seedUsers];

// ==========================================
// 1. HEALTH & WELCOME ROUTES
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Eventora Platform REST API Server is Active 🚀",
    version: "1.0.0",
    docs: {
      health: "/api/health",
      categories: "/api/categories",
      vendors: "/api/vendors",
      events: "/api/events",
      bookings: "/api/bookings",
      users: "/api/users",
      adminDashboard: "/api/dashboard/admin"
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 2. AUTHENTICATION ROUTES
// ==========================================

app.post("/api/auth/login", (req, res) => {
  const { email, password, role } = req.body;
  const user = users.find(
    (u) => u.email.toLowerCase() === (email || "").toLowerCase()
  );

  if (user) {
    return res.json({ success: true, user });
  }

  // Fallback demo user
  const newUser = {
    id: `usr-${Date.now()}`,
    name: email ? email.split("@")[0] : "Demo User",
    email: email || "user@eventora.com",
    role: role || "customer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    status: "Active",
    joinedDate: new Date().toISOString().split("T")[0]
  };
  users.push(newUser);
  res.json({ success: true, user: newUser });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, role, businessName, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    role: role || "customer",
    businessName,
    phone,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    status: "Active",
    joinedDate: new Date().toISOString().split("T")[0]
  };
  users.push(newUser);
  res.status(201).json({ success: true, user: newUser });
});

// ==========================================
// 3. CATEGORIES ROUTES
// ==========================================

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.post("/api/categories", (req, res) => {
  const { name, description, image } = req.body;
  if (!name) return res.status(400).json({ error: "Category name is required" });

  const newCat = {
    id: `cat-${Date.now()}`,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    description: description || "",
    image: image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    count: 0
  };
  categories.push(newCat);
  res.status(201).json(newCat);
});

app.put("/api/categories/:id", (req, res) => {
  const idx = categories.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Category not found" });

  categories[idx] = { ...categories[idx], ...req.body };
  res.json(categories[idx]);
});

app.delete("/api/categories/:id", (req, res) => {
  categories = categories.filter((c) => c.id !== req.params.id);
  res.json({ message: "Category deleted successfully" });
});

// ==========================================
// 4. VENDORS ROUTES
// ==========================================

app.get("/api/vendors", (req, res) => {
  const { category, city, status, search } = req.query;
  let result = [...vendors];

  if (category && category !== "all") {
    result = result.filter(
      (v) =>
        v.categorySlug?.toLowerCase() === category.toLowerCase() ||
        v.category?.toLowerCase() === category.toLowerCase()
    );
  }
  if (city && city !== "all") {
    result = result.filter((v) => v.city?.toLowerCase() === city.toLowerCase());
  }
  if (status && status !== "all") {
    result = result.filter((v) => v.status?.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (v) =>
        v.name?.toLowerCase().includes(q) ||
        v.category?.toLowerCase().includes(q) ||
        v.city?.toLowerCase().includes(q)
    );
  }

  res.json(result);
});

app.get("/api/vendors/:id", (req, res) => {
  const vendor = vendors.find((v) => v.id === req.params.id);
  if (!vendor) return res.status(404).json({ error: "Vendor not found" });
  res.json(vendor);
});

app.post("/api/vendors", (req, res) => {
  const newVendor = {
    id: `ven-${Date.now()}`,
    rating: 5.0,
    reviewCount: 0,
    status: "Pending",
    verified: false,
    services: [],
    reviews: [],
    gallery: [],
    ...req.body
  };
  vendors.push(newVendor);
  res.status(201).json(newVendor);
});

app.put("/api/vendors/:id", (req, res) => {
  const idx = vendors.findIndex((v) => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Vendor not found" });

  vendors[idx] = { ...vendors[idx], ...req.body };
  res.json(vendors[idx]);
});

app.patch("/api/vendors/:id/status", (req, res) => {
  const { status } = req.body;
  const vendor = vendors.find((v) => v.id === req.params.id);
  if (!vendor) return res.status(404).json({ error: "Vendor not found" });

  vendor.status = status;
  if (status === "Approved") vendor.verified = true;
  res.json(vendor);
});

// Services sub-resource
app.post("/api/vendors/:id/services", (req, res) => {
  const vendor = vendors.find((v) => v.id === req.params.id);
  if (!vendor) return res.status(404).json({ error: "Vendor not found" });

  const newService = {
    id: `srv-${Date.now()}`,
    ...req.body
  };
  vendor.services = vendor.services || [];
  vendor.services.push(newService);
  res.status(201).json(newService);
});

app.delete("/api/vendors/:id/services/:serviceId", (req, res) => {
  const vendor = vendors.find((v) => v.id === req.params.id);
  if (!vendor) return res.status(404).json({ error: "Vendor not found" });

  vendor.services = (vendor.services || []).filter((s) => s.id !== req.params.serviceId);
  res.json({ message: "Service deleted successfully" });
});

// ==========================================
// 5. EVENTS ROUTES
// ==========================================

app.get("/api/events", (req, res) => {
  const { status, customerId } = req.query;
  let result = [...events];

  if (status && status !== "all") {
    result = result.filter((e) => e.status?.toLowerCase() === status.toLowerCase());
  }
  if (customerId) {
    result = result.filter((e) => e.customerId === customerId);
  }

  res.json(result);
});

app.get("/api/events/:id", (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
});

app.post("/api/events", (req, res) => {
  const newEvent = {
    id: `evt-${Date.now()}`,
    status: "Planning",
    progress: 25,
    bookedVendors: [],
    ...req.body
  };
  events.unshift(newEvent);
  res.status(201).json(newEvent);
});

app.put("/api/events/:id", (req, res) => {
  const idx = events.findIndex((e) => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Event not found" });

  events[idx] = { ...events[idx], ...req.body };
  res.json(events[idx]);
});

app.delete("/api/events/:id", (req, res) => {
  events = events.filter((e) => e.id !== req.params.id);
  res.json({ message: "Event removed" });
});

// ==========================================
// 6. BOOKINGS ROUTES
// ==========================================

app.get("/api/bookings", (req, res) => {
  const { vendorId, customerId, status } = req.query;
  let result = [...bookings];

  if (vendorId) {
    result = result.filter((b) => b.vendorId === vendorId);
  }
  if (customerId) {
    result = result.filter((b) => b.customerId === customerId);
  }
  if (status && status !== "all") {
    result = result.filter((b) => b.status?.toLowerCase() === status.toLowerCase());
  }

  res.json(result);
});

app.get("/api/bookings/:id", (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json(booking);
});

app.post("/api/bookings", (req, res) => {
  const newBooking = {
    id: `bkg-${Date.now()}`,
    status: "Pending",
    paymentStatus: "Deposit Paid",
    createdAt: new Date().toISOString().split("T")[0],
    ...req.body
  };
  bookings.unshift(newBooking);

  // Sync with corresponding event if present
  if (newBooking.eventId) {
    const targetEvent = events.find((e) => e.id === newBooking.eventId);
    if (targetEvent) {
      targetEvent.bookedVendors = targetEvent.bookedVendors || [];
      targetEvent.bookedVendors.push({
        vendorId: newBooking.vendorId,
        vendorName: newBooking.vendorName,
        service: newBooking.serviceTitle,
        amount: newBooking.amount,
        status: "Pending"
      });
      targetEvent.progress = Math.min(100, (targetEvent.progress || 30) + 20);
    }
  }

  res.status(201).json(newBooking);
});

app.patch("/api/bookings/:id/respond", (req, res) => {
  const { status } = req.body; // 'Confirmed' or 'Cancelled'
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });

  booking.status = status;

  // Also sync status in corresponding event
  if (booking.eventId) {
    const targetEvent = events.find((e) => e.id === booking.eventId);
    if (targetEvent && targetEvent.bookedVendors) {
      const match = targetEvent.bookedVendors.find((v) => v.vendorId === booking.vendorId);
      if (match) match.status = status;
    }
  }

  res.json(booking);
});

// ==========================================
// 7. USERS ROUTES
// ==========================================

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.patch("/api/users/:id/status", (req, res) => {
  const { status } = req.body;
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.status = status;
  res.json(user);
});

// ==========================================
// 8. DASHBOARD ANALYTICS ROUTES
// ==========================================

app.get("/api/dashboard/admin", (req, res) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const pendingApprovals = vendors.filter((v) => v.status === "Pending");

  res.json({
    metrics: {
      totalUsers: users.length,
      totalVendors: vendors.length,
      totalEvents: events.length,
      totalRevenue
    },
    pendingApprovals,
    monthlyVelocity: [
      { month: "Jun", bookings: 42, revenue: 38400 },
      { month: "Jul", bookings: 58, revenue: 52100 },
      { month: "Aug", bookings: 74, revenue: 68900 },
      { month: "Sep", bookings: 86, revenue: 84300 },
      { month: "Oct", bookings: 110, revenue: 105200 },
      { month: "Nov", bookings: 135, revenue: 129400 }
    ],
    eventsByType: [
      { name: "Wedding", value: 42, color: "#EC4899" },
      { name: "Corporate", value: 28, color: "#3B82F6" },
      { name: "Birthday", value: 18, color: "#F59E0B" },
      { name: "Concert", value: 12, color: "#8B5CF6" }
    ]
  });
});

app.get("/api/dashboard/vendor/:vendorId", (req, res) => {
  const vendor = vendors.find((v) => v.id === req.params.vendorId) || vendors[0];
  const vendorBookings = bookings.filter((b) => b.vendorId === vendor.id);

  const grossEarnings = vendorBookings
    .filter((b) => b.status === "Confirmed" || b.status === "Completed")
    .reduce((sum, b) => sum + (b.amount || 0), 0);

  const pendingRequests = vendorBookings.filter((b) => b.status === "Pending");
  const confirmedGigs = vendorBookings.filter((b) => b.status === "Confirmed");

  res.json({
    vendor,
    grossEarnings,
    pendingCount: pendingRequests.length,
    confirmedCount: confirmedGigs.length,
    rating: vendor.rating,
    bookings: vendorBookings
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✨ Eventora Backend Server active on http://localhost:${PORT}`);
});
