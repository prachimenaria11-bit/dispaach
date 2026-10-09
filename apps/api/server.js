const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-Memory Database State with Realistic Indian Freight Data
const DB = {
  pools: [
    {
      id: 'DSP-POOL-101',
      route: 'Jaipur to Ahmedabad',
      origin: 'Jaipur',
      destination: 'Ahmedabad',
      truck_type: '32 ft single-axle',
      departure_time: 'Tue 13 Oct, 19:30',
      booked_pct: 58,
      total_volume_m3: 60.0,
      solo_price_inr: 52400,
      active_shippers_count: 3,
      vehicle_reg: 'RJ 14 GB 7731',
      driver_name: 'Harpreet Singh',
      distance_km: 670,
      corridor_status: 'On Schedule'
    },
    {
      id: 'DSP-POOL-102',
      route: 'Delhi to Jaipur',
      origin: 'Delhi',
      destination: 'Jaipur',
      truck_type: '20 ft container',
      departure_time: 'Wed 14 Oct, 06:15',
      booked_pct: 74,
      total_volume_m3: 31.0,
      solo_price_inr: 21800,
      active_shippers_count: 5,
      vehicle_reg: 'DL 01 AA 4920',
      driver_name: 'Satnam Singh',
      distance_km: 280,
      corridor_status: 'Filling Fast'
    },
    {
      id: 'DSP-POOL-103',
      route: 'Surat to Mumbai',
      origin: 'Surat',
      destination: 'Mumbai',
      truck_type: '20 ft container',
      departure_time: 'Wed 14 Oct, 22:00',
      booked_pct: 39,
      total_volume_m3: 31.0,
      solo_price_inr: 17250,
      active_shippers_count: 2,
      vehicle_reg: 'GJ 05 BX 2290',
      driver_name: 'Ramesh Patel',
      distance_km: 285,
      corridor_status: 'Open for Bookings'
    },
    {
      id: 'DSP-POOL-104',
      route: 'Indore to Ahmedabad',
      origin: 'Indore',
      destination: 'Ahmedabad',
      truck_type: '32 ft single-axle',
      departure_time: 'Thu 15 Oct, 05:40',
      booked_pct: 66,
      total_volume_m3: 58.0,
      solo_price_inr: 44900,
      active_shippers_count: 4,
      vehicle_reg: 'MP 09 HG 3811',
      driver_name: 'Devendra Sharma',
      distance_km: 390,
      corridor_status: 'High Demand'
    }
  ],

  shipments: {
    'DSP-20413': {
      id: 'DSP-20413',
      route: 'Jaipur to Ahmedabad',
      origin: 'Jaipur',
      destination: 'Ahmedabad',
      vehicle_reg: 'RJ 14 GB 7731',
      driver_name: 'Harpreet Singh',
      driver_phone: '+91 98290 41182',
      status_index: 3, // In transit
      status_name: 'In transit',
      progress_pct: 0.54,
      eta: 'Sat 10 Oct, 07:20',
      cargo_description: '52 cartons - Handblock Sanganer Textiles (6.0 m³, 572 kg)',
      pool_id: 'DSP-POOL-101',
      events: [
        { time: '08 Oct 19:42', text: 'Loaded at Sanganer Hub, 52 cartons verified' },
        { time: '08 Oct 21:05', text: 'Pool truck departed Jaipur consolidation bay' },
        { time: '09 Oct 00:31', text: 'Crossed Beawar FASTag toll plaza (Lane 4)' },
        { time: '09 Oct 03:50', text: 'Mandatory driver rest stop near Pali (45 mins)' },
        { time: '09 Oct 05:15', text: 'Re-entered NH62 corridor, moving at 58 km/h' }
      ]
    },
    'DSP-20388': {
      id: 'DSP-20388',
      route: 'Surat to Mumbai',
      origin: 'Surat',
      destination: 'Mumbai',
      vehicle_reg: 'GJ 05 BX 2290',
      driver_name: 'Ramesh Patel',
      driver_phone: '+91 98980 23145',
      status_index: 5, // Delivered
      status_name: 'Delivered',
      progress_pct: 1.0,
      eta: 'Delivered Wed 7 Oct, 09:10',
      cargo_description: '28 cartons - Jacquard Rayon Fabric (4.5 m³, 420 kg)',
      pool_id: 'DSP-POOL-103',
      events: [
        { time: '06 Oct 22:00', text: 'Pool truck departed Surat Textile Market hub' },
        { time: '07 Oct 01:12', text: 'Crossed Charoti Toll Plaza, NH48' },
        { time: '07 Oct 03:35', text: 'Reached Bhiwandi deconsolidation warehouse' },
        { time: '07 Oct 07:15', text: 'Out for final delivery dispatch' },
        { time: '07 Oct 09:10', text: 'Delivered at Andheri East, POD signed by S. Naik' }
      ]
    },
    'DSP-20431': {
      id: 'DSP-20431',
      route: 'Delhi to Jaipur',
      origin: 'Delhi',
      destination: 'Jaipur',
      vehicle_reg: 'To be assigned (Dispatching)',
      driver_name: 'Satnam Singh',
      driver_phone: '+91 98110 59281',
      status_index: 1, // Pool confirmed
      status_name: 'Pool confirmed',
      progress_pct: 0.12,
      eta: 'Wed 14 Oct, 12:40',
      cargo_description: '20 cartons - Precision Brass Fittings (3.2 m³, 380 kg)',
      pool_id: 'DSP-POOL-102',
      events: [
        { time: '09 Oct 11:20', text: 'Corridor slot reserved, 3.2 m³ space allocated' },
        { time: '09 Oct 11:21', text: 'Advance escrow payment captured via UPI' },
        { time: '09 Oct 14:00', text: 'Scheduled for pickup at Okhla Phase III dock' }
      ]
    }
  },

  users: [
    {
      id: 'usr-01',
      name: 'Meena Kothari',
      email: 'meena@kothari-textiles.in',
      role: 'Shipper',
      org: 'Kothari Textiles, Sanganer',
      gstin: '08AABCK4417M1ZP',
      city: 'Jaipur',
      joined: 'Mar 2025',
      wallet_balance: 46183,
      transactions: [
        { date: '01 Oct', desc: 'Added through UPI (HDFC Bank)', amount: 60000, type: 'credit' },
        { date: '03 Oct', desc: 'Pool booking: Delhi to Jaipur, 6.0 m³', amount: -8142, type: 'debit' },
        { date: '05 Oct', desc: 'Pool booking: Surat to Mumbai, 4.5 m³', amount: -6935, type: 'debit' },
        { date: '07 Oct', desc: 'Refund: Load DSP-20388 short by 0.5 m³', amount: 1260, type: 'credit' }
      ],
      stats: [
        { label: 'pools joined', value: '37' },
        { label: 'paid vs ₹4,12,900 solo', value: '₹2,86,410' },
        { label: 'saved on freight', value: '30.6%' }
      ]
    },
    {
      id: 'usr-02',
      name: 'Harpreet Singh',
      email: 'harpreet@singhroadlines.in',
      role: 'Transporter',
      org: 'Singh Roadlines Fleet',
      gstin: '08AAEFS9032Q1Z4',
      city: 'Jaipur',
      joined: 'Nov 2024',
      wallet_balance: 42680,
      transactions: [
        { date: '28 Sep', desc: 'Freight payout, load DSP-19877', amount: 41820, type: 'credit' },
        { date: '30 Sep', desc: 'Dispacch platform brokerage fee, September', amount: -3920, type: 'debit' },
        { date: '02 Oct', desc: 'Freight payout: Jaipur to Ahmedabad pool', amount: 52610, type: 'credit' },
        { date: '05 Oct', desc: 'Freight payout: Indore to Ahmedabad pool', amount: 44190, type: 'credit' },
        { date: '06 Oct', desc: 'Bank NEFT withdrawal to IndusInd A/c', amount: -92020, type: 'debit' }
      ],
      stats: [
        { label: 'trucks in fleet', value: '6' },
        { label: 'average pool fill', value: '81.4%' },
        { label: 'completed loads this month', value: '19' }
      ]
    },
    {
      id: 'usr-03',
      name: 'Ritu Mathur',
      email: 'ritu@dispacch.in',
      role: 'Admin',
      org: 'Dispacch Operations Command',
      gstin: '08AAACD9218F1ZT',
      city: 'Jaipur',
      joined: 'Jan 2025',
      wallet_balance: 1450000,
      transactions: [
        { date: '01 Oct', desc: 'Platform fee collection pool W1', amount: 45000, type: 'credit' },
        { date: '05 Oct', desc: 'Driver performance incentive payout', amount: -15000, type: 'debit' }
      ],
      stats: [
        { label: 'open corridor disputes', value: '3' },
        { label: 'pools awaiting departure approval', value: '5' },
        { label: 'escrow payouts in clearance', value: '2' }
      ]
    }
  ],

  operations: {
    hero: {
      avg_fill_pct: 78.6,
      active_pools: 23,
      empty_km_avoided: 6340,
      co2_saved_kg: 4820
    },
    kpis: [
      { value: '23', label: 'active corridors filling' },
      { value: '148', label: 'shipments matched this month' },
      { value: '₹30.4 lakh', label: 'saved in 8 weeks' },
      { value: '9 h 40 m', label: 'average match waiting time' }
    ],
    weekly_spend: {
      weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
      solo_charter_lakh: [11.4, 12.9, 10.8, 13.6, 14.2, 12.7, 15.1, 14.4],
      pooled_freight_lakh: [7.9, 8.5, 7.3, 8.8, 9.3, 8.1, 9.6, 9.2]
    }
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'dispacch-api', timestamp: new Date().toISOString() });
});

