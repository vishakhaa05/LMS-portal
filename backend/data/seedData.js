// Seed data for Eventora Backend Service

export const seedCategories = [
  {
    id: 'cat-1',
    name: 'Wedding',
    slug: 'wedding',
    icon: 'HeartHandshake',
    description: 'Bespoke weddings, lavish banquets, mandap & floral styling',
    count: 142,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-2',
    name: 'Birthday',
    slug: 'birthday',
    icon: 'Cake',
    description: 'Milestone celebrations, theme parties, balloon decor & cakes',
    count: 98,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-3',
    name: 'Corporate',
    slug: 'corporate',
    icon: 'Briefcase',
    description: 'Summits, product launches, galas, award nights & retreats',
    count: 215,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-4',
    name: 'Concert & Festival',
    slug: 'concert',
    icon: 'Music',
    description: 'Live concerts, music fests, stage lighting, DJ setups & acoustics',
    count: 64,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-5',
    name: 'Photography & Film',
    slug: 'photography',
    icon: 'Camera',
    description: 'Cinematic wedding films, pre-wedding shoots, drone & studio',
    count: 87,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-6',
    name: 'Catering & Dining',
    slug: 'catering',
    icon: 'Utensils',
    description: 'Gourmet multi-cuisine catering, live culinary stations & mixology',
    count: 110,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80'
  }
];

export const seedVendors = [
  {
    id: 'ven-1',
    name: 'Lumina Lens Cinematics',
    category: 'Photography & Film',
    categorySlug: 'photography',
    city: 'New York, NY',
    rating: 4.95,
    reviewCount: 148,
    startingPrice: 1200,
    status: 'Approved',
    verified: true,
    featured: true,
    phone: '+1 (555) 234-5678',
    email: 'contact@luminalens.com',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    bio: 'Award-winning visual storytellers specializing in cinematic wedding documentaries and commercial event coverage.',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-101',
        title: 'Full Day Cinematic Wedding Package',
        price: 2800,
        unit: 'per event',
        description: '2 lead cinematographers, 10 hours coverage, 4K highlights film, drone footage.',
        features: ['10 Hours Coverage', '2 Master Cinematographers', '4K Drone Aerial Footage']
      },
      {
        id: 'srv-102',
        title: 'Pre-Wedding & Engagement Shoot',
        price: 950,
        unit: 'per session',
        description: '3-hour outdoor creative storytelling session with 45 retouched digital photos.',
        features: ['3 Hours Outdoor Session', '45 High-Res Retouched Images']
      }
    ],
    reviews: [
      { id: 'rev-1', author: 'Elena Rostova', rating: 5, date: '2026-10-14', comment: 'Lumina Lens captured our wedding beyond our wildest dreams!' }
    ]
  },
  {
    id: 'ven-2',
    name: 'Starlight Gourmet Catering',
    category: 'Catering & Dining',
    categorySlug: 'catering',
    city: 'San Francisco, CA',
    rating: 4.88,
    reviewCount: 210,
    startingPrice: 45,
    status: 'Approved',
    verified: true,
    featured: true,
    phone: '+1 (555) 891-2345',
    email: 'info@starlightgourmet.com',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    bio: 'Farm-to-table culinary experiences crafted by Michelin-trained executive chefs.',
    gallery: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-201',
        title: 'Royal 5-Course Plated Dinner',
        price: 85,
        unit: 'per guest',
        description: 'Exquisite 5-course seasonal culinary journey with sommelier wine pairings.',
        features: ['5 Artisanal Courses', 'Sommelier Wine Pairings', 'White Glove Service']
      }
    ],
    reviews: [
      { id: 'rev-3', author: 'David Chen', rating: 5, date: '2026-10-02', comment: 'Exceptional service and unforgettable cuisine.' }
    ]
  },
  {
    id: 'ven-3',
    name: 'Grand Crystal Palace Resort',
    category: 'Wedding',
    categorySlug: 'wedding',
    city: 'Los Angeles, CA',
    rating: 4.92,
    reviewCount: 312,
    startingPrice: 4500,
    status: 'Approved',
    verified: true,
    featured: true,
    phone: '+1 (555) 345-6789',
    email: 'events@grandcrystalpalace.com',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    bio: 'Palatial ballroom and sun-drenched garden estate accommodating up to 600 seated guests.',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
    ],
    services: [
      {
        id: 'srv-301',
        title: 'Grand Ballroom Imperial Package',
        price: 7500,
        unit: 'per day',
        description: '12-hour ballroom buyout, bridal dressing lounges, grand foyer.',
        features: ['Capacity up to 600 Guests', 'Dedicated Day-of Venue Manager']
      }
    ],
    reviews: []
  },
  {
    id: 'ven-4',
    name: 'DJ Pulse Sound & Laser Works',
    category: 'Concert & Festival',
    categorySlug: 'concert',
    city: 'Austin, TX',
    rating: 4.85,
    reviewCount: 94,
    startingPrice: 800,
    status: 'Approved',
    verified: true,
    featured: true,
    phone: '+1 (555) 456-7890',
    email: 'booking@djpulse.live',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    bio: 'Concert-grade acoustics, dynamic intelligent lighting rigs, cold spark machines.',
    gallery: [],
    services: [
      {
        id: 'srv-401',
        title: 'Ultimate Festival & Party Stage Rig',
        price: 1600,
        unit: 'per event',
        description: '5 hours live DJ set, intelligent beam lighting, cold spark machines.',
        features: ['5 Hours Live DJ', 'Moving Head Lights', '4x Cold Pyro Sparklers']
      }
    ],
    reviews: []
  },
  {
    id: 'ven-6',
    name: 'Vanguard Audio-Visual & Tech',
    category: 'Corporate',
    categorySlug: 'corporate',
    city: 'Seattle, WA',
    rating: 4.90,
    reviewCount: 82,
    startingPrice: 1800,
    status: 'Pending',
    verified: false,
    featured: false,
    phone: '+1 (555) 678-9012',
    email: 'support@vanguardav.tech',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    bio: 'Enterprise AV production, seamless LED video walls, and translation booths.',
    gallery: [],
    services: [],
    reviews: []
  }
];

