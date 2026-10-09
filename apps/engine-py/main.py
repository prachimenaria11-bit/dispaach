"""
Dispacch Spatial Optimization & Route Pooling Engine (FastAPI)
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from packer import BinPacker3D
from matcher import find_shared_pools, calculate_cost_share, CORRIDORS_DB

app = FastAPI(
    title="Dispacch Optimization Engine",
    description="Mathematical spatial optimization and route pooling engine for freight consolidation.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CargoItem(BaseModel):
    id: Optional[str] = "cargo-item"
    name: str
    length: float
    width: float
    height: float
    weight: float
    quantity: int
    color: Optional[str] = "#2dd4bf"
    shipper_id: Optional[str] = "shipper-01"

class PackRequest(BaseModel):
    container_length: float
    container_width: float
    container_height: float
    max_payload_kg: float
    items: List[CargoItem]

class ShareCalcRequest(BaseModel):
    pool_id: str
    cargo_volume_m3: float

@app.get("/")
def root():
    return {
        "engine": "Dispacch 3D Bin Packing & Corridor Pooling Engine",
        "status": "online",
        "version": "1.0.0"
    }

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/optimize/pack-3d")
def pack_3d(req: PackRequest):
    packer = BinPacker3D(
        length=req.container_length,
        width=req.container_width,
        height=req.container_height,
        max_payload=req.max_payload_kg
    )
    result = packer.pack([item.model_dump() for item in req.items])
    return result

@app.get("/api/pools/corridors")
def get_pools(origin: Optional[str] = None, destination: Optional[str] = None, min_free_m3: Optional[float] = 0.0):
    return find_shared_pools(origin, destination, min_free_m3)

@app.post("/api/pools/calculate-share")
def calc_share(req: ShareCalcRequest):
    return calculate_cost_share(req.pool_id, req.cargo_volume_m3)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