// Pools list & filter
app.get('/api/pools', (req, res) => {
  const { origin, destination } = req.query;
  let pools = DB.pools;
  if (origin) {
    pools = pools.filter(p => p.origin.toLowerCase().includes(origin.toLowerCase()));
  }
  if (destination) {
    pools = pools.filter(p => p.destination.toLowerCase().includes(destination.toLowerCase()));
  }
  res.json(pools);
});

// Book space in a pool
app.post('/api/pools/book', (req, res) => {
  const { pool_id, user_id, volume_m3, calculated_price } = req.body;
  const pool = DB.pools.find(p => p.id === pool_id);
  const user = DB.users.find(u => u.id === user_id) || DB.users[0];

  if (!pool) {
    return res.status(404).json({ error: 'Pool not found' });
  }

  if (user.wallet_balance < calculated_price) {
    return res.status(400).json({
      error: `Insufficient balance. Available ₹${user.wallet_balance.toLocaleString('en-IN')}, required ₹${calculated_price.toLocaleString('en-IN')}`
    });
  }

  // Deduct from wallet
  user.wallet_balance -= Math.round(calculated_price);
  user.transactions.unshift({
    date: 'Today',
    desc: `Pool booking: ${pool.route}, ${volume_m3.toFixed(1)} m³`,
    amount: -Math.round(calculated_price),
    type: 'debit'
  });

  // Update pool booked percentage
  const added_pct = Math.round((volume_m3 / pool.total_volume_m3) * 100);
  pool.booked_pct = Math.min(100, pool.booked_pct + added_pct);
  pool.active_shippers_count += 1;

  res.json({
    success: true,
    message: `Successfully booked ${volume_m3.toFixed(1)} m³ in ${pool.route}`,
    remaining_balance: user.wallet_balance,
    pool
  });
});