export const seedEvents = [
  {
    id: 'evt-101',
    title: 'Sophia & Liam Grand Autumn Wedding',
    type: 'Wedding',
    categorySlug: 'wedding',
    customerId: 'usr-3',
    customerName: 'Sophia Miller',
    customerEmail: 'sophia@example.com',
    customerPhone: '+1 (555) 301-8842',
    date: '2026-12-18',
    time: '16:00',
    location: 'Grand Crystal Palace Ballroom, Los Angeles, CA',
    budget: 35000,
    guests: 220,
    status: 'Planning',
    progress: 75,
    bookedVendors: [
      { vendorId: 'ven-3', vendorName: 'Grand Crystal Palace Resort', service: 'Grand Ballroom Imperial Package', amount: 7500, status: 'Confirmed' },
      { vendorId: 'ven-1', vendorName: 'Lumina Lens Cinematics', service: 'Full Day Cinematic Wedding Package', amount: 2800, status: 'Confirmed' }
    ],
    notes: 'Bride prefers champagne blush floral theme.'
  },
  {
    id: 'evt-102',
    title: 'TechNova Global Developer Summit 2026',
    type: 'Corporate',
    categorySlug: 'corporate',
    customerId: 'usr-4',
    customerName: 'Marcus Sterling',
    customerEmail: 'marcus@technova.io',
    customerPhone: '+1 (555) 912-3344',
    date: '2027-01-22',
    time: '09:00',
    location: 'Metro Convention Center, San Francisco, CA',
    budget: 60000,
    guests: 500,
    status: 'Confirmed',
    progress: 85,
    bookedVendors: [
      { vendorId: 'ven-1', vendorName: 'Lumina Lens Cinematics', service: 'Corporate Conference & Gala Coverage', amount: 3000, status: 'Confirmed' }
    ],
    notes: 'Keynotes from AI industry leaders.'
  }
];

export const seedBookings = [
  {
    id: 'bkg-1001',
    eventId: 'evt-101',
    eventTitle: 'Sophia & Liam Grand Autumn Wedding',
    customerId: 'usr-3',
    customerName: 'Sophia Miller',
    vendorId: 'ven-1',
    vendorName: 'Lumina Lens Cinematics',
    serviceTitle: 'Full Day Cinematic Wedding Package',
    date: '2026-12-18',
    amount: 2800,
    deposit: 1000,
    status: 'Confirmed',
    paymentStatus: 'Deposit Paid',
    createdAt: '2026-11-01',
    message: 'We loved your teaser reel!'
  },
  {
    id: 'bkg-1002',
    eventId: 'evt-101',
    eventTitle: 'Sophia & Liam Grand Autumn Wedding',
    customerId: 'usr-3',
    customerName: 'Sophia Miller',
    vendorId: 'ven-3',
    vendorName: 'Grand Crystal Palace Resort',
    serviceTitle: 'Grand Ballroom Imperial Package',
    date: '2026-12-18',
    amount: 7500,
    deposit: 2500,
    status: 'Confirmed',
    paymentStatus: 'Deposit Paid',
    createdAt: '2026-11-02',
    message: 'Main hall reserved.'
  }
];

export const seedUsers = [
  {
    id: 'usr-1',
    name: 'Alexander Cross',
    email: 'admin@eventora.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    joinedDate: '2025-01-15'
  },
  {
    id: 'usr-2',
    name: 'Elena & Mark (Lumina Lens)',
    email: 'contact@luminalens.com',
    role: 'vendor',
    vendorId: 'ven-1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    joinedDate: '2025-03-20'
  },
  {
    id: 'usr-3',
    name: 'Sophia Miller',
    email: 'sophia@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    joinedDate: '2026-02-11'
  }
];

