export interface ContainerSpec {
  name: string;
  length_cm: number;
  width_cm: number;
  height_cm: number;
  max_payload_kg: number;
  volume_m3: number;
}

export interface CargoManifestItem {
  id: string;
  name: string;
  length_cm: number;
  width_cm: number;
  height_cm: number;
  quantity: number;
  weight_kg: number;
  color: string;
  shipper_id?: string;
}

export interface PackedBoxPlacement {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  l: number;
  w: number;
  h: number;
  color: string;
  weight: number;
}

export interface FreightPool {
  id: string;
  route: string;
  origin: string;
  destination: string;
  truck_type: string;
  departure_time: string;
  booked_pct: number;
  total_volume_m3: number;
  solo_price_inr: number;
  active_shippers_count: number;
  vehicle_reg: string;
  driver_name: string;
  distance_km: number;
}

export interface TrackingEvent {
  time: string;
  text: string;
}

export interface ShipmentTracking {
  id: string;
  route: string;
  vehicle_reg: string;
  status_index: number;
  progress_pct: number;
  eta: string;
  events: TrackingEvent[];
}

export interface WalletTransaction {
  date: string;
  description: string;
  amount_inr: number;
  type: 'credit' | 'debit';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Shipper' | 'Transporter' | 'Admin';
  organization: string;
  gstin: string;
  city: string;
  member_since: string;
  stats: { label: string; value: string }[];
}
