import { ContainerSpec, CargoManifestItem, FreightPool, ShipmentTracking, UserProfile } from '../types';

export const CONTAINER_SPECS: Record<string, ContainerSpec> = {
  '20ft_standard': {
    name: '20 ft standard container',
    length_cm: 589,
    width_cm: 235,
    height_cm: 239,
    max_payload_kg: 21800,
    volume_m3: 31.0
  },
  '32ft_single_axle': {
    name: '32 ft single-axle truck',
    length_cm: 960,
    width_cm: 240,
    height_cm: 250,
    max_payload_kg: 9000,
    volume_m3: 60.0
  },
  '40ft_high_cube': {
    name: '40 ft high cube container',
    length_cm: 1203,
    width_cm: 235,
    height_cm: 269,
    max_payload_kg: 26200,
    volume_m3: 76.2
  }
};

export const INITIAL_CARGO_MANIFEST: CargoManifestItem[] = [
  {
    id: 'cg-01',
    name: 'Sanganer Textiles',
    length_cm: 60,
    width_cm: 45,
    height_cm: 40,
    quantity: 52,
    weight_kg: 11,
    color: '#2dd4bf'
  },
  {
    id: 'cg-02',
    name: 'Kota Appliance Parts',
    length_cm: 80,
    width_cm: 60,
    height_cm: 50,
    quantity: 20,
    weight_kg: 24,
    color: '#4d8dff'
  },
  {
    id: 'cg-03',
    name: 'Bagru Block Prints',
    length_cm: 100,
    width_cm: 50,
    height_cm: 35,
    quantity: 18,
    weight_kg: 8,
    color: '#f5a742'
  },
  {
    id: 'cg-04',
    name: 'Amer Marble Handicraft',
    length_cm: 70,
    width_cm: 70,
    height_cm: 60,
    quantity: 16,
    weight_kg: 32,
    color: '#e0607e'
  },
  {
    id: 'cg-05',
    name: 'Jodhpur Furniture Fittings',
    length_cm: 120,
    width_cm: 80,
    height_cm: 45,
    quantity: 10,
    weight_kg: 41,
    color: '#a78bfa'
  }
];

export const MOCK_FREIGHT_POOLS: FreightPool[] = [
  {
    id: 'DSP-POOL-101',
    route: 'Jaipur to Ahmedabad',
    origin: 'Jaipur',
    destination: 'Ahmedabad',
    truck_type: '32 ft single-axle',
    departure_time: 'Tue 13 Oct, 19:30',
    booked_pct: 58,
    total_volume_m3: 60,
    solo_price_inr: 52400,
    active_shippers_count: 3,
    vehicle_reg: 'RJ 14 GB 7731',
    driver_name: 'Harpreet Singh',
    distance_km: 670
  },
  {
    id: 'DSP-POOL-102',
    route: 'Delhi to Jaipur',
    origin: 'Delhi',
    destination: 'Jaipur',
    truck_type: '20 ft container',
    departure_time: 'Wed 14 Oct, 06:15',
    booked_pct: 74,
    total_volume_m3: 31,
    solo_price_inr: 21800,
    active_shippers_count: 5,
    vehicle_reg: 'DL 01 AA 4920',
    driver_name: 'Satnam Singh',
    distance_km: 280
  },
  {
    id: 'DSP-POOL-103',
    route: 'Surat to Mumbai',
    origin: 'Surat',
    destination: 'Mumbai',
    truck_type: '20 ft container',
    departure_time: 'Wed 14 Oct, 22:00',
    booked_pct: 39,
    total_volume_m3: 31,
    solo_price_inr: 17250,
    active_shippers_count: 2,
    vehicle_reg: 'GJ 05 BX 2290',
    driver_name: 'Ramesh Patel',
    distance_km: 285
  },
  {
    id: 'DSP-POOL-104',
    route: 'Indore to Ahmedabad',
    origin: 'Indore',
    destination: 'Ahmedabad',
    truck_type: '32 ft single-axle',
    departure_time: 'Thu 15 Oct, 05:40',
    booked_pct: 66,
    total_volume_m3: 58,
    solo_price_inr: 44900,
    active_shippers_count: 4,
    vehicle_reg: 'MP 09 HG 3811',
    driver_name: 'Devendra Sharma',
    distance_km: 390
  }
];

export const MOCK_SHIPMENTS: Record<string, ShipmentTracking> = {
  'DSP-20413': {
    id: 'DSP-20413',
    route: 'Jaipur to Ahmedabad',
    vehicle_reg: 'RJ 14 GB 7731',
    status_index: 3,
    progress_pct: 0.54,
    eta: 'Sat 10 Oct, 07:20',
    events: [
      { time: '08 Oct 19:42', text: 'Loaded at Sanganer Hub, 52 cartons verified' },
      { time: '08 Oct 21:05', text: 'Pool truck departed Jaipur consolidation bay' },
      { time: '09 Oct 00:31', text: 'Crossed Beawar FASTag toll plaza (NH48)' },
      { time: '09 Oct 03:50', text: 'Driver rest stop near Pali (45 mins)' }
    ]
  },
  'DSP-20388': {
    id: 'DSP-20388',
    route: 'Surat to Mumbai',
    vehicle_reg: 'GJ 05 BX 2290',
    status_index: 5,
    progress_pct: 1.0,
    eta: 'Delivered Wed 7 Oct, 09:10',
    events: [
      { time: '06 Oct 22:00', text: 'Pool truck departed Surat Textile Market hub' },
      { time: '07 Oct 03:35', text: 'Reached Bhiwandi deconsolidation warehouse' },
      { time: '07 Oct 09:10', text: 'Delivered, proof of delivery signed by S. Naik' }
    ]
  },
  'DSP-20431': {
    id: 'DSP-20431',
    route: 'Delhi to Jaipur',
    vehicle_reg: 'DL 01 AA 4920 (Scheduled)',
    status_index: 1,
    progress_pct: 0.12,
    eta: 'Wed 14 Oct, 12:40',
    events: [
      { time: '09 Oct 11:20', text: 'Corridor slot reserved, 6.5 m³ space allocated' },
      { time: '09 Oct 11:21', text: 'Payment captured in escrow via UPI' }
    ]
  }
};

export const MOCK_USER_PROFILES: UserProfile[] = [
  {
    id: 'usr-01',
    name: 'Meena Kothari',
    email: 'meena@kothari-textiles.in',
    role: 'Shipper',
    organization: 'Kothari Textiles, Sanganer',
    gstin: '08AABCK4417M1ZP',
    city: 'Jaipur',
    member_since: 'Mar 2025',
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
    organization: 'Singh Roadlines Fleet',
    gstin: '08AAEFS9032Q1Z4',
    city: 'Jaipur',
    member_since: 'Nov 2024',
    stats: [
      { label: 'trucks on platform', value: '6' },
      { label: 'average fill rate', value: '81.4%' },
      { label: 'loads this month', value: '19' }
    ]
  },
  {
    id: 'usr-03',
    name: 'Ritu Mathur',
    email: 'ritu@dispacch.in',
    role: 'Admin',
    organization: 'Dispacch Operations Command',
    gstin: '08AAACD9218F1ZT',
    city: 'Jaipur',
    member_since: 'Jan 2025',
    stats: [
      { label: 'open disputes', value: '3' },
      { label: 'pools awaiting approval', value: '5' },
      { label: 'payouts on hold', value: '2' }
    ]
  }
];
