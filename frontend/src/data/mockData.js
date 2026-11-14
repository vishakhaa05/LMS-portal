// Mock data for Eventora Platform

export const initialCategories = [
  {
    id: 'cat-1',
    name: 'Wedding',
    slug: 'wedding',
    icon: 'HeartHandshake',
    description: 'Bespoke weddings, lavish banquets, mandap & floral styling',
    count: 142,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'cat-2',
    name: 'Birthday',
    slug: 'birthday',
    icon: 'Cake',
    description: 'Milestone celebrations, theme parties, balloon decor & cakes',
    count: 98,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'cat-3',
    name: 'Corporate',
    slug: 'corporate',
    icon: 'Briefcase',
    description: 'Summits, product launches, galas, award nights & retreats',
    count: 215,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'cat-4',
    name: 'Concert & Festival',
    slug: 'concert',
    icon: 'Music',
    description: 'Live concerts, music fests, stage lighting, DJ setups & acoustics',
    count: 64,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    color: 'from-purple-600 to-violet-800',
  },
  {
    id: 'cat-5',
    name: 'Photography & Film',
    slug: 'photography',
    icon: 'Camera',
    description: 'Cinematic wedding films, pre-wedding shoots, drone & studio',
    count: 87,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    color: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'cat-6',
    name: 'Catering & Dining',
    slug: 'catering',
    icon: 'Utensils',
    description: 'Gourmet multi-cuisine catering, live culinary stations & mixology',
    count: 110,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-600 to-yellow-600',
  },
];