// Add a new pool (for Transporters)
app.post('/api/pools/create', (req, res) => {
  const { origin, destination, truck_type, departure_time, solo_price_inr, total_volume_m3 } = req.body;
  const newPool = {
    id: `DSP-POOL-${DB.pools.length + 101}`,
    route: `${origin} to ${destination}`,
    origin,
    destination,
    truck_type: truck_type || '32 ft single-axle',
    departure_time: departure_time || 'Tomorrow, 08:00',
    booked_pct: 0,
    total_volume_m3: total_volume_m3 || 60.0,
    solo_price_inr: solo_price_inr || 45000,
    active_shippers_count: 0,
    vehicle_reg: 'RJ 14 CC 8821',
    driver_name: 'Balwinder Singh',
    distance_km: 450,
    corridor_status: 'Newly Scheduled'
  };
  DB.pools.unshift(newPool);
  res.json({ success: true, pool: newPool });
});

// Tracking
app.get('/api/tracking/:id', (req, res) => {
  const shipment = DB.shipments[req.params.id.toUpperCase()];
  if (!shipment) {
    return res.status(404).json({ error: 'Shipment tracking ID not found' });
  }
  res.json(shipment);
});

// User profile & switch
app.get('/api/users', (req, res) => {
  res.json(DB.users);
});

// Wallet top-up
app.post('/api/wallet/topup', (req, res) => {
  const { user_id, amount } = req.body;
  const user = DB.users.find(u => u.id === user_id) || DB.users[0];
  const topupAmt = Math.round(Number(amount));

  if (!topupAmt || topupAmt < 100) {
    return res.status(400).json({ error: 'Minimum top-up amount is ₹100' });
  }

  user.wallet_balance += topupAmt;
  user.transactions.unshift({
    date: 'Today',
    desc: 'Added through UPI / Instant Pay',
    amount: topupAmt,
    type: 'credit'
  });

  res.json({
    success: true,
    new_balance: user.wallet_balance,
    transactions: user.transactions
  });
});

// Operations & Analytics
app.get('/api/operations', (req, res) => {
  res.json(DB.operations);
});

// Start Express Server if invoked directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Dispacch API Gateway running on port ${PORT}`);
  });
}

module.exports = app;
