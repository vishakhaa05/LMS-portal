# Eventora — Premium Event Management & Vendor Platform

Eventora is a modern full-stack web application for orchestrating celebrations and managing multi-vendor marketplaces. Built with React (Vite, pure JavaScript `.jsx`), Tailwind CSS, React Router, Recharts, Lucide React, and a companion Express REST API service.

---

## 📁 Repository Structure

The project is structured strictly into two clean directories:

```
LMS-portal/
├── frontend/                     # React (Vite) Single Page Application
│   ├── src/
│   │   ├── components/           # Reusable UI components & layouts
│   │   │   ├── common/           # Navbar, Sidebar, StatCard, DataTable, Modal, Drawer, etc.
│   │   │   └── layout/           # PublicLayout, DashboardLayout, CustomerLayout
│   │   ├── context/              # AuthContext, DataContext, ToastContext, ThemeContext
│   │   ├── data/                 # Rich mock data (vendors, events, bookings, charts)
│   │   ├── pages/                # Public, Auth, Admin, Vendor, and Customer pages
│   │   ├── services/             # api.js client service layer
│   │   ├── App.jsx               # Route definitions
│   │   ├── main.jsx              # Application entrypoint
│   │   └── index.css             # Tailwind base & glassmorphism
│   ├── index.html                # Google Fonts (Inter & Poppins)
│   ├── tailwind.config.js        # Design system & color tokens
│   ├── vite.config.js            # Vite bundler configuration
│   └── package.json
│
├── backend/                      # Node.js / Express REST API Service
│   ├── data/
│   │   └── seedData.js           # Seed data for vendors, events, categories, bookings, users
│   ├── server.js                 # Complete REST API routes, controllers & logger
│   └── package.json              # Express, CORS, MySQL2 dependencies
│
├── .gitignore                    # Clean ignores for node_modules, dist, .env
└── README.md                     # Documentation
```

---

## 🚀 Running the Project

### 1. Start the Backend API Server
```powershell
cd backend
npm install   # Installs dependencies if not already installed
npm start     # Runs server on http://localhost:5000
```

#### Backend REST API Endpoints:
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service uptime and status |
| `GET` | `/api/categories` | List all event categories |
| `POST` | `/api/categories` | Add new category |
| `GET` | `/api/vendors` | List vendors (`?category=...&city=...&status=...&search=...`) |
| `GET` | `/api/vendors/:id` | Get vendor details & service packages |
| `POST` | `/api/vendors` | Create/apply new vendor |
| `PATCH` | `/api/vendors/:id/status` | Approve, reject, or suspend vendor |
| `POST` | `/api/vendors/:id/services` | Add service package to vendor profile |
| `DELETE` | `/api/vendors/:id/services/:srvId` | Remove service package |
| `GET` | `/api/events` | List all celebrations (`?status=...&customerId=...`) |
| `POST` | `/api/events` | Create new planned event |
| `GET` | `/api/bookings` | List bookings (`?vendorId=...&customerId=...&status=...`) |
| `POST` | `/api/bookings` | Create new vendor booking request |
| `PATCH` | `/api/bookings/:id/respond` | Accept or decline booking request |
| `GET` | `/api/users` | List registered platform accounts |
| `PATCH` | `/api/users/:id/status` | Block or unblock user account |
| `GET` | `/api/dashboard/admin` | Aggregate metrics, charts data, and pending approvals |
| `GET` | `/api/dashboard/vendor/:id` | Vendor earnings, upcoming gigs, and booking requests |

---

### 2. Start the Frontend Web App
```powershell
cd frontend
npm install   # Installs dependencies if needed
npm run dev   # Starts Vite dev server on http://localhost:5173
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎭 Roles & 1-Click Demo Testing

The frontend features an **Instant Role Switcher** in the top navigation bar and on the Sign In page (`/login`):

1. **Admin**: Alexander Cross (`admin@eventora.com`) -> Moderation, 4 gradient stat cards, line/donut/bar charts, vendor approvals, user accounts, platform settings.
2. **Vendor**: Elena & Mark (`contact@luminalens.com`) -> Earnings statements, storefront profile & photo gallery manager, package creator, booking requests queue, calendar view.
3. **Customer**: Sophia Miller (`sophia@example.com`) -> Browse vendors with multi-filters, package selection, 4-step event creation wizard, progress tracker, and escrow booking vouchers.