export const initialVendors = [
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
    bio: 'Award-winning visual storytellers specializing in cinematic wedding documentaries, commercial event coverage, and editorial aerial photography. Over 8 years creating timeless frames.',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        id: 'srv-101',
        title: 'Full Day Cinematic Wedding Package',
        price: 2800,
        unit: 'per event',
        description: '2 lead cinematographers, 10 hours coverage, 4K highlights film, drone footage & full speeches edit.',
        features: ['10 Hours Coverage', '2 Master Cinematographers', '4K Drone Aerial Footage', 'Teaser Trailer within 7 Days', 'Full Documentary Feature']
      },
      {
        id: 'srv-102',
        title: 'Pre-Wedding & Engagement Shoot',
        price: 950,
        unit: 'per session',
        description: '3-hour outdoor creative storytelling session with styling consultation and 45 retouched digital photos.',
        features: ['3 Hours Outdoor Session', '2 Wardrobe Changes', '45 High-Res Retouched Images', 'Online Private Gallery']
      },
      {
        id: 'srv-103',
        title: 'Corporate Conference & Gala Coverage',
        price: 1500,
        unit: 'per day',
        description: 'Professional event photo & highlight reels tailored for press releases, social media, and internal archiving.',
        features: ['Same-Day Social Media Snaps', 'Keynote & Panel Multi-Cam', 'High-Speed Editing Turnover', 'Full Commercial Licensing']
      }
    ],
    reviews: [
      { id: 'rev-1', author: 'Elena Rostova', rating: 5, date: '2026-10-14', comment: 'Lumina Lens captured our wedding beyond our wildest dreams! Every single frame felt like high-budget cinema.' },
      { id: 'rev-2', author: 'Marcus Sterling', rating: 5, date: '2026-09-22', comment: 'Top tier professionalism at our annual tech conference. The recap video blew our board of directors away.' },
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
    bio: 'Farm-to-table culinary experiences crafted by Michelin-trained executive chefs. Specializing in organic seasonal menus, bespoke mixology, and customized dietary accommodations.',
    gallery: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        id: 'srv-201',
        title: 'Royal 5-Course Plated Dinner',
        price: 85,
        unit: 'per guest',
        description: 'Exquisite 5-course seasonal culinary journey paired with artisanal wine selections, full waitstaff, and porcelain place settings.',
        features: ['5 Artisanal Plated Courses', 'Sommelier Wine Pairings', 'White Glove Service Staff', 'Full Bar & Mocktail Station']
      },
      {
        id: 'srv-202',
        title: 'Cocktail & Grazing Station Banquet',
        price: 45,
        unit: 'per guest',
        description: 'Interactive live cooking stations, charcuterie spreads, fusion canapés, and handcrafted dessert tapas.',
        features: ['12 Chef Canapé Varieties', 'Live Flambé & Pasta Stations', 'Artisanal Bread & Cheese Board', '2 Hours Continuous Service']
      }
    ],
    reviews: [
      { id: 'rev-3', author: 'David Chen', rating: 5, date: '2026-10-02', comment: 'Guests are still talking about the braised short ribs and truffle risotto 2 months later! Exceptional service.' }
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
    bio: 'Palatial ballroom and sun-drenched garden estate featuring Swarovski crystal chandeliers, private bridal suites, and panoramic mountain vistas. Accommodates up to 600 seated guests.',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545232979-fbf67140e74f?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        id: 'srv-301',
        title: 'Grand Ballroom Imperial Package',
        price: 7500,
        unit: 'per day',
        description: 'Complete 12-hour ballroom buyout, bridal and groom dressing lounges, grand marble foyer, and stage lighting.',
        features: ['Capacity up to 600 Guests', 'Grand Foyer & Cocktail Terrace', 'Dedicated Day-of Venue Manager', 'Complimentary Honeymoon Suite']
      }
    ],
    reviews: [
      { id: 'rev-4', author: 'Jessica & Taylor', rating: 5, date: '2026-10-28', comment: 'The venue looks like a real life fairy tale. The staff executed everything seamlessly.' }
    ]
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
    bio: 'Concert-grade acoustic setups, dynamic intelligent lighting rigs, cold spark machines, and genre-blending DJ mixes guaranteed to keep the dance floor packed until the early hours.',
    gallery: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        id: 'srv-401',
        title: 'Ultimate Festival & Party Stage Rig',
        price: 1600,
        unit: 'per event',
        description: '5 hours DJ set, moving beam intelligent lighting, 4 cold spark fountain machines, and dual wireless mic setup.',
        features: ['5 Hours Live DJ & MC', 'Intelligent Moving Head Lights', '4x Cold Pyro Sparklers', 'Custom Playlist Consultation']
      }
    ],
    reviews: [
      { id: 'rev-5', author: 'Liam Vance', rating: 5, date: '2026-08-19', comment: 'The energy DJ Pulse brought was unbelievable! The dance floor was packed non-stop.' }
    ]
  },
  {
    id: 'ven-5',
    name: 'Bloom & Petal Botanical Decor',
    category: 'Wedding',
    categorySlug: 'wedding',
    city: 'Chicago, IL',
    rating: 4.79,
    reviewCount: 68,
    startingPrice: 1500,
    status: 'Approved',
    verified: false,
    featured: false,
    phone: '+1 (555) 567-8901',
    email: 'hello@bloomandpetal.com',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
    bio: 'Artisanal florist studio creating breathtaking floral arches, suspended botanical installations, and romantic table centerpieces using ethically grown flowers.',
    gallery: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        id: 'srv-501',
        title: 'Complete Floral Styling & Mandap/Arch',
        price: 2400,
        unit: 'per event',
        description: 'Grand entrance archway, 12 table floral centerpieces, bridal bouquet, and boutonnières.',
        features: ['Custom Floral Arch', '12 Luxury Centerpieces', 'Bridal & Bridesmaid Bouquets', 'Full Delivery & Teardown']
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
    bio: 'State-of-the-art enterprise AV production, seamless LED video walls, live streaming switchers, and simultaneous translation booths for international conventions.',
    gallery: [],
    services: [
      {
        id: 'srv-601',
        title: 'Ultra-HD LED Video Wall & Livestreaming',
        price: 3200,
        unit: 'per day',
        description: '20ft x 10ft pitch 2.6mm LED wall with video switcher and multi-platform broadcast technicians.',
        features: ['4K Video Wall Rig', 'Live Production Engineers', 'Redundant Internet Streaming Gear', 'Full Audio Mixer Integration']
      }
    ],
    reviews: []
  },
  {
    id: 'ven-7',
    name: 'Sweet Harmony Patisserie & Cakes',
    category: 'Birthday',
    categorySlug: 'birthday',
    city: 'Miami, FL',
    rating: 4.82,
    reviewCount: 53,
    startingPrice: 350,
    status: 'Pending',
    verified: false,
    featured: false,
    phone: '+1 (555) 789-0123',
    email: 'orders@sweetharmonycakes.com',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1200&q=80',
    bio: 'Custom sculptured wedding cakes, dessert dessert grazing tables, French macarons, and themed birthday showstoppers made with premium European butter and Belgian chocolate.',
    gallery: [],
    services: [
      {
        id: 'srv-701',
        title: 'Bespoke 4-Tier Wedding Cake',
        price: 650,
        unit: 'per cake',
        description: 'Tasting flight for 2, fondant or buttercream finish, sugar flower accents, and complimentary 1-year anniversary top tier.',
        features: ['Complimentary Cake Tasting', 'Handcrafted Sugar Flowers', 'Delivery & Chilled Setup', 'Allergen-free Options Available']
      }
    ],
    reviews: []
  },
  {
    id: 'ven-8',
    name: 'Velocity Stage & Lighting',
    category: 'Concert & Festival',
    categorySlug: 'concert',
    city: 'Denver, CO',
    rating: 4.60,
    reviewCount: 38,
    startingPrice: 2200,
    status: 'Suspended',
    verified: false,
    featured: false,
    phone: '+1 (555) 890-1234',
    email: 'hello@velocitystage.com',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    bio: 'Heavy-duty hydraulic staging, roof trusses, line array speaker systems, and pyrotechnics for arena and festival tours.',
    gallery: [],
    services: [],
    reviews: []
  }
];

