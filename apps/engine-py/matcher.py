"""
Dispacch Corridor Route Pooling & Dynamic Cost Sharing Engine
"""

from typing import List, Dict, Any


CORRIDORS_DB = [
    {
        "id": "pool-del-jai-01",
        "origin": "Delhi",
        "destination": "Jaipur",
        "distance_km": 280,
        "departure_time": "Wed 14 Oct, 06:15",
        "truck_type": "20 ft container",
        "container_length_cm": 589,
        "container_width_cm": 235,
        "container_height_cm": 239,
        "total_volume_m3": 31.0,
        "max_payload_kg": 21800,
        "current_booked_volume_m3": 22.94,
        "current_booked_pct": 74.0,
        "participating_shippers": 5,
        "solo_charter_price_inr": 21800,
        "vehicle_reg": "DL 01 AA 4920",
        "driver_name": "Satnam Singh"
    },
    {
        "id": "pool-jai-amd-01",
        "origin": "Jaipur",
        "destination": "Ahmedabad",
        "distance_km": 670,
        "departure_time": "Tue 13 Oct, 19:30",
        "truck_type": "32 ft single-axle",
        "container_length_cm": 960,
        "container_width_cm": 240,
        "container_height_cm": 250,
        "total_volume_m3": 60.0,
        "max_payload_kg": 9000,
        "current_booked_volume_m3": 34.8,
        "current_booked_pct": 58.0,
        "participating_shippers": 3,
        "solo_charter_price_inr": 52400,
        "vehicle_reg": "RJ 14 GB 7731",
        "driver_name": "Harpreet Singh"
    },
    {
        "id": "pool-sur-mum-01",
        "origin": "Surat",
        "destination": "Mumbai",
        "distance_km": 285,
        "departure_time": "Wed 14 Oct, 22:00",
        "truck_type": "20 ft container",
        "container_length_cm": 589,
        "container_width_cm": 235,
        "container_height_cm": 239,
        "total_volume_m3": 31.0,
        "max_payload_kg": 21800,
        "current_booked_volume_m3": 12.09,
        "current_booked_pct": 39.0,
        "participating_shippers": 2,
        "solo_charter_price_inr": 17250,
        "vehicle_reg": "GJ 05 BX 2290",
        "driver_name": "Ramesh Patel"
    },
    {
        "id": "pool-ind-amd-01",
        "origin": "Indore",
        "destination": "Ahmedabad",
        "distance_km": 390,
        "departure_time": "Thu 15 Oct, 05:40",
        "truck_type": "32 ft single-axle",
        "container_length_cm": 960,
        "container_width_cm": 240,
        "container_height_cm": 250,
        "total_volume_m3": 58.0,
        "max_payload_kg": 9000,
        "current_booked_volume_m3": 38.28,
        "current_booked_pct": 66.0,
        "participating_shippers": 4,
        "solo_charter_price_inr": 44900,
        "vehicle_reg": "MP 09 HG 3811",
        "driver_name": "Devendra Sharma"
    }
]


def find_shared_pools(origin: str = None, destination: str = None, min_free_m3: float = 0.0) -> List[Dict[str, Any]]:
    results = []
    for p in CORRIDORS_DB:
        if origin and origin.lower() not in p["origin"].lower():
            continue
        if destination and destination.lower() not in p["destination"].lower():
            continue
        free_m3 = p["total_volume_m3"] - p["current_booked_volume_m3"]
        if free_m3 < min_free_m3:
            continue
        
        pool_copy = dict(p)
        pool_copy["spare_capacity_m3"] = round(free_m3, 2)
        pool_copy["spare_capacity_pct"] = round(100.0 - p["current_booked_pct"], 1)
        results.append(pool_copy)
    return results


def calculate_cost_share(pool_id: str, cargo_volume_m3: float) -> Dict[str, Any]:
    pool = next((p for p in CORRIDORS_DB if p["id"] == pool_id), None)
    if not pool:
        # Default fallback to first pool
        pool = CORRIDORS_DB[0]

    total_vol = pool["total_volume_m3"]
    free_vol = total_vol - pool["current_booked_volume_m3"]
    clamped_vol = min(max(0.5, cargo_volume_m3), free_vol)

    your_share_pct = (clamped_vol / total_vol) * 100
    # Handling and coordination buffer of 9%
    platform_handling_fee_pct = 9.0
    
    # Cost = (solo charter * user volume share) * 1.09
    pooled_price = pool["solo_charter_price_inr"] * (clamped_vol / total_vol) * (1 + platform_handling_fee_pct / 100)
    savings_inr = pool["solo_charter_price_inr"] - pooled_price
    discount_pct = (savings_inr / pool["solo_charter_price_inr"]) * 100

    return {
        "pool_id": pool["id"],
        "route": f"{pool['origin']} to {pool['destination']}",
        "cargo_volume_m3": round(clamped_vol, 2),
        "your_share_pct": round(your_share_pct, 1),
        "others_share_pct": pool["current_booked_pct"],
        "remaining_spare_pct": round(max(0.0, 100.0 - pool["current_booked_pct"] - your_share_pct), 1),
        "solo_charter_price_inr": pool["solo_charter_price_inr"],
        "pooled_price_inr": round(pooled_price),
        "savings_inr": round(savings_inr),
        "discount_pct": round(discount_pct, 1)
    }