export const initialEvents = [
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
      { vendorId: 'ven-1', vendorName: 'Lumina Lens Cinematics', service: 'Full Day Cinematic Wedding Package', amount: 2800, status: 'Confirmed' },
      { vendorId: 'ven-2', vendorName: 'Starlight Gourmet Catering', service: 'Royal 5-Course Plated Dinner', amount: 18700, status: 'Confirmed' },
    ],
    notes: 'Bride prefers champagne blush floral theme. Halal & gluten-free options needed for 30 guests.'
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
      { vendorId: 'ven-1', vendorName: 'Lumina Lens Cinematics', service: 'Corporate Conference & Gala Coverage', amount: 3000, status: 'Confirmed' },
      { vendorId: 'ven-2', vendorName: 'Starlight Gourmet Catering', service: 'Cocktail & Grazing Station Banquet', amount: 22500, status: 'Confirmed' },
    ],
    notes: 'Keynotes from AI industry leaders. Livestreaming to 15,000 remote attendees.'
  },
  {
    id: 'evt-103',
    title: 'Aria 21st Euphoria Birthday Celebration',
    type: 'Birthday',
    categorySlug: 'birthday',
    customerId: 'usr-5',
    customerName: 'Aria Jenkins',
    customerEmail: 'aria.j@example.com',
    customerPhone: '+1 (555) 774-2190',
    date: '2026-11-28',
    time: '20:00',
    location: 'Skyline Penthouse Lounge, New York, NY',
    budget: 8500,
    guests: 65,
    status: 'Ongoing',
    progress: 95,
    bookedVendors: [
      { vendorId: 'ven-4', vendorName: 'DJ Pulse Sound & Laser Works', service: 'Ultimate Festival & Party Stage Rig', amount: 1600, status: 'Confirmed' }
    ],
    notes: 'Neon purple & magenta dress code. Mocktail bar and customized photo booth.'
  },
  {
    id: 'evt-104',
    title: 'Neon Nights Summer Music Fest',
    type: 'Concert & Festival',
    categorySlug: 'concert',
    customerId: 'usr-6',
    customerName: 'Lucas Thorne',
    customerEmail: 'lucas@bassline.live',
    customerPhone: '+1 (555) 441-2900',
    date: '2026-10-15',
    time: '18:00',
    location: 'Zilker Outdoor Amphitheater, Austin, TX',
    budget: 95000,
    guests: 2500,
    status: 'Completed',
    progress: 100,
    bookedVendors: [
      { vendorId: 'ven-4', vendorName: 'DJ Pulse Sound & Laser Works', service: 'Ultimate Festival & Party Stage Rig', amount: 3200, status: 'Completed' }
    ],
    notes: 'Successfully wrapped with zero safety incidents and record ticket turnover.'
  },
  {
    id: 'evt-105',
    title: 'Silver Anniversary Sunset Cruise Gala',
    type: 'Wedding',
    categorySlug: 'wedding',
    customerId: 'usr-7',
    customerName: 'Robert & Clara Vance',
    customerEmail: 'robert.vance@example.com',
    customerPhone: '+1 (555) 881-9923',
    date: '2026-11-05',
    time: '17:30',
    location: 'Harbor Mist Yacht, Miami, FL',
    budget: 18000,
    guests: 80,
    status: 'Completed',
    progress: 100,
    bookedVendors: [
      { vendorId: 'ven-2', vendorName: 'Starlight Gourmet Catering', service: 'Royal 5-Course Plated Dinner', amount: 6800, status: 'Completed' }
    ],
    notes: '25th Wedding anniversary dinner. Live jazz trio on boat upper deck.'
  }
];

export const initialBookings = [
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
    message: 'We loved your teaser reel on Instagram! Looking forward to having you document our sacred day.'
  },
  {
    id: 'bkg-1002',
    eventId: 'evt-101',
    eventTitle: 'Sophia & Liam Grand Autumn Wedding',
    customerId: 'usr-3',
    customerName: 'Sophia Miller',
    vendorId: 'ven-2',
    vendorName: 'Starlight Gourmet Catering',
    serviceTitle: 'Royal 5-Course Plated Dinner',
    date: '2026-12-18',
    amount: 18700,
    deposit: 5000,
    status: 'Confirmed',
    paymentStatus: 'Deposit Paid',
    createdAt: '2026-11-02',
    message: 'Menu tasting will be scheduled 2 weeks before the event.'
  },
  {
    id: 'bkg-1003',
    eventId: 'evt-102',
    eventTitle: 'TechNova Global Developer Summit 2026',
    customerId: 'usr-4',
    customerName: 'Marcus Sterling',
    vendorId: 'ven-1',
    vendorName: 'Lumina Lens Cinematics',
    serviceTitle: 'Corporate Conference & Gala Coverage',
    date: '2027-01-22',
    amount: 3000,
    deposit: 3000,
    status: 'Confirmed',
    paymentStatus: 'Paid in Full',
    createdAt: '2026-11-05',
    message: 'High priority corporate booking for 2 full consecutive conference days.'
  },
  {
    id: 'bkg-1004',
    eventId: 'evt-103',
    eventTitle: 'Aria 21st Euphoria Birthday Celebration',
    customerId: 'usr-5',
    customerName: 'Aria Jenkins',
    vendorId: 'ven-4',
    vendorName: 'DJ Pulse Sound & Laser Works',
    serviceTitle: 'Ultimate Festival & Party Stage Rig',
    date: '2026-11-28',
    amount: 1600,
    deposit: 500,
    status: 'Confirmed',
    paymentStatus: 'Deposit Paid',
    createdAt: '2026-11-08',
    message: 'Can you bring extra ultraviolet blacklights and cold sparklers for midnight countdown?'
  },
  {
    id: 'bkg-1005',
    eventId: 'evt-101',
    eventTitle: 'Sophia & Liam Grand Autumn Wedding',
    customerId: 'usr-3',
    customerName: 'Sophia Miller',
    vendorId: 'ven-5',
    vendorName: 'Bloom & Petal Botanical Decor',
    serviceTitle: 'Complete Floral Styling & Mandap/Arch',
    date: '2026-12-18',
    amount: 2400,
    deposit: 0,
    status: 'Pending',
    paymentStatus: 'Unpaid',
    createdAt: '2026-11-10',
    message: 'Inquiring if you have white peony and eucalyptus archways available for Dec 18.'
  },
  {
    id: 'bkg-1006',
    eventId: 'evt-104',
    eventTitle: 'Neon Nights Summer Music Fest',
    customerId: 'usr-6',
    customerName: 'Lucas Thorne',
    vendorId: 'ven-4',
    vendorName: 'DJ Pulse Sound & Laser Works',
    serviceTitle: 'Ultimate Festival & Party Stage Rig',
    date: '2026-10-15',
    amount: 3200,
    deposit: 3200,
    status: 'Completed',
    paymentStatus: 'Paid in Full',
    createdAt: '2026-09-12',
    message: 'Main stage closing headliner performance.'
  },
  {
    id: 'bkg-1007',
    eventId: 'evt-103',
    eventTitle: 'Aria 21st Euphoria Birthday Celebration',
    customerId: 'usr-5',
    customerName: 'Aria Jenkins',
    vendorId: 'ven-7',
    vendorName: 'Sweet Harmony Patisserie & Cakes',
    serviceTitle: 'Bespoke 4-Tier Wedding Cake',
    date: '2026-11-28',
    amount: 650,
    deposit: 0,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    createdAt: '2026-11-06',
    message: 'Customer altered party theme; cancellation requested smoothly.'
  }
];

export const initialUsers = [
  {
    id: 'usr-1',
    name: 'Alexander Cross',
    email: 'admin@eventora.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    joinedDate: '2025-01-15',
    phone: '+1 (555) 100-2000',
    eventsCount: 0
  },
  {
    id: 'usr-2',
    name: 'Elena & Mark (Lumina Lens)',
    email: 'contact@luminalens.com',
    role: 'vendor',
    vendorId: 'ven-1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    joinedDate: '2025-03-20',
    phone: '+1 (555) 234-5678',
    eventsCount: 28
  },
  {
    id: 'usr-3',
    name: 'Sophia Miller',
    email: 'sophia@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    joinedDate: '2026-02-11',
    phone: '+1 (555) 301-8842',
    eventsCount: 1
  },
  {
    id: 'usr-4',
    name: 'Marcus Sterling',
    email: 'marcus@technova.io',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    joinedDate: '2026-04-05',
    phone: '+1 (555) 912-3344',
    eventsCount: 2
  },
  {
    id: 'usr-5',
    name: 'Aria Jenkins',
    email: 'aria.j@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    joinedDate: '2026-06-18',
    phone: '+1 (555) 774-2190',
    eventsCount: 1
  },
  {
    id: 'usr-8',
    name: 'Harrison Wells',
    email: 'harrison.wells@mail.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    status: 'Blocked',
    joinedDate: '2026-07-22',
    phone: '+1 (555) 998-1122',
    eventsCount: 0
  }
];

// Admin Dashboard Chart Mock Data
export const monthlyBookingsData = [
  { month: 'Jun', bookings: 42, revenue: 38400 },
  { month: 'Jul', bookings: 58, revenue: 52100 },
  { month: 'Aug', bookings: 74, revenue: 68900 },
  { month: 'Sep', bookings: 86, revenue: 84300 },
  { month: 'Oct', bookings: 110, revenue: 105200 },
  { month: 'Nov', bookings: 135, revenue: 129400 },
];

export const eventsByTypeData = [
  { name: 'Wedding', value: 42, color: '#EC4899' },
  { name: 'Corporate', value: 28, color: '#3B82F6' },
  { name: 'Birthday', value: 18, color: '#F59E0B' },
  { name: 'Concert', value: 12, color: '#8B5CF6' },
];

export const topVendorsChartData = [
  { name: 'Grand Crystal', revenue: 78500, bookings: 18 },
  { name: 'Starlight Catering', revenue: 64200, bookings: 32 },
  { name: 'Lumina Lens', revenue: 49800, bookings: 24 },
  { name: 'DJ Pulse', revenue: 28400, bookings: 19 },
  { name: 'Bloom & Petal', revenue: 18600, bookings: 11 },
];

export const vendorMonthlyEarnings = [
  { month: 'Jun', amount: 4800, gigs: 2 },
  { month: 'Jul', amount: 7200, gigs: 3 },
  { month: 'Aug', amount: 9500, gigs: 4 },
  { month: 'Sep', amount: 12400, gigs: 5 },
  { month: 'Oct', amount: 14800, gigs: 6 },
  { month: 'Nov', amount: 18500, gigs: 7 },
];

export const vendorTransactions = [
  { id: 'txn-901', date: '2026-11-05', event: 'TechNova Global Summit', amount: 3000, fee: 300, net: 2700, status: 'Paid', method: 'Direct Deposit' },
  { id: 'txn-902', date: '2026-11-01', event: 'Sophia & Liam Wedding', amount: 1000, fee: 100, net: 900, status: 'Paid', method: 'Stripe Escrow' },
  { id: 'txn-903', date: '2026-10-20', event: 'Vance Silver Anniversary', amount: 2800, fee: 280, net: 2520, status: 'Paid', method: 'Direct Deposit' },
  { id: 'txn-904', date: '2026-10-12', event: 'Neon Nights VIP Reel', amount: 1500, fee: 150, net: 1350, status: 'Paid', method: 'Direct Deposit' },
];

export const recentActivities = [
  { id: 'act-1', text: 'Sophia Miller booked Lumina Lens Cinematics for Wedding', time: '10 mins ago', type: 'booking' },
  { id: 'act-2', text: 'New vendor application from Vanguard Audio-Visual & Tech', time: '35 mins ago', type: 'vendor' },
  { id: 'act-3', text: 'Marcus Sterling approved milestone payment of $3,000', time: '2 hours ago', type: 'payment' },
  { id: 'act-4', text: 'Sweet Harmony Patisserie submitted 2 new service packages', time: '4 hours ago', type: 'service' },
  { id: 'act-5', text: 'New 5-star review left for Starlight Gourmet Catering', time: '6 hours ago', type: 'review' },
];

export const initialNotifications = [
  { id: 'notif-1', title: 'New Booking Request', message: 'Sophia Miller requested Full Day Wedding Package', time: '10m ago', read: false },
  { id: 'notif-2', title: 'Vendor Approval Required', message: 'Vanguard AV uploaded business certification', time: '35m ago', read: false },
  { id: 'notif-3', title: 'Payment Released', message: 'Escrow payment of $2,700 dispatched to bank', time: '2h ago', read: true },
];

